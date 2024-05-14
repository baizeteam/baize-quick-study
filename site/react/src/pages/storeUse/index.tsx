import React from "react";
import Todo from "@/components/Todo";
import {observer} from "mobx-react-lite";
import todoStore from "@/store/todoList.ts";

const StoreUse = function ():React.JSX.Element {
  const todoList = todoStore.todos
  const add = function (content: string){
    todoStore.createItem(content)
  }
  const del = function (content:string){
    todoStore.removeItem(content)
  }
  return <Todo list={todoList}  add={add} del={del} />;
}
export default observer(StoreUse)