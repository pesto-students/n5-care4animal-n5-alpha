import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { rootStore as RootStore } from "store/RootStore";
import { Provider } from "react-redux";
import "styles/App.scss";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { theme } from "utils.js/theme";

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <Provider store={RootStore}>
            <App />
          </Provider>
        </MuiThemeProvider>
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
