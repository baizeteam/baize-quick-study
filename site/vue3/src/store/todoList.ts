import { defineStore } from "pinia";
import { TYPE_LIST, INF_LIST_ITEM } from "@/types/todoList.ts";
import { addItem, delItem, changeItem, getList, DelMultiple } from "@/utils/todo.ts";

const useTodoStore = defineStore("todo", {
  state: function () {
    return {
      todos: getList(),
    };
  },
  getters: {
    getTodos(state): TYPE_LIST {
      return state.todos;
    },
  },
  actions: {
    setItem(index: number, key: keyof INF_LIST_ITEM, value: any) {
      return changeItem(this.todos, index, key, value);
    },
    createItem(content: string) {
      // console.log(this,'this')
      return addItem(this.todos, content);
    },
    removeItem(id: string) {
      return delItem(this.todos, id);
    },
    removeMultiple(ids: Array<string>) {
      return DelMultiple(this.todos, ids);
    },
  },
});

export default useTodoStore;
