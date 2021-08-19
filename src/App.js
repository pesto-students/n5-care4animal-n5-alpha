import React, { useEffect } from "react";

import Header from "components/Header";
import Footer from "components/Footer";
import { Routes } from "routes";
import { connect } from "react-redux";
import { clearAlertAction } from "store/actions/AlertActions";

import ErrorBoundary from "errorhandling/ErrorBoundary";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useCookies } from "react-cookie";
import { requestAutoLogin } from "store/actions/AuthActions";
import { useLocation, useHistory } from "react-router-dom";
import MainLoader from "components/Loaders/MainLoader";
import { getCategory } from "store/actions/CategoryActions";

function App({ alert, loading, loggedOut, isAuthenticated, user, dispatch }) {
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const location = useLocation();
  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    if (
      !loggedOut &&
      cookies._userSession &&
      cookies._userSession !== "undefined" &&
      !isAuthenticated
    ) {
      history.push({
        search: `?loc${location.pathname}`,
      });

      dispatch(
        requestAutoLogin({
          ...cookies._userSession,
        })
      );
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && user.sessionToken) {
      removeCookie("_userSession", {
        path: "/",
      });
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
      history.push(location.search.replace("?loc", ""));
    } else if (loggedOut) {
      removeCookie("_userSession", {
        path: "/",
      });
    }
  }, [isAuthenticated, loading]);

  const closeSnackBar = () => {
    dispatch(clearAlertAction());
  };

  const showAlerts = (message, type) => {
    setTimeout(() => dispatch(clearAlertAction()), 2000);

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
          {(loading && !isAuthenticated) ||
          (cookies._userSession && !isAuthenticated) ? (
            <MainLoader />
          ) : (
            <Routes />
          )}
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
