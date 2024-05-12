<template>
  <div class="header align-center" :style="{ height: height }">
    <div class="head justify-between" :style="{ width: width }">
      <div>
        <a-button @click="emit('teach')" type="text">查看教程</a-button>
      </div>
      <a-input
        ref="inputRef"
        class="head-input"
        v-model="inputVal"
        @keyup.enter="onEnter"
        :style="{ width: '320px' }"
        placeholder="Please enter something"
        allow-clear
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
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
const inputRef = ref();
const inputVal = ref("");
const emit = defineEmits(["enterValue", "teach"]);
/** method */
const onEnter = function () {
  if (!inputVal.value) {
    return $Notification({ content: "请键入内容再回车！" });
  }
  emit("enterValue", inputVal.value);
  inputVal.value = ""; // after enter we should clear this value
};

/** life callback*/
onMounted(function () {
  inputRef.value.focus();
});
</script>

<style lang="less" scoped>
.header {
  .head {
    margin: auto;
  }
}
</style>
