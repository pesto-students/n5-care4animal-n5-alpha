import React from "react";
import "styles/footer.scss";
import Logo from "assets/images/Logo.png";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import { Link } from "react-router-dom";

export default function Footer() {
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
          <Link to="/createcampaign/HealthCare">HealthCare</Link>
          <Link to="/createcampaign/Feeding">Feeding</Link>
          <Link to="/createcampaign/Animal_Shelter">Animal Shelter</Link>
        </section>

        {/* <section className="footercolumn">
          <div>
            <h4>ENGAGE</h4>
          </div>
          <a href="#">Know More</a>
          <a href="#">FAQ</a>
        </section> */}
      </div>
      <hr />
      <p>Copyright © 2010-2021. All Rights Reserved by Care4Animal</p>
    </footer>
  );
}
