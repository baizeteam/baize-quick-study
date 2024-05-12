<template>
  <div class="header align-center" :style="{ height: height }">
    <div class="head justify-between" :style="{ width: width }">
      <div>
        <a-button @click="emit('teach')" type="text">查看教程</a-button>
      </div>

      <a-input-search
        class="head-input"
        :style="{ width: '320px' }"
        v-model="inputVal"
        @search="onEnter"
        placeholder="请输入"
        button-text="添加"
        search-button
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { $Notification } from "@/utils/toast.ts";

defineProps({
  height: {
    required: true,
    type: String,
  },
  width: {
    required: true,
    type: String,
  },
});
const inputVal = ref("");
const emit = defineEmits(["addData", "teach"]);
/** method */
const onEnter = function () {
  if (!inputVal.value) {
    return $Notification({ content: "请键入内容再回车！" });
  }
  emit("addData", inputVal.value);
  inputVal.value = ""; // after enter we should clear this value
};
</script>

<style lang="less" scoped>
.header {
  .head {
    margin: auto;
  }
}
</style>
