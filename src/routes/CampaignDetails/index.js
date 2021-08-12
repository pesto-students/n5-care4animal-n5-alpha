import "styles/CampaignDetails.scss";
import { ProgressBar } from "components/Campaign/ProgressBar";
import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  Tabs,
  Tab,
  Typography,
  CardContent,
  Card,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getCampaignDetailAction,
  resetReducer,
} from "store/actions/CampaignActions";
import Loader from "components/Shared/Loader";
import Currency from "components/Shared/Currency";
import Moment from "react-moment";
import moment from "moment";
import InfoIcon from "@material-ui/icons/Info";
import UpdateIcon from "@material-ui/icons/Update";
import CommentIcon from "@material-ui/icons/Comment";
import LocalActivityIcon from "@material-ui/icons/LocalActivity";
import ShareIcon from "@material-ui/icons/Share";

const CampaignDetails = ({ campaign, loading = true, dispatch, history }) => {
  let { id } = useParams();
  const [selectedTab, setTab] = useState("About");

  useEffect(() => {
    if (id) {
      dispatch(
        getCampaignDetailAction({
          campaignId: id,
        })
      );
    }

    return () => {
      dispatch(resetReducer());
    };
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!loading && campaign === undefined) {
    history.goBack();
  }

  const getSelectedTab = (selectedTabKey) => {
    let tabContent = <div>No tab selected.</div>;

    switch (selectedTabKey) {
      case "About":
        tabContent = (
          <Grid item xs={12}>
            <Box py={3}>
              <h2> About Campaign</h2>
            </Box>
            <div className="camp-more">{campaign.description}</div>{" "}
          </Grid>
        );
        break;

      case "Updates":
      case "Comments":
        tabContent = (
          <Grid item xs={12}>
            <Box py={4}>
              <h1>This feature is coming Soon</h1>
            </Box>
          </Grid>
        );
        break;

      default:
        break;
    }
    return tabContent;
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `profile-tab-${index}`,
      "aria-controls": `campaign-tabpanel-${index}`,
    };
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid xs={12}>
            <Box py={4} px={1}>
              <h2> {campaign.name}</h2>
            </Box>
          </Grid>
          <Grid item lg={8} md={8} xs={12}>
            <CardMedia
              image={
                campaign.image
                  ? campaign.image.url
                  : "https://source.unsplash.com/900x600/?cow,dog,cat"
              }
              className="campaign-image"
              title={campaign.name}
            />
          </Grid>
          <Grid item lg={4} md={4} xs={12}>
            <Box p={4}>
              <span className="goal">
                <Currency value={campaign.raisedAmount} />{" "}
              </span>
              out of &nbsp;
              <span className="goal">
                <Currency value={campaign.goalAmount} />
              </span>
              <Box py={2}>
                <ProgressBar
                  progress={
                    (campaign.raisedAmount / campaign.goalAmount) * 100 + "%"
                  }
                />
              </Box>
              <Grid container spacing={3}>
                <Grid item md={6} sm={3} xs={6}>
                  <span className="donors">{campaign.noOfDonors}</span> Donors
                </Grid>
                <Grid item md={6} sm={3} xs={6}>
                  <span className="donors">
                    <Moment diff={campaign.createdAt} unit="days">
                      {moment(campaign.createdAt).add(30, "d")}
                    </Moment>
                  </span>{" "}
                  days left
                </Grid>
              </Grid>
              <Grid item md={12} sm={6} xs={12}>
                <Box py={2}>
                  <TextField
                    fullWidth
                    id="standard-required"
                    label="Amount to Donate"
                    placeholder="Enter Amount you want to donate"
                  />
                </Box>
              </Grid>
              <Grid container spacing={3}>
                <Grid item md={12} sm={6} xs={12}>
                  <Button fullWidth color="secondary" variant="contained">
                    Pay with Razor Pay
                  </Button>{" "}
                </Grid>
                <Grid item md={12} sm={6} xs={12}>
                  <Button fullWidth color="primary" variant="contained">
                    <ShareIcon /> &nbsp; Spread the word
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item lg={8} md={8} xs={12}>
            <Box py={4}>
              <Tabs
                variant="fullWidth"
                value={selectedTab}
                onChange={handleTabChange}
                aria-label="Campaign Details tabs"
              >
                <Tab
                  label="About"
                  value="About"
                  icon={<InfoIcon />}
                  {...a11yProps(0)}
                />
                <Tab
                  label="Updates"
                  icon={<UpdateIcon />}
                  value="Updates"
                  {...a11yProps(2)}
                />
                <Tab
                  icon={<CommentIcon />}
                  label="Comments"
                  value="Comments"
                  {...a11yProps(2)}
                />
              </Tabs>

              <Grid container spacing={3}>
                <Grid item lg={12} xs={12}>
                  {getSelectedTab(selectedTab)}
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item lg={4} md={4} xs={12}>
            <Box p={4}>
              <Typography
                gutterBottom
                variant="h6"
                component="h3"
                className="campaign-title"
                noWrap={true}
              >
                Recent Activities on Campaign
              </Typography>
              <hr />
              <Box py={2}>
                <Card>
                  <CardContent>
                    <Typography
                      variant="h5"
                      color="textSecondary"
                      component="h5"
                    >
                      Top Donors
                    </Typography>
                    <Box py={2}>
                      <hr />
                    </Box>
                    <Typography
                      variant="h6"
                      color="textSecondary"
                      component="h6"
                    >
                      List of Top Donors
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const mapStateToProps = ({ auth, campaign }) => {
  return {
    ...campaign,
  };
};

export default connect(mapStateToProps)(CampaignDetails);
