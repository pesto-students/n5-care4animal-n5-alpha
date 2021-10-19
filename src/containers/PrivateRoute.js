import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  history,
  ...rest
}) => {
  const render = (props) => {
    if (!isAuthenticated) {
      props.history.push({
        pathname: "/signin",
        search: `?loc${props.match.url}`,
      });
    }

    return <Component {...props} />;
  };

  return <Route {...rest} render={render} />;
};

const mapStateToProps = ({ auth }) => {
  return { isAuthenticated: auth.isAuthenticated };
};

export default connect(mapStateToProps)(PrivateRoute);
