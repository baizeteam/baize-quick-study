<script lang="ts">
import enUS from "@arco-design/web-vue/es/locale/lang/en-us";
export default {
  name: "App",
  data() {
    return {
      enUS,
    };
  },
};
</script>

<template>
  <a-config-provider :locale="enUS">
    <div class="app-container">
      <Nav />
      <div class="content">
        <router-view />
      </div>
    </div>
  </a-config-provider>
</template>

<style scoped lang="less">
#app {
  height: 100%;
  overflow: hidden;
}
.app-container {
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .content {
    padding: 24px;
    box-sizing: border-box;
    flex: 1;
    overflow: auto;
  }
}
</style>
