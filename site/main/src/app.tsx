/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from "@micro-zoe/micro-app/polyfill/jsx-custom-event";
import React, { useEffect, useState, useRef } from "react";
import microApp from "@micro-zoe/micro-app";
import { ConfigProvider, Spin } from "@arco-design/web-react";
import { IconGithub } from "@arco-design/web-react/icon";
import { observer } from "mobx-react";
import mainUserStore from "@/store/mainUserStore";
import RouterLinkage, { AppList } from "@/components/RouterLinkage";
import microAppLogo from "@/assets/micro-app-logo.png";

const isDev = import.meta.env.DEV;
const baseUrl = isDev ? "http://localhost" : "";

export default function App() {
  const [loadingObj, setLoadingObj] = useState({
    react: true,
    vue3: true,
  });

  const loadingRef = useRef(loadingObj);

  const changeLoadingStatus = (name, status) => {
    loadingRef.current[name] = status;
    setLoadingObj({ ...loadingRef.current });
  };

  // 初始化微应用
  const initMicroApp = () => {
    window.microApp = microApp;
    const userData = {
      name: "baize-team",
      age: 18,
    };
    mainUserStore.initData(userData);
    microApp.addGlobalDataListener(({ origin, data }) => {
      if (origin !== "main") {
        console.log("主应用收到数据更新", origin, data);
        mainUserStore.initData(data);
      }
    });
  };

  useEffect(() => {
    document.body.setAttribute("arco-theme", "dark");
    initMicroApp();
  }, []);
  return (
    <ConfigProvider prefixCls="arco-react">
      <div className="app-container">
        <div className="app-container-header">
          <div className="app-container-header-left">
            <img src={microAppLogo} />
            <span>mirco-app</span>
          </div>
          <div className="app-container-header-right">
            <RouterLinkage />
            {/* <Button type="text">查看教程</Button> */}
            <IconGithub
              onClick={() => window.open("https://github.com/baizeteam/baize-quick-study", "_blank")}
              style={{ fontSize: 24, marginLeft: "16px", cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="app-container-content">
          {AppList.map((item) => (
            <Spin key={item.name} size={36} loading={loadingObj[item.name]} tip="加载中...">
              <div className="app-item" key={item.name}>
                {/* micro-app 有with沙箱和iframe沙箱，vite只能使用iframe沙箱 */}
                <micro-app
                  onCreated={() => {
                    changeLoadingStatus(item.name, true);
                  }}
                  onMounted={() => {
                    changeLoadingStatus(item.name, false);
                  }}
                  data={{
                    user: mainUserStore.user,
                  }}
                  name={item.name}
                  url={baseUrl + item.path}
                  iframe
                />
              </div>
            </Spin>
          ))}
        </div>
      </div>
    </ConfigProvider>
  );
}
