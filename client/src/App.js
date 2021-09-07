import React, { useEffect, useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import jwt from "jsonwebtoken";

import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home/Home";
import PrivateRoute from "./pages/Routes/PrivateRoute";
import { AuthContext } from "./Context/context/authContext";
import { isUserLogged, signout } from "./Context/action/auth.action";
import axiosInstance from "./Api/axios";
import ACTIONS from "./Context/constants";
import NotFound from "./pages/NotFound";

function App() {
  const { authenticate, dispatch, networkErr } = useContext(AuthContext);

  useEffect(() => {
    async function start() {
      try {
        await axiosInstance.get("/home");
      } catch (err) {
        dispatch({ type: ACTIONS.NETWORK_ERR, payload: err.message });
      }
    }
    start();
  }, []);

  useEffect(() => {
    const secret =
      "NiM2IiLCJpYXQiOjE2Mjk4MDc4ODcsImV4cCI6MTYyOTgxMTQ4N30FR4ODu7lSfsyfMEZ50sP8CBeVLCxo3Q2b0jBn5abuzk";
    const token = localStorage.getItem(
      "NiM2IiLCJpYXQiOjE2Mjk4MDc4ODcsImV4cCI6MTYyOTgxMTQ4N30FR4ODu7lSfsyfMEZ50sP8CBeVLCxo3Q2b0jBn5abuzk"
    );

    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        signout(dispatch);
      }
    });

    if (!authenticate) {
      isUserLogged(dispatch);
    }
  }, [authenticate]);

  if (networkErr) {
    return <Redirect to="/sfgiasdhfsaerrrorsa" />;
  }

  return (
    <div id="app">
      <Switch>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <PrivateRoute exact path="/" component={Home} />
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
