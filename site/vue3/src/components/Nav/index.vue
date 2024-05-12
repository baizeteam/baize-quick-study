<script lang="ts" setup>
// 一般来说，一个vue组件只需要单独一个vue文件即可，不需要外层再包一个目录，这里为了和react的机构保持一致，将vue组件放在一个目录下。
import {  reactive, onMounted } from "vue";
import VueSvg from "@/assets/vue.svg";
import { useRouter } from "vue-router";
const router = useRouter();

const currentRoutes = reactive({ value: [router.currentRoute.value.path] });

// 修改menu状态
const handleMenuSelect = (key: string) => {
  // 跳转到指定路由
  router.push(key);
  // 更新当前选中状态
  currentRoutes.value = [key];
};

router.beforeEach((to, from) => {
  currentRoutes.value = [to.path];
});

onMounted(() => {});
</script>

<template>
  <a-menu class="app-nav" mode="horizontal" :selected-keys="currentRoutes.value" @menu-item-click="handleMenuSelect">
    <a-menu-item key="null" disabled>
      <img :src="VueSvg" />
    </a-menu-item>
    <a-menu-item key="/">Home</a-menu-item>
    <a-menu-item key="/my">My</a-menu-item>
  </a-menu>
</template>

<style scoped lang="less">
// vue 中使用css-module，只需要在style标签中添加scoped属性
.app-nav {
  border-bottom: 1px solid #eee;
}
</style>
