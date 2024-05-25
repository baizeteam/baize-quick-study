import React, { useState, useRef, useEffect } from "react";
import microApp from "@micro-zoe/micro-app";
import { Switch } from "@arco-design/web-react";

const isDev = import.meta.env.DEV;
export const AppList = [
  {
    name: "react",
    path: isDev ? ":5601/react/" : "/react/",
  },
  {
    name: "vue3",
    path: isDev ? ":5602/vue3/" : "/vue3/",
  },
];

export default function RouterLinkage() {
  const [routeSyncStatus, setRouteSyncStatus] = useState(true);
  const routerSyncStatusRef = useRef(routeSyncStatus);
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
    microApp.router.beforeEach((to, from) => {
      if (routerSyncStatusRef.current) {
        routeSync(to);
      }
    });
  }, []);
  return (
    <>
      <span style={{ marginRight: "8px" }}>路由联动</span>
      <Switch checked={routeSyncStatus} onChange={changeRouteSyncStatus} />
    </>
  );
}
