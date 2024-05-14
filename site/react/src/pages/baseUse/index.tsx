import React, { useState } from "react";
import Todo from "@/components/Todo";
import { addItem, TYPE_LIST, delItem, getList } from "@/utils/todo.ts";

export default function BaseUse(): JSX.Element {
  const [todoList, setTodoList] = useState<TYPE_LIST>(getList());

  const del = function (content: string) {
    delItem(setTodoList, todoList, content)
  };
  const add = function (content: string) {
    addItem(setTodoList, todoList, content)
  };
  return <Todo list={todoList}  add={add} del={del}  />;
}
