import { INF_LIST_ITEM, TYPE_LIST } from "@/types/todoList.ts";
const TODO: "todo" = "todo";

export const addItem = function (list: TYPE_LIST, content: string) {
  return new Promise((resolve, reject) => {
    try {
      list.unshift({ content, input: false, finished: false });
      localStorage.setItem(TODO, JSON.stringify(list));
      resolve("添加成功");
    } catch (e) {
      const msg = "添加失败";
      console.error(msg + ":" + e);
      reject(msg);
    }
  });
};
export const changeItem = function (list: TYPE_LIST, index: number, key: keyof INF_LIST_ITEM, value: any) {
  return new Promise((resolve, reject) => {
    try {
      list[index][key] = value;
      localStorage.setItem(TODO, JSON.stringify(list));
      resolve("修改成功");
    } catch (e) {
      const msg = "修改失败";
      console.error(msg + ":" + e);
      reject(msg);
    }
  });
};
export const delItem = function (list: TYPE_LIST, content: string) {
  return new Promise((resolve, reject) => {
    try {
      const index = list.findIndex((item) => item.content === content);
      list.splice(index, 1);
      localStorage.setItem(TODO, JSON.stringify(list));
      resolve("删除成功");
    } catch (e) {
      const msg = "删除失败";
      console.error(msg + ":" + e);
      reject(msg);
    }
  });
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
