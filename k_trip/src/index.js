import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/reset.css";
import "./styles/index.css";
import reportWebVitals from "./reportWebVitals";
import router from "./router";

import "./styles/nav-bar.css";

import Modal from "react-modal";
import { RouterProvider } from "react-router-dom";

Modal.setAppElement("#root");
//Nav bar
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
