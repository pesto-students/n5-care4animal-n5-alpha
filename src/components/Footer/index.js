import React from "react";
import "styles/footer.scss";
import Logo from "assets/images/Logo.png";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import { connect } from "react-redux";
import Category from "components/Category";
import { Box, Container, Grid, Tab, Tabs } from "@material-ui/core";

function Footer({ categories, callBack }) {
  return (
    <footer>
      <hr />
      <Box my={1.5}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={9} md={8} sm={8} xs={12}>
              <div>
                <img src={Logo} alt="logo" />
              </div>
              <div className="info">
                Care4Animal is a unique platform for helping Voiceless animals
                when they're in need of food, shelter or life-saving medical
                treatment
              </div>
              <div className="socialIcons">
                <FacebookIcon />
                <InstagramIcon />
                <TwitterIcon />
              </div>
            </Grid>
            <Grid item lg={3} md={4} sm={4} xs={12} className="footercolumn">
              <div>
                <h4>CAUSES</h4>
              </div>
              {}
              <Category categoryList={categories} callBack={() => {}} />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <hr />
      <Box my={1.5}>
        <p>Copyright ©2021. All Rights Reserved by Care4Animal</p>
      </Box>
    </footer>
  );
}

const mapStateToProps = ({ category }) => {
  return {
    ...category,
  };
};

export default connect(mapStateToProps)(Footer);
