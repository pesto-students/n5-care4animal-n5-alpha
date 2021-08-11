import "styles/CampaignDetails.scss";
import { ProgressBar } from "components/Campaign/ProgressBar";
import { Box, Button, CardMedia, Container, Grid } from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  getCampaignDetailAction,
  resetReducer,
} from "store/actions/CampaignActions";
import Loader from "components/Shared/Loader";
import Currency from "components/Shared/Currency";
import Moment from "react-moment";
import moment from "moment";

const CampaignDetails = ({ campaign, loading = true, dispatch, history }) => {
  let { id } = useParams();

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
          <Grid item lg={6} md={6} xs={12}>
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
          <Grid item lg={6} md={6} xs={12}>
            <h2> {campaign.name}</h2>
            <br />
            <span className="raised">
              <Currency value={campaign.raisedAmount} />{" "}
            </span>
            out of{" "}
            <span className="goal">
              <Currency value={campaign.goalAmount} />
            </span>
            <br />
            <ProgressBar
              progress={
                (campaign.raisedAmount / campaign.goalAmount) * 100 + "%"
              }
            />
            <div>
              <span className="donors">{campaign.noOfDonors}</span> Donors
              <div>
                <span className="donors">
                  <Moment diff={campaign.createdAt} unit="days">
                    {moment().add(30, "d")}
                  </Moment>
                </span>{" "}
                days left
              </div>
            </div>
            <TextField
              className="donate-amount"
              id="standard-required"
              label="Amount to Donate"
              placeholder="Enter Amount you want to donate"
            />{" "}
            <br /> <br />
            <div className="actions">
              <Button variant="contained" color="primary">
                Pay with Razor Pay
              </Button>

              <Button variant="contained" color="primary">
                <ShareIcon />
                Share this campaign
              </Button>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="camp-more">
              <h2> About Campaign</h2>
              <br />
              <p> {campaign.description} </p>
            </div>{" "}
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
