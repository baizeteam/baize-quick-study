import { INF_LIST_ITEM, TYPE_LIST } from "@/types/todoList.ts";
const TODO: "todo" = "todo";

export const addItem = function (list: TYPE_LIST, content: string) {
  try {
    list.unshift({ content, input: false, finished: false });
    localStorage.setItem(TODO, JSON.stringify(list));
  } catch (e) {
    console.error("添加失败: " + e);
  }
};
export const changeItem = function (list: TYPE_LIST, content: string, index: number) {
  list[index].content = content;
};
export const delItem = function (list: TYPE_LIST, content: string) {
  try {
    const index = list.findIndex((item) => item.content === content);
    list.splice(index, 1);
    localStorage.setItem(TODO, JSON.stringify(list));
  } catch (e) {
    console.error("删除失败: " + e);
  }
};
export const getList = function (): TYPE_LIST {
  try {
    const list: TYPE_LIST = JSON.parse(localStorage.getItem(TODO)) || [];
    list.forEach((item: INF_LIST_ITEM) => (item.input = false)); // 防止正在input时，强制刷新页面，需要重置input
    return list;
  } catch (e) {
    return [];
  }
};
