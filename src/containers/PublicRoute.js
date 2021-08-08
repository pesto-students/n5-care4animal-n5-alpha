import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PublicRoute = ({
  isAuthenticated,
  restricted = false,
  component: Component,
  ...rest
}) => {
  const render = (props) => {
    if (isAuthenticated && restricted) {
      return <Redirect to="/" />;
    }

    return <Component {...props} />;
  };

  return <Route {...rest} render={render} />;
};

const mapStateToProps = ({ auth }) => {
  return { isAuthenticated: auth.isAuthenticated };
};

export default connect(mapStateToProps)(PublicRoute);
