import React from "react";
import Todo from "../../components/Todo";
import { INF_LIST_ITEM, TYPE_LIST } from "../../types/todoList.ts";
import { addItem, changeItem, delItem, DelMultiple, getList } from "../../utils/todo.ts";
import { $Notification } from "../../utils/toast.ts";

const todoList: TYPE_LIST = getList();

const del = function (content: string) {
  delItem(todoList, content)
    .then((r: string) => $Notification({ content: r }))
    .catch((e: string) => $Notification({ content: e, type: "error" }));
};
const change = function (index: number, key: keyof INF_LIST_ITEM, value: string | boolean) {
  changeItem(todoList, index, key, value)
    .then((r: string) => {
      key !== "input" && $Notification({ content: r });
      console.log(key, "key");
    })
    .catch((e: string) => $Notification({ content: e, type: "error" }));
};
const add = function (content: string) {
  addItem(todoList, content)
    .then((r: string) => $Notification({ content: r }))
    .catch((e: string) => $Notification({ content: e, type: "error" }));
};

const multipleDel = function (ids: Array<string>) {
  DelMultiple(todoList, ids)
    .then((r: string) => $Notification({ content: r }))
    .catch((e: string) => $Notification({ content: e, type: "error" }));
};

export default function BaseUse(): JSX.Element {
  return <Todo list={todoList} change={change} add={add} del={del} multipleDel={multipleDel} />;
}
