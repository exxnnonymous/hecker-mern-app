import React from "react";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      component={(props) => {
        const token = window.localStorage.getItem(
          "NiM2IiLCJpYXQiOjE2Mjk4MDc4ODcsImV4cCI6MTYyOTgxMTQ4N30FR4ODu7lSfsyfMEZ50sP8CBeVLCxo3Q2b0jBn5abuzk"
        );
        if (token) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    ></Route>
  );
}

export default PrivateRoute;
