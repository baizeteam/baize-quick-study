import { defineStore } from "pinia"
import {  TYPE_LIST } from "@/types/todoList.ts";
import { addItem, delItem,changeItem, getList } from "@/utils/todo.ts";


const useTodoStore = defineStore('todo', {
  state: function () {
    return {
      todos: getList()
    }
  },
  getters: {
    getTodos(state):TYPE_LIST {
      return state.todos
    }
  },
  actions: {
    setItem(content:string, index:number) {
      changeItem(this.todos, content, index)
    },
    createItem(content:string) {
      // console.log(this,'this')
      addItem(this.todos, content)
    },
    removeItem(index:number) {
      delItem(this.todos, index)
    }
  }
})

export default useTodoStore