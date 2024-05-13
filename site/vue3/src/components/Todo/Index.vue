<script lang="ts" setup>
import "driver.js/dist/driver.css";
import { computed, onMounted, ref } from "vue";
import { INF_LIST_ITEM, TYPE_LIST } from "@/types/todoList.ts";
import { $Notification } from "@/utils/toast.ts";
import { Modal } from "@arco-design/web-vue";
import { onDriver } from "@/utils/todo.ts";
import CodeDemo from "@/components/CodeDemo";

const props = defineProps({
  list: {
    required: true,
    type: Array,
  },
});
/** data */
const emit = defineEmits(["change", "add", "del", "multipleDel"]);
const inputVal = ref("");
const todoList: TYPE_LIST = computed(() => props.list);
/** method */
// 添加
const onAdd = function () {
  if (!inputVal.value) {
    return $Notification({ content: "请键入内容！", type: "warning" });
  }
  const isFound: boolean = todoList.value.filter((item) => item.content === inputVal.value).length > 0;
  if (isFound) {
    return $Notification({ content: `"${inputVal.value}"在列表中已存在，请确认！` });
  }
  emit("add", inputVal.value);
  inputVal.value = ""; // after enter we should clear this value
};

// 完成
const onFinish = function (index: number, item: INF_LIST_ITEM) {
  if (item.finished) return $Notification({ content: "已经是已完成状态!", type: "warning" });
  emit("change", index, "finished", true);
};

// 删除
const onDel = function (content: string) {
  Modal.confirm({
    title: "提示",
    content: "您确定要删除吗？删除后不可恢复",
    onOk: () => {
      emit("del", content);
    },
  });
};

const driverOk = function () {
  emit("add", "示例：先赚一个小目标");
};
/** life callback */
onMounted(function () {
  const isUsedKey = "isUsed";
  const isUsed = localStorage.getItem(isUsedKey);
  if (!isUsed) {
    localStorage.setItem(isUsedKey, "true");
    onDriver(todoList.value.length, driverOk);
  }
});
</script>

<template>
  <div class="todosPage">
    <div class="head align-center justify-between">
      <a-button @click="onDriver(todoList.length, driverOk)" type="text">查看教程</a-button>
      <a-input-search
        class="head-input"
        :style="{ width: '320px' }"
        v-model="inputVal"
        @search="onAdd"
        placeholder="请输入"
        button-text="添加"
        search-button
      />
    </div>
    <div class="justify-between align-center" style="padding: 20px 0">
      <div class="undo align-center">任务列表</div>
    </div>
    <div class="list">
      <div class="justify-between align-center item" v-for="(item, index) in todoList" :key="item.content">
        <!--    contents -->
        <div class="warp">
          <span class="content">{{ item.content }}</span>
        </div>
        <!--    scope -->
        <a-button
          type="text"
          status="normal"
          class="finish"
          :class="item.finished ? 'gray' : ''"
          @click="onFinish(index, item)"
        >
          {{ item.finished ? "已完成" : "完成待办" }}
        </a-button>
        <a-button type="text" status="danger" @click="onDel(item.content)">删除</a-button>
      </div>
    </div>
  </div>
  <CodeDemo :codeData="null" />
</template>
