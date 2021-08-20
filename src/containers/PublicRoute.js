import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

const PublicRoute = ({
  isAuthenticated,
  restricted = false,
  component: Component,
  type,
  ...rest
}) => {
  const render = (props) => {
    if (isAuthenticated && type === "guest") {
      return props.history.goBack();
    }

    return <Component {...props} />;
  };

  return <Route {...rest} render={render} />;
};

const mapStateToProps = ({ auth }) => {
  return { isAuthenticated: auth.isAuthenticated };
};

export default connect(mapStateToProps)(PublicRoute);
