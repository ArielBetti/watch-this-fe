import React from "react";
import ReactDOM from "react-dom/client";

import "./globals.css";
import AppRouter from "./routes";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./core/App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
