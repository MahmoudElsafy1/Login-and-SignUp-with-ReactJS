import React from "react";
import ReactDOM from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import "./pags/dashborad/dashbord.css";

import App from "./App";
import { BrowserRouter, HashRouter } from "react-router-dom";
import UserProvider from "./pags/website/Auth/context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </HashRouter>
);
