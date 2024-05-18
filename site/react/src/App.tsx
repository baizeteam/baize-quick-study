import React from "react";
import Nav from "./components/Nav";
import { BrowserRouter } from "react-router-dom";
import BaseRouter, { basePath } from "./router";
import { ConfigProvider } from "@arco-design/web-react";
import "./app.module.less";

function App(): React.JSX.Element {
  const isMicroApp = window.__MICRO_APP_ENVIRONMENT__;
  return (
    <>
      <ConfigProvider prefixCls="arco-react">
        <BrowserRouter basename={basePath}>
          <div styleName="app-container" style={{ height: isMicroApp ? "calc(100vh - 60px)" : "100vh" }}>
            <Nav />
            <div styleName="content">
              <BaseRouter />
            </div>
          </div>
        </BrowserRouter>
      </ConfigProvider>
    </>
  );
}

export default App;
