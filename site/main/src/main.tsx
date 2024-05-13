import React from "react";
import ReactDOM from "react-dom/client";
import microApp from "@micro-zoe/micro-app";
import "./index.less";
microApp.start();

const baseUrl = "http://localhost";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div className="app-container">
    <div className="app-item">
      <micro-app name="react" url={baseUrl + ":5601"} iframe />
    </div>
    <div className="app-item">
      <micro-app name="vue3" url={baseUrl + ":5602"} iframe />
    </div>
  </div>,
);
