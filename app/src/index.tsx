import React from "react";
import { createRoot } from "react-dom/client";
import App from "./core/App";

const element = document.getElementById("root");
if (!element) {
  throw new Error("root element not found");
}

const root = createRoot(element);
root.render(
  <App />
);
