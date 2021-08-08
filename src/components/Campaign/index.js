import React from "react";
import "styles/Campaign.scss";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Chip } from "@material-ui/core";
import { ProgressBar } from "./ProgressBar";

const mockCamp = {
  id: "object12345",
  name: "I want to help ill animals.I want to help i",
  description:
    "There are few ill animals who are suffering from disease, want to helpthe,",
  goalAmount: 200000,
  raisedAmount: 50000,
  image: "https://source.unsplash.com/900x600/?cow,dog,cat",
  noOfDonors: 34,
  createdAt: new Date(),
  startTs: new Date(),
  endTs: new Date(),
  user: {
    name: "Kishor",
  },
};

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export const Campaign = ({ data, showDetails = () => {} }) => {
  const classes = useStyles();

  return (
    <Card className={`${classes.root} campaign-card`}>
      <CardActionArea>
        <CardMedia
          className={`${classes.media} campaign-img`}
          image={mockCamp.image}
          title={mockCamp.name}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="h3"
            onClick={() => showDetails(mockCamp.id)}
          >
            {mockCamp.name}
          </Typography>

          <div className="card-row">
            <div className="c-info">
              <span>{mockCamp.goalAmount}</span> <br />
              Required
            </div>

            <div className="c-info">
              <span>{(mockCamp.raisedAmount / mockCamp.goalAmount) * 100}</span>{" "}
              <br />
              Raised
            </div>
            <div className="c-info">
              <span>15 </span>
              <br />
              Days Left
            </div>
          </div>
          <ProgressBar
            progress={(mockCamp.raisedAmount / mockCamp.goalAmount) * 100 + "%"}
          />
          <div className="card-row">
            <div>By {mockCamp.user.name} </div>
            <div>
              <Chip label="Healthcare" />
            </div>
          </div>
        </CardContent>
      </CardActionArea>
      {/* <div className="overlay"></div>
      <CardActions>
        <Typography variant="subtitle1" component="h2">
          {mockCamp.description}
        </Typography>
        <br />
        <Button size="small" variant="contained" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
};
