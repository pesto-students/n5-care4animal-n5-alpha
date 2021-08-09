import React, { useRef, useState } from "react";
import "styles/header.scss";
import { Drawer, Hidden, Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CloseIcon from "@material-ui/icons/Close";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import WebAssetIcon from "@material-ui/icons/WebAsset";
import Logo from "assets/images/Logo.png";
import ArtTrackIcon from "@material-ui/icons/ArtTrack";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Menu from "@material-ui/core/Menu";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { requestLogout } from "store/actions/AuthActions";
import { useCookies } from "react-cookie";

function Header({ isAuthenticated, user, dispatch }) {
  const anchor = useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [cookies, removeCookie] = useCookies(["_userSession"]);

  const [state, setState] = useState({
    openDrawer: false,
  });

  const logoutUser = () => {
    removeCookie("_userSession");
    dispatch(requestLogout(user.sessionToken));
  };

  const toggleDrawer = (openDrawr) => {
    setState({
      ...state,
      openDrawer: openDrawr,
    });
  };

  const toggleMenu = (event) => {
    anchorEl ? setAnchorEl(null) : setAnchorEl(event.currentTarget);
  };

  const getSideMenu = () => {
    return (
      <nav>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          ref={anchor}
          onClick={(event) => toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          className="sideDrawer"
          anchor="left"
          open={state.openDrawer}
          onClose={() => toggleDrawer(false)}
        >
          <div className="headerTopRow">
            <img className="logo" src={Logo} alt="Brand Logo" />
            <IconButton edge="end" onClick={(event) => toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          <Divider />
          <List className="sideheader">
            <ListItem button>
              <ListItemIcon>
                <WebAssetIcon />
              </ListItemIcon>
              <ListItemText
                primary={<Link to="/search">Browse campaigns</Link>}
              />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <ArtTrackIcon />
              </ListItemIcon>
              <ListItemText primary="Campaign For" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <LockOpenIcon />
              </ListItemIcon>
              <ListItemText primary={<Link to="/profile/1">Profile</Link>} />
            </ListItem>
            <Divider />

            <ListItem button>
              <ListItemIcon>
                <LockOpenIcon />
              </ListItemIcon>
              <ListItemText primary={<Link to="/signin">Sign In</Link>} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <ListItemText primary={<Link to="/signout">Sign Out</Link>} />
            </ListItem>
            <Divider />
          </List>
        </Drawer>
      </nav>
    );
  };

  return (
    <React.Fragment key={anchor}>
      <header className="header-fixed">
        <div className="header-limiter">
          <h1>
            <Link to="/">
              {" "}
              <img className="logo" src={Logo} alt="Brand Logo" />{" "}
            </Link>
          </h1>
          <Hidden mdUp>{getSideMenu()}</Hidden>
          <Hidden smDown>
            <nav>
              <Link to="/search">Browse campaigns </Link>
              <Button
                component="a"
                tabIndex={0}
                disableRipple={true}
                className="linkButton"
                onClick={toggleMenu}
                endIcon={<ArrowDropDown className="dropdownarrow" />}
              >
                Campaign For
              </Button>
              <Link to="/profile">Profile</Link>
              {isAuthenticated ? (
                <Link to="/" onClick={logoutUser}>
                  Sign Out
                </Link>
              ) : (
                <Link to="/signin">Sign In</Link>
              )}
            </nav>
          </Hidden>
        </div>
      </header>
      {anchorEl && (
        <Menu
          id="simple-menu"
          className="campaignfor-menu"
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          getContentAnchorEl={null}
          anchor="bottom"
          keepMounted
          open={Boolean(anchorEl)}
          onClose={toggleMenu}
        >
          <Link to="/createcampaign/HealthCare" onClick={toggleMenu}>
            HealthCare
          </Link>
          <Link to="/createcampaign/Feeding" onClick={toggleMenu}>
            Feeding
          </Link>
          <Link to="/createcampaign/Animal_Shelter" onClick={toggleMenu}>
            Animal Shelter
          </Link>
        </Menu>
      )}
    </React.Fragment>
  );
}

const mapStateToProps = ({ auth }) => {
  return { ...auth };
};

export default connect(mapStateToProps)(Header);
