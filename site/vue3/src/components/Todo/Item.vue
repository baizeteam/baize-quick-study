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
    <a-popover :popup-visible="popupVisible" position="left" title="提示">
      <a-button type="text" status="danger" @click="popupVisible=true">删除</a-button>
      <template #content>
        <p style="margin: 6px 0">您确定要删除吗？删除后不可恢复</p>
        <div class="justify-end">
          <a-button style="margin-right: 6px" type="primary" @click="emit('del')">确定</a-button>
          <a-button @click="popupVisible = false">取消</a-button>
        </div>
      </template>
    </a-popover>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { $Notification } from "@/utils/toast.ts";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  isUndo: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["del", "change"]);
const data = ref(props.data);
const popupVisible = ref<boolean>(false)
const isUndo = ref(props.isUndo);
const contentRef = ref(); // v-if后只有一个，根据业务情况来
/** method */
const show = function () {
  if (!isUndo.value) return;
  data.value.input = true;
  setTimeout(function () {
    contentRef.value.focus();
  }, 100);
};
const change = function (e) {
  const inputVal = e.target.value;
  if (!inputVal) {
    return $Notification({ content: "不能更改为空白!" });
  }
  // console.log(value,'change')
  emit("change", inputVal);
  setTimeout(function () {
    data.value.input = false;
  }, 100);
};
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
}
.item + .item {
  margin-top: 15px;
}
</style>
