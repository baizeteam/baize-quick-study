import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// 懒加载
const Home = () => import("@/pages/home/index.vue");
const My = () => import("@/pages/my/index.vue");
const NotFound = () => import("@/pages/notFound/index.vue");

// 路由配置
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/my",
    component: My,
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
