<template>
  <div class="header align-center" :style="{ height: height }">
    <div class="head justify-between" :style="{ width: width }">
      <div>
        <span style="user-select: none">TodoList</span>
        <span class="pointer" @click="emit('teach')" style="font-size: 14px">(查看教程)</span>
      </div>
      <input ref="inputRef" class="head-input" v-model="inputVal" @keyup.enter="onEnter" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { $Notification } from "@/utils/toast.ts";

defineProps({
  height: {
    required: true,
    type: String
  },
  width: {
    required: true,
    type: String
  }
})
const inputRef = ref()
const inputVal = ref("")
const emit = defineEmits(["enterValue", "teach"])
/** method */
const onEnter = function () {
  if (!inputVal.value) return $Notification({content: '请键入内容再回车！'})
  emit("enterValue", inputVal.value)
  inputVal.value = "" // after enter we should clear this value
}

/** life callback*/
onMounted(function () {
  inputRef.value.focus()
})
</script>

<style lang="less" scoped>
.header {
  background: #333;
  color: #fff;
  font-size: 28px;
  .head {
    margin: auto;
  }
}
</style>
