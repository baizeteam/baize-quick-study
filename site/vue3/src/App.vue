<template>
  <a-config-provider :locale="enUS">
    <Nav />
    <router-view />
  </a-config-provider>
</template>

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
