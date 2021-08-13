import { Box, Container, Grid, Tab, Tabs } from "@material-ui/core";
import { AccountProfileDetails } from "containers/Account";
import { AccountProfile } from "containers/Account";
import { useEffect, useState } from "react";
import { CampaignList } from "containers";
import { connect } from "react-redux";
import { loadUserCampainsAction } from "store/actions/CampaignActions";
import { NO_USER_CAMPAIGN } from "appconstants/messages";
import Loader from "components/Shared/Loader";
import {
  updateUserProfileAction,
  uploadProfilePicAction,
} from "store/actions/UserActions";

const Profile = ({ loading, dispatch, user, campaigns, history }) => {
  const [userProfilePic, setProfilePic] = useState();

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

  const onSubmitChanges = (userDetails) => {
    dispatch(
      updateUserProfileAction({
        sessionToken: user.sessionToken,
        userId: user.objectId,
        userPayload: userDetails,
      })
    );
  };

  const [selectedTab, setTab] = useState("Campaigns");

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleFileChange = (event) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];

      var reader = new FileReader();
      reader.onloadend = async function () {
        const base64Response = await fetch(reader.result);
        const blob = await base64Response.blob();

        const profileImageData = {
          file: blob,
          name: selectedFile.name,
        };

        setProfilePic(base64Response);

        dispatch(
          uploadProfilePicAction({
            profileImageData,
            sessionToken: user.sessionToken,
            userId: user.objectId,
          })
        );
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const a11yProps = (index) => {
    return {
      id: `profile-tab-${index}`,
      "aria-controls": `profile-tabpanel-${index}`,
    };
  };

  const showDetails = (id) => {
    history.push(`/details/${id}`);
  };

  const getSelectedTab = (selectedTabKey) => {
    let tabContent = <div>No tab selected.</div>;

    switch (selectedTabKey) {
      case "Campaigns":
        tabContent =
          campaigns && campaigns.length ? (
            <CampaignList list={campaigns} showDetails={showDetails} />
          ) : (
            <h2> {NO_USER_CAMPAIGN} </h2>
          );
        break;

      case "Donations":
        tabContent = (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {/* List of user donations made towards campaign */}
            </Grid>
          </Grid>
        );
        break;

      default:
        break;
    }
    return tabContent;
  };

  if (loading) {
    return <Loader />;
  }

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
            <Grid item xs={12}></Grid>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile
                user={user}
                userImage={userProfilePic}
                handleFileChange={handleFileChange}
              />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails
                user={user}
                onSubmitChanges={onSubmitChanges}
              />
            </Grid>
          </Grid>
        </Container>
        <br />
        <br />
        <Container maxWidth="lg">
          {" "}
          <Tabs
            value={selectedTab}
            variant="fullWidth"
            onChange={handleChange}
            aria-label="Account tabs"
          >
            <Tab label="Your Campaigns" value="Campaigns" {...a11yProps(0)} />
            <Tab label="Donations" value="Donations" {...a11yProps(1)} />
          </Tabs>{" "}
        </Container>
        <Container maxWidth="lg">
          <Box py={2}>
            <Grid container spacing={3}>
              <Grid item lg={12} xs={12}>
                {getSelectedTab(selectedTab)}
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

const mapStateToProps = ({ campaign, auth }) => {
  return { campaigns: campaign.campaigns, user: auth.user };
};

export default connect(mapStateToProps)(Profile);
