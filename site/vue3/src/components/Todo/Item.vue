<template>
  <div class="justify-between align-center item">
    <!--    contents -->
    <div class="warp">
      <input v-if="isUndo" type="checkbox" class="checkBox checkBoxInput" :value="data.content" />
      <span class="checkBox" v-else />
      <span class="content" v-if="!data.input" @click="show">
        {{ data.content }}
      </span>
      <input
        class="content"
        v-else
        ref="contentRef"
        :value="data.content"
        @keyup.enter="change($event)"
        @blur="change($event)"
      />
    </div>
    <!--    scope -->
    <div class="del justify-center pointer" @click="onDel">
      <span class="radius flex-center">-</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue"
import { $Notification } from "@/utils/toast.ts";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  isUndo: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(["del", "change"])
// const { data, isUndo } = toRefs(props)
const data = ref(props.data)
const isUndo = ref(props.isUndo)
const contentRef = ref() // v-if后只有一个，根据业务情况来
/** method */
const show = function () {
  if (!isUndo.value) return
  data.value.input = true
  setTimeout(function () {
    contentRef.value.focus()
  }, 100)
}
const change = function (e) {
  const inputVal = e.target.value
  if (!inputVal) {
    return $Notification('不能更改为空白!')
  }
  // console.log(value,'change')
  emit("change", inputVal)
  setTimeout(function () {
    data.value.input = false
  }, 100)
}
const onDel = function () {
  const result: unknown | null = prompt("您确定要删除吗?该操作不可恢复")
  if (result !== null) {
    // 取消就是null, 输入字符串null为'null'
    emit("del")
  }
}
</script>

<style lang="less" scoped>
.item {
  background: #fff;
  padding: 0 6px;
  .warp {
    flex: 9;
    .checkBox {
      display: inline-block;
      width: 30px;
      height: 13px;
    }
    .content {
      display: inline-block;
      width: 80%;
    }
  }
  .del {
    flex: 1;
    .radius {
      border-radius: 50%;
      background: #ddd;
      width: 20px;
      height: 20px;
      color: #666;
      user-select: none;
    }
  }
}
.item + .item {
  margin-top: 15px;
}
</style>
