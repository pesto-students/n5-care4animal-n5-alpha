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

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export const Campaign = ({ campaign, showDetails = () => {} }) => {
  const classes = useStyles();

  return (
    <Card className={`${classes.root} campaign-card`}>
      <CardActionArea>
        <CardMedia
          className={`${classes.media} campaign-img`}
          image={
            campaign.image || "https://source.unsplash.com/900x600/?cow,dog,cat"
          }
          title={campaign.name}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="h3"
            onClick={() => showDetails(campaign.id)}
          >
            {campaign.name}
          </Typography>

          <div className="card-row">
            <div className="c-info">
              <span>{campaign.goalAmount}</span> <br />
              Required
            </div>

            <div className="c-info">
              <span>{(campaign.raisedAmount / campaign.goalAmount) * 100}</span>{" "}
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
            progress={(campaign.raisedAmount / campaign.goalAmount) * 100 + "%"}
          />
          <div className="card-row">
            <div>By {campaign.userRef.firstName} </div>
            <div>
              <Chip label={campaign.categoryRef.name} />
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
