import "styles/Card.scss";
import imageOne from "assets/images/hero1.jpg";
import image3 from "assets/images/hero1.jpg";

import Chip from "@material-ui/core/Chip";
import { ProgressBar } from "./ProgressBar";

const mockCamp = {
  id: "object12345",
  name: "I want to help ill animals.",
  description:
    "There are few ill animals who are suffering from disease, want to helpthe, by providing",
  goalAmount: 200000,
  raisedAmount: 50000,
  noOfDonors: 34,
  createdAt: new Date(),
  startTs: new Date(),
  endTs: new Date(),
  user: {
    name: "Kishor",
  },
};

export const Card = ({ data }) => {
  return (
    <section className="card">
      <img
        src={+data % 2 === 0 ? imageOne : image3}
        className="cardImage"
        alt="campaign"
      />
      <div className="card-content">
        <h3 className="ellipsis name"> {mockCamp.name} </h3>
        <p>{mockCamp.description}</p>{" "}
        <ProgressBar
          progress={(mockCamp.raisedAmount / mockCamp.goalAmount) * 100 + "%"}
        />
      </div>
      <div className="card-content-2">
        <div>
          <div>
            <span>{mockCamp.goalAmount}</span> <br />
            Required
          </div>

          <div>
            <span>{(mockCamp.raisedAmount / mockCamp.goalAmount) * 100}</span>{" "}
            <br />
            Raised
          </div>
          <div>
            <span>15 </span>
            <br />
            Days Left
          </div>
        </div>
        <div>
          <div>By {mockCamp.user.name} </div>
          <div>
            <Chip label="Healthcare" />
          </div>
        </div>
      </div>
    </section>
  );
};
