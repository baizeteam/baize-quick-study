import React, { useEffect, useState, useRef } from "react";
import microApp from "@micro-zoe/micro-app";
import { ConfigProvider, Switch } from "@arco-design/web-react";
import { IconGithub } from "@arco-design/web-react/icon";

const isDev = import.meta.env.DEV;
const baseUrl = isDev ? "http://localhost" : "";

const AppList = [
  {
    name: "react",
    path: isDev ? ":5601/react/" : "/react/",
  },
  {
    name: "vue3",
    path: isDev ? ":5602/vue3/" : "/vue3/",
  },
];

export default function App() {
  const [routeSyncStatus, setRouteSyncStatus] = useState(true);
  const routerSyncStatusRef = useRef(routeSyncStatus);

  // 初始化微应用
  const initMicroApp = () => {
    window.microApp = microApp;
  };

  // 切换路由同步状态
  const changeRouteSyncStatus = (status) => {
    routerSyncStatusRef.current = status;
    setRouteSyncStatus(status);
  };

  // 路由同步
  const routeSync = (to) => {
    AppList.forEach((item) => {
      if (item.name !== to.name) {
        microApp.router.push({ name: item.name, path: to.fullPath.replace(to.name, item.name) });
      }
    });
  };
  useEffect(() => {
    document.body.setAttribute("arco-theme", "dark");
    initMicroApp();
    microApp.router.beforeEach((to, from) => {
      if (routerSyncStatusRef.current) {
        routeSync(to);
      }
    });
  }, []);
  return (
    <ConfigProvider prefixCls="arco-react">
      <div className="app-container">
        <div className="app-container-header">
          <div>mirco-app</div>
          <div className="app-container-header-right">
            <span style={{ marginRight: "8px" }}>路由联动</span>
            <Switch checked={routeSyncStatus} onChange={changeRouteSyncStatus} />
            {/* <Button type="text">查看教程</Button> */}
            <IconGithub
              onClick={() => window.open("https://github.com/baizeteam/baize-quick-study", "_blank")}
              style={{ fontSize: 24, marginLeft: "16px", cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="app-container-content">
          {AppList.map((item) => (
            <div className="app-item" key={item.name}>
              {/* micro-app 有with沙箱和iframe沙箱，vite只能使用iframe沙箱 */}
              <micro-app name={item.name} url={baseUrl + item.path} iframe />
            </div>
          ))}
        </div>
      </div>
    </ConfigProvider>
  );
}
