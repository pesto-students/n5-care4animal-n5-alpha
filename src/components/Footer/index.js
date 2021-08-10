import React from "react";
import "styles/footer.scss";
import Logo from "assets/images/Logo.png";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import { connect } from "react-redux";
import Category from "components/Category";

function Footer({ categories, callBack }) {
  return (
    <footer>
      <hr />
      <div className="footercolumns">
        <section className="footercolumn">
          <div>
            <img src={Logo} alt="logo" />
          </div>
          <div className="info">
            Care4Animal is a unique platform for helping Voiceless animals when
            they're in need of food, shelter or life-saving medical treatment
          </div>
          <div className="socialIcons">
            <FacebookIcon />
            <InstagramIcon />
            <TwitterIcon />
          </div>
        </section>
        <section className="footercolumn">
          <div>
            <h4>CAUSES</h4>
          </div>
          {}
          <Category categoryList={categories} callBack={() => {}} />
        </section>
      </div>
      <hr />
      <p>Copyright © 2010-2021. All Rights Reserved by Care4Animal</p>
    </footer>
  );
}

const mapStateToProps = ({ category }) => {
  return {
    ...category,
  };
};

export default connect(mapStateToProps)(Footer);
