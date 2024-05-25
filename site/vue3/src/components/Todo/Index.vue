<script lang="ts" setup>
import { computed, ref } from "vue";
import { $Notification } from "@/utils/toast.ts";
import { Modal, Image } from "@arco-design/web-vue";
import noData from "@/assets/images/noData.jpg";
import { TYPE_LIST } from "@/utils/todo.ts";
const props = defineProps({ list: Array });
const emit = defineEmits(["add", "del"]);
const inputVal = ref("");
const todoList = computed(() => props.list as TYPE_LIST);
const onAdd = function () {
  if (!inputVal.value) return $Notification({ content: "请输入内容！", type: "warning" });
  emit("add", inputVal.value);
  inputVal.value = ""; // after enter we should clear this value
};
const onDel = function (content: string) {
  Modal.confirm({
    title: "提示",
    content: "您确定要删除吗？删除后不可恢复",
    onOk: () => emit("del", content),
  });
};
</script>

<template>
  <div class="todosPage">
    <div>
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
    <template v-if="todoList.length">
      <div class="justify-between align-center item" v-for="(item, index) in todoList" :key="index">
        <span class="content">{{ item }}</span>
        <a-button type="text" status="danger" @click="onDel(item)">删除</a-button>
      </div>
    </template>
    <Image style="margin-top: 10px" v-else :src="noData" />
  </div>
</template>
