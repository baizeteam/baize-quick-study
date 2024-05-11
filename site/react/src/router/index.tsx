import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// 懒加载
const Home = lazy(() => import("../pages/home"));
const My = lazy(() => import("../pages/my"));
const NotFound = lazy(() => import("../pages/notFound"));

// 路由配置
export default function BaseRouter() {
  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my" element={<My />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
