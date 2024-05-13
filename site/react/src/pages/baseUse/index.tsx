import React, { useState } from "react";
import Todo from "../../components/Todo";
import { INF_LIST_ITEM, TYPE_LIST } from "../../types/todoList.ts";
import { addItem, changeItem, delItem, DelMultiple, getList } from "../../utils/todo.ts";
import { $Notification } from "../../utils/toast.ts";

export default function BaseUse(): JSX.Element {
  const [todoList, setTodoList] = useState<TYPE_LIST>(getList());

  const del = function (content: string) {
    delItem(setTodoList, todoList, content)
      .then((r: string) => $Notification({ content: r }))
      .catch((e: string) => $Notification({ content: e, type: "error" }));
  };
  const change = function (index: number, key: keyof INF_LIST_ITEM, value: string | boolean) {
    changeItem(setTodoList, todoList, index, key, value)
      .then((r: string) => {
        key !== "input" && $Notification({ content: r });
        console.log(key, "key");
      })
      .catch((e: string) => $Notification({ content: e, type: "error" }));
  };
  const add = function (content: string) {
    addItem(setTodoList, todoList, content)
      .then((r: string) => $Notification({ content: r }))
      .catch((e: string) => $Notification({ content: e, type: "error" }));
  };

  const multipleDel = function (ids: Array<string>) {
    DelMultiple(setTodoList, todoList, ids)
      .then((r: string) => $Notification({ content: r }))
      .catch((e: string) => $Notification({ content: e, type: "error" }));
  };
  return <Todo list={todoList} change={change} add={add} del={del} multipleDel={multipleDel} />;
}
