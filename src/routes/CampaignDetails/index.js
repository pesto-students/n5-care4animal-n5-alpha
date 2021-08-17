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
import ShareIcon from "@material-ui/icons/Share";
import PeopleIcon from "@material-ui/icons/People";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PaymentDialog from "components/PaymentDialog";

import * as yup from "yup";
import { useFormik } from "formik";
import { errorAlertAction } from "store/actions/AlertActions";
import useMakePayment from "hooks/useMakePayment";

const validationSchema = yup.object({
  amount: yup
    .number("Should be a valid number.")
    .required("Please enter amount")
    .min(100, "Minimum ₹100 should be the donation amount.")
    .max(100000, "Minimum ₹100000 should be the donation amount."),
});

const CampaignDetails = ({
  isAuthenticated,
  user,
  campaign,
  loading = true,
  dispatch,
  history,
}) => {
  let { id } = useParams();
  const [selectedTab, setTab] = useState("About");
  const [open, setOpen] = useState(false);
  const { status, paymentInProgress, makePayment } = useMakePayment();

  const formik = useFormik({
    initialValues: {
      amount: 100,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.amount) {
        // amount, campaignInfoId, donorUserId;
        makePayment(
          user.sessionToken,
          {
            amount: values.amount,
            campaignInfoId: campaign.objectId,
            donorUserId: user.objectId,
          },
          user
        );
        handleClose();
      }
    },
  });

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

  if (loading || paymentInProgress) {
    return <Loader />;
  }

  if (!loading && campaign === undefined) {
    history.goBack();
  }

  const handleDonateClick = () => {
    if (isAuthenticated) {
      // open donation modal
      setOpen(true);
    } else {
      history.push("/signin");
      dispatch(errorAlertAction("Please Login to Donate"));
    }
  };

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
            <Box py={10} textAlign="center">
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

  const getRaisedInfo = () => {
    if (campaign.raisedAmount === 0) {
      return (
        <>
          <span className="goal">
            <Currency value={campaign.raisedAmount} />{" "}
          </span>
          raised out of &nbsp;
          <span className="goal">
            <Currency value={campaign.goalAmount} />
          </span>{" "}
          goal
        </>
      );
    } else {
      return (
        <>
          <Box py={1}>
            <Typography variant="h5" component="h5">
              Be the first one to donate
            </Typography>
          </Box>
          <span className="goal">
            Goal Amount :&nbsp; <Currency value={campaign.goalAmount} />
          </span>
        </>
      );
    }
  };

  const handleClose = () => {
    setOpen(false);
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
        {open && <PaymentDialog formik={formik} handleClose={handleClose} />}

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box py={2} px={1}>
              <Typography align="center" variant="h3" component="h3">
                {campaign.name}
              </Typography>
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
            <Grid container spacing={3}>
              <Grid item md={12} sm={6} xs={12}>
                <Button
                  fullWidth
                  className="hero-button primary-btn btn"
                  variant="contained"
                  onClick={handleDonateClick}
                >
                  <FavoriteIcon /> &nbsp; Pay with Razor Pay
                </Button>{" "}
              </Grid>
              <Grid item md={12} sm={6} xs={12}>
                <Button
                  fullWidth
                  className="hero-button primary-btn"
                  variant="outlined"
                  color="primary"
                >
                  <ShareIcon /> &nbsp; Spread the word
                </Button>
              </Grid>
              <Grid item md={12} sm={6} xs={12}>
                <Typography align="center">
                  Every Social media share can bring ₹5000
                </Typography>
              </Grid>
            </Grid>
            <Box p={4}>
              {getRaisedInfo()}
              <Box py={2}>
                <ProgressBar
                  progress={
                    (campaign.raisedAmount / campaign.goalAmount) * 100 + "%"
                  }
                />
              </Box>
              <Grid container spacing={3}>
                <Grid item md={6} sm={3} xs={6}>
                  <Typography>
                    <span className="donors">{campaign.noOfDonors}</span> Donors
                  </Typography>
                </Grid>
                <Grid item md={6} sm={3} xs={6}>
                  <Typography align="right">
                    <span className="donors">
                      <Moment diff={campaign.createdAt} unit="days">
                        {moment(campaign.createdAt).add(30, "d")}
                      </Moment>
                    </span>{" "}
                    days left
                  </Typography>
                </Grid>
              </Grid>

              {/* <Grid item md={12} sm={6} xs={12}>
                <Box py={2}>
                  <TextField
                    fullWidth
                    id="standard-required"
                    label="Amount to Donate"
                    placeholder="Enter Amount you want to donate"
                  />
                </Box>
              </Grid> */}
            </Box>
            <Box pb={4}>
              <hr />
            </Box>
            <Box px={4}>
              <Card>
                <CardContent>
                  <Grid container spacing={3}>
                    <Box pt={1} ml={2}>
                      <PeopleIcon />
                    </Box>

                    <Box ml={2}>
                      <Typography
                        variant="h5"
                        color="textSecondary"
                        component="h5"
                      >
                        Campaign Team
                      </Typography>
                    </Box>
                  </Grid>

                  <Box py={2}>
                    <hr />
                  </Box>
                  <Typography variant="h6" color="textSecondary" component="h6">
                    Name of the creator
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <Box p={4}>
              <Typography
                gutterBottom
                variant="h6"
                component="h3"
                noWrap={true}
              >
                Recent Activities on Campaign
              </Typography>
              <hr />
              <Box py={2}>
                <Card>
                  <CardContent>
                    <Grid container spacing={3}>
                      <Box pt={1} ml={2}>
                        <PeopleIcon />
                      </Box>

                      <Box ml={2}>
                        <Typography
                          variant="h5"
                          color="textSecondary"
                          component="h5"
                        >
                          Top Donors
                        </Typography>
                      </Box>
                    </Grid>

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

            <Box></Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const mapStateToProps = ({ auth, campaign }) => {
  return {
    isAuthenticated: auth.isAuthenticated,
    user: auth.user,
    ...campaign,
  };
};

export default connect(mapStateToProps)(CampaignDetails);
