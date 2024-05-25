<script lang="ts" setup>
import Todo from "@/components/Todo/Index.vue";
import { ref } from "vue";
import { getList, delItem, addItem, TYPE_LIST } from "@/utils/todo.ts";
const todoList = ref<TYPE_LIST>(getList());
const del = function (content: string) {
  delItem(todoList.value, content);
};
const add = function (content: string) {
  addItem(todoList.value, content);
};
</script>
<template>
  <Todo :list="todoList" @add="add" @del="del" />
  <code-demo :fileList="['@/components/Todo/Index.vue']" />
</template>
