import React from "react";
import "styles/footer.scss";
import Logo from "assets/images/Logo.png";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import PinterestIcon from "@material-ui/icons/Pinterest";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { connect } from "react-redux";
import Category from "components/Category";
import { Box, Container, Grid } from "@material-ui/core";
import { setCategory } from "store/actions/CategoryActions";

function Footer({ categories, dispatch }) {
  return (
    <footer>
      <hr />
      <Box my={2}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={9} md={8} sm={8} xs={12}>
              <Box py={2}>
                <img src={Logo} alt="logo" />
              </Box>
              <Box py={2}>
                Care4Animal is a unique platform for helping Voiceless animals
                when they're in need of food, shelter or life-saving medical
                treatment. Become a proud member of our rescue team by making a
                donation, sponsoring an animal and more.
              </Box>
              <div className="socialIcons">
                <FacebookIcon style={{ color: "rgba(80, 124, 190)" }} />
                <InstagramIcon style={{ color: "rgb(236, 20, 20)" }} />
                <TwitterIcon style={{ color: "rgb(99, 205, 241)" }} />
                <PinterestIcon style={{ color: "rgb(241, 98, 97)" }} />
                <LinkedInIcon style={{ color: "rgb(144, 202, 221)" }} />
              </div>
            </Grid>
            <Grid item lg={3} md={4} sm={4} xs={12} className="footercolumn">
              <div>
                <h4>CAUSES</h4>
              </div>
              <Category
                categoryList={categories}
                callBack={(selectedCategory) =>
                  dispatch(setCategory(selectedCategory))
                }
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <hr />
      <Box my={4}>
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
