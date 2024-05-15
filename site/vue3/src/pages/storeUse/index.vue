<script lang="ts" setup>
import CodeDemo from "@/components/CodeDemo/index.vue";
import Todo from "@/components/Todo/Index.vue";
import { computed } from "vue";
import useTodoStore from "@/store/todoList.ts";
const todoStore = useTodoStore();
const todoList = computed(() => todoStore.getTodos);
const del = function (content: string) {
  todoStore.removeItem(content);
};
const add = function (content: string) {
  todoStore.createItem(content);
};
</script>
<template>
  <Todo :list="todoList" @add="add" @del="del" />
  <code-demo />
</template>
