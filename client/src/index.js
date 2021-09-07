import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ModalContextProvider } from "./Context/context/ModalContext";
import { AuthContextProvider } from "./Context/context/authContext";
import { BrowserRouter as Router } from "react-router-dom";
import { PostAddProvider } from "./Context/context/postContext";
import { ThemeProvider } from "./Context/context/themeContext";

(function () {
  var DEBUG_MODE = true; // Set this value to false for production

  if (typeof console === "undefined") {
    window.console = {};
  }

  if (!DEBUG_MODE || typeof console.log === "undefined") {
    // FYI: Firebug might get cranky...
    console.log =
      console.error =
      console.info =
      console.debug =
      console.warn =
      console.trace =
      console.dir =
      console.dirxml =
      console.group =
      console.groupEnd =
      console.time =
      console.timeEnd =
      console.assert =
      console.profile =
        function () {};
  }
})();

ReactDOM.render(
  <ThemeProvider>
    <PostAddProvider>
      <AuthContextProvider>
        <ModalContextProvider>
          <Router>
            <App />
          </Router>
        </ModalContextProvider>
      </AuthContextProvider>
    </PostAddProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
