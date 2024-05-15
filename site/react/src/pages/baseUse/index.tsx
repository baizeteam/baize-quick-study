import React, { useState } from "react";
import Todo from "@/components/Todo";
import { addItem, TYPE_LIST, delItem, getList } from "@/utils/todo.ts";
import CodeDemo from "@/components/CodeDemo";

export default function BaseUse(): React.JSX.Element {
  const [todoList, setTodoList] = useState<TYPE_LIST>(getList());

  const del = function (content: string) {
    delItem(todoList, content, setTodoList);
  };
  const add = function (content: string) {
    addItem(todoList, content, setTodoList);
  };
  return (
    <>
      <Todo list={todoList} add={add} del={del} />
      <CodeDemo fileList={["@/components/Todo/index.tsx"]} />
    </>
  );
}
