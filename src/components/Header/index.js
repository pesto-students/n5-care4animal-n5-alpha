import React, { useRef, useState } from "react";
import "styles/header.scss";
import {
  Drawer,
  Hidden,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
} from "@material-ui/core";
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
import Logo from "assets/images/LogoLight.png";
import ArtTrackIcon from "@material-ui/icons/ArtTrack";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Menu from "@material-ui/core/Menu";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { requestLogout } from "store/actions/AuthActions";
import Category from "components/Category";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Collapse from "@material-ui/core/Collapse";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

function Header({ isAuthenticated, user, categories, dispatch }) {
  const history = useHistory();

  const anchor = useRef(null);
  const [menuState, setAnchorEl] = React.useState({
    anchorEl: "",
    menuName: "",
  });

  const [state, setState] = useState({
    openDrawer: false,
  });

  const [openSubMenu, toggleSubmenu] = useState();

  const onMobileMenuClick = (route) => {
    history.push(route);
  };

  const logoutUser = () => {
    setAnchorEl({
      anchorEl: "",
      menuName: "",
    });
    dispatch(requestLogout(user.sessionToken));
  };

  const toggleDrawer = (openDrawr) => {
    setState({
      ...state,
      openDrawer: openDrawr,
    });
  };

  const toggleMenu = (event, menuName) => {
    menuState.anchorEl
      ? setAnchorEl({
          anchorEl: null,
          menuName: "",
        })
      : setAnchorEl({
          anchorEl: event.currentTarget,
          menuName: menuName,
        });
  };

  const handleSubMenu = () => {
    toggleSubmenu(!openSubMenu);
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
            <ListItem button onClick={() => onMobileMenuClick("/search")}>
              <ListItemIcon>
                <WebAssetIcon />
              </ListItemIcon>
              <ListItemText primary="Browse campaigns" />
            </ListItem>
            <Divider />
            <ListItem button onClick={handleSubMenu}>
              <ListItemIcon>
                <ArtTrackIcon />
              </ListItemIcon>
              <ListItemText primary="Campaign For" />
              {openSubMenu ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Divider />
            <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
              <List
                component="div"
                disablePadding
                className="mobile-cateogry-menu"
              >
                <Category
                  categoryList={categories}
                  callBack={() => toggleDrawer(false)}
                />
              </List>
            </Collapse>
            {isAuthenticated ? (
              <>
                <ListItem
                  button
                  onClick={() => onMobileMenuClick(`/profile/${user.objectId}`)}
                >
                  <ListItemIcon>
                    <LockOpenIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemIcon>
                    <LockIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Link to="/" onClick={logoutUser}>
                        Sign Out
                      </Link>
                    }
                  />
                </ListItem>
                <Divider />
              </>
            ) : (
              <ListItem button onClick={() => onMobileMenuClick("/signin")}>
                <ListItemIcon>
                  <LockOpenIcon />
                </ListItemIcon>
                <ListItemText primary="Sign In" />
              </ListItem>
            )}
          </List>
        </Drawer>
      </nav>
    );
  };

  return (
    <React.Fragment key={anchor}>
      <AppBar position="fixed">
        <Toolbar>
          <Container maxWidth="lg">
            <Grid container>
              <Grid item lg={6} md={6} sm={8} xs={8}>
                <h1>
                  <Link to="/">
                    {" "}
                    <img className="logo" src={Logo} alt="Brand Logo" />{" "}
                  </Link>
                </h1>
              </Grid>
              <Grid item lg={6} md={6} sm={4} xs={4}>
                <Grid container justifyContent="flex-end">
                  <Hidden mdUp>{getSideMenu()}</Hidden>
                  <Hidden smDown>
                    <nav>
                      <Link to="/search">Browse campaigns </Link>
                      <Button
                        component={Link}
                        tabIndex={0}
                        disableRipple={true}
                        className="linkButton"
                        onClick={(event) => toggleMenu(event, "campaigns")}
                        endIcon={<ArrowDropDown className="dropdownarrow" />}
                      >
                        Campaign For
                      </Button>

                      {isAuthenticated ? (
                        <IconButton
                          component={Link}
                          tabIndex={0}
                          disableRipple={true}
                          className="linkButton"
                          onClick={(event) => toggleMenu(event, "account")}
                        >
                          Welcome {user.firstName} &nbsp;
                          <AccountCircle />
                        </IconButton>
                      ) : (
                        <Link to="/signin">Sign In</Link>
                      )}
                    </nav>
                  </Hidden>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
      {
        <Menu
          id="simple-menu"
          className="campaignfor-menu"
          anchorEl={menuState.anchorEl}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          getContentAnchorEl={null}
          anchor="bottom"
          keepMounted
          open={menuState.menuName == "campaigns"}
          onClose={toggleMenu}
        >
          <Category categoryList={categories} callBack={toggleMenu} />
        </Menu>
      }
      {isAuthenticated && menuState.anchorEl && (
        <Menu
          id="acount-menu"
          className="campaignfor-menu"
          anchorEl={menuState.anchorEl}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          getContentAnchorEl={null}
          anchor="bottom"
          keepMounted
          open={menuState.menuName === "account"}
          onClose={toggleMenu}
        >
          <Link to={`/profile/${user.objectId}`} onClick={toggleMenu}>
            Profile
          </Link>
          <Link to="/" onClick={logoutUser}>
            Sign Out
          </Link>
        </Menu>
      )}
    </React.Fragment>
  );
}

const mapStateToProps = ({ auth, category }) => {
  return { ...auth, ...category };
};

export default connect(mapStateToProps)(Header);
