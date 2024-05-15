import { defineStore } from "pinia";
import {addItem, delItem, getList, TODO, TYPE_LIST} from "@/utils/todo.ts";

const useTodoStore = defineStore(TODO, {
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
    createItem(content: string) {
      // console.log(this,'this')
      return addItem(this.todos, content);
    },
    removeItem(id: string) {
      return delItem(this.todos, id);
    },
  },
});

export default useTodoStore;
