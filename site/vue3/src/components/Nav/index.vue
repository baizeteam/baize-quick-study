<script lang="ts" setup>
// 一般来说，一个vue组件只需要单独一个vue文件即可，不需要外层再包一个目录，这里为了和react的机构保持一致，将vue组件放在一个目录下。
import { reactive, onMounted } from "vue";
import VueSvg from "@/assets/vue.svg";
import { useRouter } from "vue-router";
import { basePath } from "@/router";
const router = useRouter();

const currentRoutes = reactive({ value: [router.currentRoute.value.path] });

// 修改menu状态
const handleMenuSelect = (key: string) => {
  // 跳转到指定路由
  router.push(key);
  // 更新当前选中状态
  currentRoutes.value = [key];
};

// 打开子应用
const openApp = () => {
  const urlPath = import.meta.env.DEV ? location.protocol + "//localhost:5602/vue3/" : "/vue3/";
  window.open(urlPath, "_blank");
};

router.beforeEach((to, from) => {
  currentRoutes.value = [to.path];
});

onMounted(() => {});
</script>

<template>
  <div class="app-nav">
    <!--    <a-popover position="rt" trigger="hover">-->
    <!--      <div class="logo" @click="openApp">-->
    <!--        <img :src="VueSvg" />-->
    <!--      </div>-->
    <!--      <template #content>-->
    <!--        <span>点击打开vue3子应用</span>-->
    <!--      </template>-->
    <!--    </a-popover>-->

    <div class="logo" title="点击打开vue3子应用" @click="openApp">
      <img :src="VueSvg" />
    </div>

    <a-menu mode="horizontal" :selected-keys="currentRoutes.value" @menu-item-click="handleMenuSelect">
      <a-menu-item :key="basePath + '/base-use'">基本使用</a-menu-item>
      <a-menu-item :key="basePath + '/life-cycle'">生命周期</a-menu-item>
      <a-menu-item :key="basePath + '/store-use'">状态管理</a-menu-item>
      <a-menu-item :key="basePath + '/api-use'">接口请求</a-menu-item>
    </a-menu>
  </div>
</template>

<style scoped lang="less">
// vue 中使用css-module，只需要在style标签中添加scoped属性
.app-nav {
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  .logo {
    width: 32px;
    height: 40px;
    box-sizing: border-box;
    margin-left: 24px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
