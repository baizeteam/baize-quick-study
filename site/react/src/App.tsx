import React, { useEffect } from "react";
import Nav from "./components/Nav";
import { BrowserRouter } from "react-router-dom";
import BaseRouter, { basePath } from "./router";
import { ConfigProvider } from "@arco-design/web-react";
import userStore from "./store/userStore";
import "./app.module.less";

function App(): React.JSX.Element {
  const isMicroApp = window.__MICRO_APP_ENVIRONMENT__;

  const handleMicroAppGlobalData = ({ origin, data }) => {
    if (origin !== "react") {
      userStore.initData(data.user);
    }
  };

  useEffect(() => {
    if (isMicroApp) {
      // 微前端环境下，stroe数据初始化，并监听主应用数据变化
      const initData = window.microApp.getData();
      userStore.initData(initData.user);
      window.microApp.addGlobalDataListener(handleMicroAppGlobalData);
    }

    return () => {
      if (isMicroApp) {
        // 清空当前子应用绑定的所有全局数据监听函数
        window.microApp.clearGlobalDataListener();
      }
    };
  }, []);
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
