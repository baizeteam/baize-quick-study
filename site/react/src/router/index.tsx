import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

export const basePath = "/react";

// 懒加载
const BaseUse = lazy(() => import("../pages/baseUse"));
const LifeCycle = lazy(() => import("../pages/lifeCycle"));
const StoreUse = lazy(() => import("../pages/storeUse"));
const ApiUse = lazy(() => import("../pages/apiUse"));
const NotFound = lazy(() => import("../pages/notFound"));

// 路由配置，react懒加载需要加上Suspense组件
export default function BaseRouter(): React.JSX.Element {
  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route path="/base-use" element={<BaseUse />} />
        <Route path="/life-cycle" element={<LifeCycle />} />
        <Route path="/store-use" element={<StoreUse />} />
        <Route path="/api-use" element={<ApiUse />} />
        {/* <Route path="/react" element={<Navigate to="/" />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
