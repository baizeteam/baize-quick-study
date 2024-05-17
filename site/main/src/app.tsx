import React, { useEffect, useState, useRef } from "react";
import microApp from "@micro-zoe/micro-app";
import "@arco-design/web-react/dist/css/arco.css";
import { Button, Switch } from "@arco-design/web-react";

const isDev = import.meta.env.DEV;
const baseUrl = isDev ? "http://localhost" : "http://localhost:3000";

const AppList = [
  {
    name: "react",
    port: "5601",
    path: "/react",
  },
  {
    name: "vue3",
    port: "5602",
    path: "/vue3",
  },
];

export default function App() {
  const [routeSyncStatus, setRouteSyncStatus] = useState(false);
  const routerSyncStatusRef = useRef(routeSyncStatus);

  const initMicroApp = () => {
    window.microApp = microApp;
  };

  const changeRouteSyncStatus = (status) => {
    routerSyncStatusRef.current = status;
    setRouteSyncStatus(status);
  };

  const routeSync = (to) => {
    AppList.forEach((item) => {
      if (item.name !== to.name) {
        microApp.router.push({ name: item.name, path: to.fullPath });
      }
    });
  };
  useEffect(() => {
    document.body.setAttribute("arco-theme", "dark");
    initMicroApp();
    microApp.router.beforeEach((to, from) => {
      console.log("路由切换", routerSyncStatusRef.current);
      if (routerSyncStatusRef.current) {
        routeSync(to);
      }
    });
  }, []);
  return (
    <div className="app-container">
      <div className="app-container-header">
        <div>mirco-app</div>

        <div className="left">
          <span style={{ marginRight: "8px" }}>路由联动</span>
          <Switch checked={routeSyncStatus} onChange={changeRouteSyncStatus} />
          <Button type="text">查看教程</Button>
        </div>
      </div>
      <div className="app-container-content">
        {AppList.map((item) => (
          <div className="app-item" key={item.name}>
            <micro-app name={item.name} url={baseUrl + (isDev ? `:${item.port}` : item.path)} iframe />
          </div>
        ))}
      </div>
    </div>
  );
}
