import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = document.getElementById("root");
const rootInstance = createRoot(root);

rootInstance.render(
  <BrowserRouter>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      theme="light"
      transition={Bounce}
    />
    <App />
  </BrowserRouter>
);
