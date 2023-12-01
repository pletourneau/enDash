//Index.js

import { createRoot } from "react-dom/client";
import React from "react";
// import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
