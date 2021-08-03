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

export default function Header() {
  const anchor = useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [state, setState] = useState({
    openDrawer: false,
  });

  const toggleDrawer = (openDrawr) => {
    setState({
      ...state,
      openDrawer: openDrawr,
    });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
              <ListItemText primary={<a href="/search">Browse campaigns</a>} />
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
              <ListItemText primary={<a href="/profile/1">Profile</a>} />
            </ListItem>
            <Divider />

            <ListItem button>
              <ListItemIcon>
                <LockOpenIcon />
              </ListItemIcon>
              <ListItemText primary={<a href="/signin">Sign In</a>} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <ListItemText primary={<a href="/signout">Sign Out</a>} />
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
            <a href="/">
              <img className="logo" src={Logo} alt="Brand Logo" />
            </a>
          </h1>
          <Hidden mdUp>{getSideMenu()}</Hidden>
          <Hidden smDown>
            <nav>
              <a href="/search">Browse campaigns</a>
              <Button
                component="a"
                tabIndex={0}
                disableRipple={true}
                className="linkButton"
                onClick={handleClick}
                endIcon={<ArrowDropDown className="dropdownarrow" />}
              >
                Campaign For
              </Button>
              <a href="/profile/1">Profile</a>
              <a href="/signin">Sign In</a>
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
          onClose={handleClose}
        >
          <a href="/createcampaign/HealthCare">HealthCare</a>
          <a href="/createcampaign/Feeding">Feeding</a>
          <a href="/createcampaign/Animal_Shelter"> Animal Shelter</a>
        </Menu>
      )}
    </React.Fragment>
  );
}
