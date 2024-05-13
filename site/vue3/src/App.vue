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
    <Nav />
    <div :style="{ padding: '24px' }">
      <router-view />
    </div>
  </a-config-provider>
</template>
