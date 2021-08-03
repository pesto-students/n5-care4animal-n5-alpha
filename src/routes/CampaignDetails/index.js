import "styles/CampaignDetails.scss";

import image3 from "assets/images/hero1.jpg";
import { ProgressBar } from "components/Card/ProgressBar";
import { Button } from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import TextField from "@material-ui/core/TextField";

const mockCamp = {
  id: "object12345",
  name: "I want to help ill animals.",
  description:
    "There are few ill animals who are suffering from disease, want to helpthe, by providing",
  goalAmount: 200000,
  raisedAmount: 50000,
  noOfDonors: 27,
  createdAt: new Date(),
  startTs: new Date(),
  endTs: new Date() + 10,
  user: {
    name: "Kishor",
  },
};

export const CampaignDetails = () => {
  return (
    <section className="host">
      <div className="campaign-details">
        <div className="camp-image">
          <img src={image3} className="" alt="campaign" />
        </div>
        <div className="camp-details">
          <h2> {mockCamp.name}</h2>
          <br />
          <span className="raised">{mockCamp.raisedAmount} </span>out of{" "}
          <span className="goal">{mockCamp.goalAmount}</span>
          <br />
          <ProgressBar
            progress={(mockCamp.raisedAmount / mockCamp.goalAmount) * 100 + "%"}
          />
          <br />
          <div>
            <div>
              <span className="donors">{mockCamp.noOfDonors}</span> Donors
            </div>
            <div>
              <span className="donors">{mockCamp.startTs.getDate() + 15}</span>{" "}
              days left
            </div>
          </div>
          <br />
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
        </div>
        <div className="camp-more">
          <h2> About Campaign</h2>
          <br />
          <p> {mockCamp.description} </p>
        </div>{" "}
      </div>
    </section>
  );
};
