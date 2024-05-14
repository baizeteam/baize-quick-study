<script lang="ts" setup>
import CodeDemo from "@/components/CodeDemo/index.vue";
import Todo from "@/components/Todo/Index.vue";
import { ref } from "vue";
import { getList, delItem, addItem, TYPE_LIST} from "@/utils/todo.ts";
const todoList = ref(getList() as TYPE_LIST);
const del = function (content: string) {
  delItem(todoList.value, content)
};
const add = function (content: string) {
  addItem(todoList.value, content)
};
</script>
<template>
  <Todo :list="todoList" @add="add"  @del="del" />
  <div>代码辅助：</div>
  <div>父组件：</div>
  <CodeDemo :codeData="null" />
</template>
