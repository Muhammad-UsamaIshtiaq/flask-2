import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resumeSession } from "./../../DataStore/AuthReducer";
import { useAuthorize } from "./Authorize";

const PrivateRoute = ({ component: Component, ...rest }) => {
  // Add your own authentication on the below line.
  const dispatch = useDispatch();
  useEffect(() => {
    rest.userInfo || dispatch(resumeSession());
  }, [])
  const isAuthorize = useAuthorize(rest.authType);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthorize ? (
          <Component {...props} userAuth={rest.userInfo} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};
export default PrivateRoute;