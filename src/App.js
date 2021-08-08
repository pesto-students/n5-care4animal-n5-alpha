import React, { useEffect, useState } from "react";

import Header from "components/Header";
import Footer from "components/Footer";
import { Routes } from "routes";
import { connect } from "react-redux";
import { clear } from "store/actions/AlertActions";

import ErrorBoundary from "errorhandling/ErrorBoundary";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useCookies } from "react-cookie";
import { requestAutoLogin } from "store/actions/AuthActions";
import { useLocation, useHistory } from "react-router-dom";
import MainLoader from "components/Loaders/MainLoader";

function App({ alert, loading, isAuthenticated, user, dispatch }) {
  const location = useLocation();
  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies(["_userSession"]);

  const [tryRelogin, setTryRelogn] = useState(false);
  useEffect(() => {
    if (
      cookies._userSession &&
      cookies._userSession !== "undefined" &&
      !isAuthenticated
    ) {
      if (!isAuthenticated) {
        history.push({
          pathname: "/signin",
          search: `?loc${location.pathname}`,
        });
      }

      dispatch(
        requestAutoLogin({
          ...cookies._userSession,
        })
      );
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && user.sessionToken) {
      removeCookie("_userSession");
      setCookie(
        "_userSession",
        {
          objectId: user.objectId,
          sessionToken: user.sessionToken,
        },
        {
          path: "/",
        }
      );

      if (!loading) {
        history.push(location.search.replace("?loc", ""));
      } else {
        history.push(`/profile/${user.objectId}`);
      }
      setTryRelogn(false);
    }
  }, [isAuthenticated, user, loading]);

  const closeSnackBar = () => {
    dispatch(clear());
  };

  const showAlerts = (message, type) => {
    setTimeout(() => dispatch(clear()), 2000);

    return (
      <Snackbar
        className="main-snackbar"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={true}
        autoHideDuration={2000}
        onClose={closeSnackBar}
      >
        <Alert severity={type}>{message}</Alert>
      </Snackbar>
    );
  };

  const { message, type } = alert;
  return (
    <>
      <ErrorBoundary>
        <Header />
        <section className="main">
          {type && showAlerts(message, type)}
          {tryRelogin ? <MainLoader /> : <Routes />}
        </section>
        <Footer />
      </ErrorBoundary>
    </>
  );
}

const mapStateToProps = ({ alerts, auth }) => {
  return {
    alert: alerts.alert || {},
    ...auth,
  };
};

export default connect(mapStateToProps)(App);
