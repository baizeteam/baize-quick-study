<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue";

// 生命周期
onMounted(() => {
  console.log("vue 挂载完成");
});
onUnmounted(() => {
  console.log("vue 卸载完成");
});
</script>

<template>
  <div>生命周期</div>
  <code-demo />
</template>
