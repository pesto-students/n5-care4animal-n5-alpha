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
  Card,
  Avatar,
  Tooltip,
} from "@material-ui/core";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "components/Shared/Loader";
import Currency from "components/Shared/Currency";
import Moment from "react-moment";
import moment from "moment";
import InfoIcon from "@material-ui/icons/Info";
import UpdateIcon from "@material-ui/icons/Update";
import CommentIcon from "@material-ui/icons/Comment";
import PeopleIcon from "@material-ui/icons/People";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PaymentDialog from "components/PaymentDialog";

import * as yup from "yup";
import { useFormik } from "formik";
import { errorAlertAction } from "store/actions/AlertActions";
import useMakePayment from "hooks/useMakePayment";
import useLoadCampaignDetails from "hooks/useLoadCampaignDetails";
import ShareThis from "components/ShareApp";
import CampaignUpdates from "containers/CampaignUpdates";

const validationSchema = yup.object({
  amount: yup
    .number("Should be a valid number.")
    .required("Please enter amount")
    .min(100, "Minimum ₹100 should be the donation amount.")
    .max(100000, "Minimum ₹100000 should be the donation amount."),
});

const CampaignDetails = ({ isAuthenticated, user, dispatch, history }) => {
  let { id } = useParams();
  const [selectedTab, setTab] = useState("About");
  const [open, setOpen] = useState(false);
  const { status, paymentInProgress, makePayment } = useMakePayment();
  const [isLoading, campaign, loadDetails] = useLoadCampaignDetails();

  const formik = useFormik({
    initialValues: {
      amount: 100,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.amount) {
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
    if ((id && !isLoading) || status === "success") {
      //  call load campaign details hool
      loadDetails(id);
    }
  }, [id, status]);

  if (paymentInProgress || isLoading) {
    return <Loader />;
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
              <Typography variant="h6">About Campaign</Typography>
            </Box>
            <Typography variant="body1">{campaign.description}</Typography>
          </Grid>
        );
        break;

      case "Updates":
        tabContent = (
          <Grid item xs={12}>
            <Box py={10} textAlign="center">
              <CampaignUpdates />
            </Box>
          </Grid>
        );
        break;
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
    if (campaign.raisedAmount !== 0) {
      return (
        <>
          <Typography>
            <span className="goal">
              <Currency value={campaign.raisedAmount} />{" "}
            </span>
            <br />
            raised out of &nbsp;
            <span className="">
              <Currency value={campaign.goalAmount} />
            </span>{" "}
            goal
          </Typography>
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
          <Typography>
            <span className="goal">
              Goal Amount :&nbsp; <Currency value={campaign.goalAmount} />
            </span>
          </Typography>
        </>
      );
    }
  };

  const getCreatorDetails = (userRef) => {
    return (
      <Grid container>
        <Box p={2}>
          <Avatar
            sx={{
              height: 34,
              width: 34,
            }}
            src={
              userRef.displayPic
                ? userRef.displayPic.url
                : "https://source.unsplash.com/900x600/?person"
            }
          />
        </Box>
        <Box pl={2} pt={3}>
          <Typography gutterBottom variant="subtitle1">
            {`${userRef.firstName} ${userRef.lastName}`}
          </Typography>
        </Box>
      </Grid>
    );
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (!isLoading && campaign === undefined) {
    return history.goBack();
  }

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        {open && (
          <PaymentDialog
            formik={formik}
            showConsentDialogue={campaign.userRef.objectId === user.objectId}
            handleClose={handleClose}
          />
        )}

        <Box px="1rem">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box py={2} px={1}>
                <Typography align="center" variant="h3" component="h3">
                  {campaign.name}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={8} md={8} xs={12}>
              {campaign.categoryRef && (
                <Tooltip
                  title="Campaign Cateogry"
                  aria-label="Campaign Cateogry"
                >
                  <span className="cateogry-badge" data="Campaign Cateogry">
                    <Typography>{campaign.categoryRef.name}</Typography>
                  </span>
                </Tooltip>
              )}

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
                    <FavoriteIcon /> &nbsp;{" "}
                    <Typography> Pay with Razor Pay </Typography>
                  </Button>{" "}
                </Grid>
                <Grid item md={12} sm={6} xs={12}>
                  <ShareThis />
                </Grid>
                <Grid item md={12} sm={6} xs={12}>
                  <Typography align="center">
                    Every Social media share can bring <Currency value={5000} />
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
                      <span className="donors">{campaign.noOfDonors}</span>{" "}
                      {campaign.noOfDonors > 1 ? "Donations" : "Donation"}
                    </Typography>
                  </Grid>
                  <Grid item md={6} sm={3} xs={6}>
                    <Typography align="right">
                      <span className="donors">
                        {campaign.endDate && (
                          <Moment diff={moment()} unit="days">
                            {moment(campaign.endDate.iso)}
                          </Moment>
                        )}
                      </span>{" "}
                      days left
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box pb={4}>
                <hr />
              </Box>
              <Box>
                <Card>
                  <Box p={2}>
                    <Grid container spacing={3}>
                      <Box pt={1} ml={2}>
                        <PeopleIcon />
                      </Box>

                      <Box ml={2} mt={0.5}>
                        <Typography variant="h5">Campaign Team</Typography>
                      </Box>
                    </Grid>
                  </Box>

                  <Box py={1}>
                    <hr />
                  </Box>
                  {campaign.userRef && getCreatorDetails(campaign.userRef)}
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    isAuthenticated: auth.isAuthenticated,
    user: auth.user,
  };
};

export default connect(mapStateToProps)(CampaignDetails);
