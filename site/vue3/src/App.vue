<script lang="ts" setup>
import enUS from "@arco-design/web-vue/es/locale/lang/en-us";
const isMicroApp = window.__MICRO_APP_ENVIRONMENT__;
</script>

<template>
  <a-config-provider :locale="enUS">
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
