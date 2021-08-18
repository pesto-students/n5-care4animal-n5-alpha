import React from "react";
import "styles/Campaign.scss";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Chip } from "@material-ui/core";
import { ProgressBar } from "./ProgressBar";
import Currency from "components/Shared/Currency";
import Moment from "react-moment";
import moment from "moment";
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
    <Card
      className={`${classes.root} campaign-card`}
      onClick={() => showDetails(campaign.objectId)}
    >
      <CardActionArea>
        <CardMedia
          className={`${classes.media} campaign-img`}
          image={
            campaign.image
              ? campaign.image.url
              : "https://source.unsplash.com/900x600/?cow,dog,cat"
          }
          title={campaign.name}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="h3"
            className="campaign-title"
            noWrap={true}
          >
            {campaign.name}
          </Typography>

          <div className="card-row">
            <div className="c-info">
              <span>
                <Currency value={campaign.goalAmount} />
              </span>{" "}
              <br />
              Required
            </div>

            <div className="c-info">
              <span>
                {(campaign.raisedAmount / campaign.goalAmount).toFixed(4) * 100}
              </span>{" "}
              % <br />
              Raised
            </div>
            <div className="c-info">
              <span>
                <Moment diff={campaign.createdAt} unit="days">
                  {moment(campaign.createdAt).add(30, "d")}
                </Moment>
              </span>
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
    </Card>
  );
};
