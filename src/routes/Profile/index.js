import { Box, Container, Grid, Tab, Tabs } from "@material-ui/core";
import { AccountProfileDetails } from "containers/Account";
import { AccountProfile } from "containers/Account";
import { useState } from "react";
import { CampaignList } from "containers";
import { SettingsPassword } from "containers/Account";

export const Profile = () => {
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
        tabContent = <CampaignList list={[0, 1, 2, 3]} />;
        break;

      case "Settings":
        tabContent = (
          <Grid container spacing={3}>
            <Grid item lg={6} md={6} xs={12}>
              <AccountProfileDetails />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <SettingsPassword />
            </Grid>
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
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails />
            </Grid>
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
