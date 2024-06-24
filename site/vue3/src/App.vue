<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue";
import useUserStore from "@/store/user";
import useProjectInfoStore from "./store/projectInfo";
const userStore = useUserStore();
const projectInfoStore = useProjectInfoStore()

const isMicroApp = window.__MICRO_APP_ENVIRONMENT__;

const handleMicroAppGlobalData = ({ origin, data }) => {
  if (origin !== "vue3") {
    userStore.initData(data.user);
    projectInfoStore.initData(data.projectInfo)
    console.log("vue3收到数据更新", origin, data);
  }
};

onMounted(() => {
  if (isMicroApp) {
    // 微前端环境下，store 数据初始化，并监听主应用数据变化
    const initData = window.microApp.getData();
    userStore.initData(initData.user);
    projectInfoStore.initData(initData.projectInfo)
    window.microApp.addGlobalDataListener(handleMicroAppGlobalData);
  }
});

onUnmounted(() => {
  if (isMicroApp) {
    // 清空当前子应用绑定的所有全局数据监听函数
    window.microApp.clearGlobalDataListener();
  }
});
</script>

<template>
  <a-config-provider>
    <div class="app-container" :style="{ height: isMicroApp ? 'calc(100vh - 60px)' : '100vh' }">
      <Nav />
      <div class="app-content">
        <router-view />
      </div>
    </div>
  </a-config-provider>
</template>

<style scoped lang="less">
.app-container {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;

  .app-content {
    padding: 24px;
    box-sizing: border-box;
    flex: 1;
    overflow: auto;
  }
}
</style>
