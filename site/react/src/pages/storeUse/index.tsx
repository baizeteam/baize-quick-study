import React from "react";
import Todo from "@/components/Todo";
import { observer } from "mobx-react";
import todoStore from "@/store/todoList.ts";
import CodeDemo from "@/components/CodeDemo";

const StoreUse = function (): React.JSX.Element {
  const todoList = todoStore.todos;
  const add = function (content: string) {
    todoStore.createItem(content);
  };
  const del = function (content: string) {
    todoStore.removeItem(content);
  };
  return (
    <>
      <Todo list={todoList} add={add} del={del} />
      <CodeDemo fileList={["@/components/Todo/index.tsx"]} />
    </>
  );
};
export default observer(StoreUse);
