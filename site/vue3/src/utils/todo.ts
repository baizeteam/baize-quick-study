import { INF_LIST_ITEM, TYPE_LIST } from "@/types/todoList.ts";

export const addItem = function (list: TYPE_LIST, content: string) {
  try {
    list.push({ content, input: false });
    localStorage.setItem("todo", JSON.stringify(list));
  } catch (e) {
    console.error("添加失败: " + e);
  }
};
export const changeItem = function (list: TYPE_LIST, content: string, index: number) {
  list[index].content = content;
};
export const delItem = function (list: TYPE_LIST, index: number) {
  try {
    list.splice(index, 1);
    localStorage.setItem("todo", JSON.stringify(list));
  } catch (e) {
    console.error("删除失败: " + e);
  }
};
export const getList = function (): TYPE_LIST {
  try {
    const list: TYPE_LIST = JSON.parse(localStorage.getItem("todo")) || [];
    list.forEach((item: INF_LIST_ITEM) => (item.input = false)); // 防止正在input时，强制刷新页面，需要重置input
    return list;
  } catch (e) {
    return [];
  }
};
