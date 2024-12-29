import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"; // Pastikan baris ini ada

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
