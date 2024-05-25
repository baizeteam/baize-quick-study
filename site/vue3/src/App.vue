<script lang="ts" setup>
import { onMounted } from "vue";
import useUserStore from "@/store/user";
const userStore = useUserStore();

const isMicroApp = window.__MICRO_APP_ENVIRONMENT__;

const handleMicroAppGlobalData = ({ origin, data }) => {
  if (origin !== "vue3") {
    userStore.initData(data.user);
  }
};

onMounted(() => {
  if (isMicroApp) {
    // 微前端环境下，stroe数据初始化，并监听主应用数据变化
    const initData = window.microApp.getData();
    userStore.initData(initData.user);
    window.microApp.addGlobalDataListener(handleMicroAppGlobalData);
  }
});
</script>

<template>
  <a-config-provider>
    <div class="app-container" :style="{ height: isMicroApp ? 'calc(100vh - 60px)' : '100vh' }">
      <Nav />
      <div class="content">
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

  .content {
    padding: 24px;
    box-sizing: border-box;
    flex: 1;
    overflow: auto;
  }
}
</style>
