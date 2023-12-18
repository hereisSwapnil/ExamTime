import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const root = document.getElementById("root");
const rootInstance = createRoot(root);

rootInstance.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
