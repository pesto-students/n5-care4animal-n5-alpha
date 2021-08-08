import "styles/CampaignDetails.scss";
import { ProgressBar } from "components/Campaign/ProgressBar";
import { Box, Button, CardMedia, Container, Grid } from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import TextField from "@material-ui/core/TextField";

const mockCamp = {
  id: "object12345",
  name: "I want to help ill animals.",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  goalAmount: 200000,
  raisedAmount: 50000,
  noOfDonors: 27,
  image: "https://source.unsplash.com/900x600/?cow,dog,cat",
  createdAt: new Date(),
  startTs: new Date(),
  endTs: new Date() + 10,
  user: {
    name: "Kishor",
  },
};

export const CampaignDetails = () => {
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
              image={mockCamp.image}
              className="campaign-image"
              title={mockCamp.name}
            />
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <h2> {mockCamp.name}</h2>
            <br />
            <span className="raised">{mockCamp.raisedAmount} </span>out of{" "}
            <span className="goal">{mockCamp.goalAmount}</span>
            <br />
            <ProgressBar
              progress={
                (mockCamp.raisedAmount / mockCamp.goalAmount) * 100 + "%"
              }
            />
            <div>
              <span className="donors">{mockCamp.noOfDonors}</span> Donors
              <div>
                <span className="donors">
                  {mockCamp.startTs.getDate() + 15}
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
              <p> {mockCamp.description} </p>
            </div>{" "}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
