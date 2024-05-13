<script lang="ts" setup>
import Todo from "@/components/Todo/Index.vue";
import { computed } from "vue";
import { INF_LIST_ITEM } from "@/types/todoList.ts";
import useTodoStore from "@/store/todoList.ts";
import { $Notification } from "@/utils/toast.ts";

const todoStore = useTodoStore()
const todoList = computed(()=> todoStore.getTodos)
const del = function (content: string) {
  todoStore.removeItem(content)
    .then((r:string)=> $Notification({content: r}))
    .catch((e:string) => $Notification({content:e, type: 'error'}))
};

const change = function (index:number, key: keyof INF_LIST_ITEM, value: any) {
  todoStore.setItem(index, key,value)
    .then((r:string)=>  {
      key !== 'input' && $Notification({content: r})
      console.log(key,'key');
    })
    .catch((e:string) => $Notification({content:e, type: 'error'}))
};
const add = function (content: string) {
  todoStore.createItem(content)
    .then((r:string)=> $Notification({content: r}))
    .catch((e:string) => $Notification({content:e, type: 'error'}))
};
const multipleDel = function(ids: Array<string>){
  todoStore.removeMultiple(ids)
    .then((r:string)=> $Notification({content: r}))
    .catch((e:string) => $Notification({content:e, type: 'error'}))
}
</script>

<template>
  <Todo :list="todoList" @add="add" @change="change" @del="del" @multipleDel="multipleDel" />
</template>
