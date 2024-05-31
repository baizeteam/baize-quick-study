<script setup lang="ts">
import CodeDemoItem from "./CodeDemoItem.vue";

const { codeData, fileCode } = defineProps({
  codeData: {
    required: false,
    type: String,
  },
  codePath: {
    required: false,
    type: String,
  },
  fileList: {
    required: false,
    type: [],
  },
  fileCode: {
    required: false,
    type: [],
  },
});
</script>

<template>
  <div>
    <CodeDemoItem :codeData="codeData" :codePath="codePath" />
    <div v-for="(item, index) in fileCode" :key="index">
      <CodeDemoItem :codeData="item.fileCode" :codePath="item.filePath" />
    </div>
  </div>
</template>

<style scoped lang="less">
.code-domo {
  margin-top: 24px;
  .title {
    color: #888;
    margin-bottom: 4px;
  }

  .content {
    border-radius: 8px;
    overflow: hidden;
  }
}
</style>
