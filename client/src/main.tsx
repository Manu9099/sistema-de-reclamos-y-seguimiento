import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./route";
import "./index.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster position="top-right" />
    <AppRouter />
  </React.StrictMode>
);


