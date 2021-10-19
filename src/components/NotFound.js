import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
 
  image: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
  }

}));

export const NotFound = () => {
  const classes = useStyles();

  return (
    <Grid>
        <h3>Nothing Here</h3>
      <img className={classes.image} alt="No Product Found" src="https://img.freepik.com/free-vector/error-404-concept-illustration_114360-1811.jpg?size=626&ext=jpg" />
    </Grid>
  );
};
