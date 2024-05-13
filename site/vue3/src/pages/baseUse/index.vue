<script lang="ts" setup>
import Todo from "@/components/Todo/Index.vue";
import { ref } from "vue";
import { TYPE_LIST } from "@/types/todoList.ts";
import { getList, delItem, addItem, changeItem } from "@/utils/todo.ts";

const todoList = ref(getList() as TYPE_LIST);
const del = function (content: string) {
  delItem(todoList.value, content);
};

const change = function (content: string, index: number) {
  changeItem(todoList.value, content, index);
};
const add = function (content: string) {
  addItem(todoList.value, content);
};
const multipleDel = function(ids: Array<string>){
  ids.forEach(content=> del(content))
}
</script>

<template>
  <Todo :list="todoList" @add="add" @change="change" @del="del" @multipleDel="multipleDel" />
</template>
