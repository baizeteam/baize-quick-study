<script lang="ts" setup>
import Todo from "@/components/Todo/Index.vue";
import { ref } from "vue";
import { INF_LIST_ITEM, TYPE_LIST } from "@/types/todoList.ts";
import { getList, delItem, addItem, changeItem, DelMultiple } from "@/utils/todo.ts";
import { $Notification } from "@/utils/toast.ts";

const todoList = ref(getList() as TYPE_LIST);
const del = function (content: string) {
  delItem(todoList.value, content)
    .then((r:string)=> $Notification({content: r}))
    .catch((e:string) => $Notification({content:e, type: 'error'}))
};

const change = function (index:number, key: keyof INF_LIST_ITEM, value: string | boolean) {
  changeItem(todoList.value, index, key,value)
    .then((r:string)=>  {
      key !== 'input' && $Notification({content: r})
      console.log(key,'key');
    })
    .catch((e:string) => $Notification({content:e, type: 'error'}))
};
const add = function (content: string) {
  addItem(todoList.value, content)
    .then((r:string)=> $Notification({content: r}))
    .catch((e:string) => $Notification({content:e, type: 'error'}))
};
const multipleDel = function(ids: Array<string>){
  DelMultiple(todoList.value, ids)
    .then((r:string)=> $Notification({content: r}))
    .catch((e:string) => $Notification({content:e, type: 'error'}))
}
</script>

<template>
  <Todo :list="todoList" @add="add" @change="change" @del="del" @multipleDel="multipleDel" />
</template>
