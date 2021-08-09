import { Box, Container, Grid, Tab, Tabs } from "@material-ui/core";
import { AccountProfileDetails } from "containers/Account";
import { AccountProfile } from "containers/Account";
import { useEffect, useState } from "react";
import { CampaignList } from "containers";
import { connect } from "react-redux";
import { loadUserCampainsAction } from "store/actions/CampaignActions";

const Profile = ({ dispatch, user, campaigns }) => {
  useEffect(() => {
    if (user && user.objectId) {
      dispatch(
        loadUserCampainsAction({
          sessionToken: user.sessionToken,
          userId: user.objectId,
        })
      );
    }
  }, []);
  const [selectedTab, setTab] = useState("Campaigns");

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `profile-tab-${index}`,
      "aria-controls": `profile-tabpanel-${index}`,
    };
  };

  const getSelectedTab = (selectedTabKey) => {
    let tabContent = <div>No tab selected.</div>;

    switch (selectedTabKey) {
      case "Campaigns":
        tabContent = <CampaignList list={campaigns} />;
        break;

      case "Settings":
        tabContent = (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <AccountProfileDetails />
            </Grid>
            {/* <Grid item lg={6} md={6} xs={12}>
              <SettingsPassword />
            </Grid> */}
          </Grid>
        );
        break;

      default:
        break;
    }
    return tabContent;
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile />
            </Grid>
            <Grid item lg={8} md={6} xs={12}></Grid>
          </Grid>
        </Container>
        <br />
        <br />
        <Container maxWidth="lg">
          {" "}
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Your Campaigns" value="Campaigns" {...a11yProps(0)} />
            <Tab label="Settings" value="Settings" {...a11yProps(2)} />
          </Tabs>
        </Container>
        <br />
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={12} xs={12}>
              {getSelectedTab(selectedTab)}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

const mapStateToProps = ({ campaign, auth }) => {
  return { ...campaign, user: auth.user };
};

export default connect(mapStateToProps)(Profile);
