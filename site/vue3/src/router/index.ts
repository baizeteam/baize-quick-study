import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// 懒加载
const BaseUse = () => import("@/pages/baseUse/index.vue");
const LifeCycle = () => import("@/pages/lifeCycle/index.vue");
const StoreUse = () => import("@/pages/storeUse/index.vue");
const NotFound = () => import("@/pages/notFound/index.vue");

// 路由配置
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: BaseUse,
  },
  {
    path: "/life-cycle",
    component: LifeCycle,
  },
  {
    path: "/store-use",
    component: StoreUse,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
