import { INF_LIST_ITEM, TYPE_LIST } from "@/types/todoList.ts";
import { driver } from "driver.js";
import { Modal } from "@arco-design/web-vue";
import { $Notification } from "@/utils/toast.ts";
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
export const changeItem = function (list: TYPE_LIST, index: number, key: keyof INF_LIST_ITEM, value: string | boolean) {
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
export const DelMultiple = function (list: TYPE_LIST, ids: Array<string>) {
  return new Promise((resolve, reject) => {
    try {
      for (let id of ids) {
        const i = list.findIndex((item) => item.content === id);
        list.splice(i, 1); // 模拟数据库删除
      }
      localStorage.setItem(TODO, JSON.stringify(list));
      resolve("批量删除成功");
    } catch (e) {
      const msg = "批量删除失败";
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

export const onDriver = function (hasTodos, okCallback) {
  const driverObj = driver({
    showProgress: true,
    steps: [
      { element: ".head-input", popover: { title: "第一步", description: "首先输入需要完成的项目" } },
      {
        element: ".item",
        popover: { title: "第二步", description: "该项目会出现在列表里" },
      },
      { element: ".finish", popover: { title: "第三步", description: "如果需要完成该项目，点击完成按钮" } },
      { element: ".list", popover: { title: "第四步", description: "您可以查看所有的待办清单状态" } },
      { element: ".undo", popover: { title: "第五步", description: "您也可以查看待办的数量" } },
      { element: ".head-input", popover: { title: "最后", description: "来试一试吧!" } },
    ],
  });
  if (hasTodos) {
    driverObj.drive();
  } else {
    Modal.confirm({
      title: '欢迎来到"待办清单"',
      content: "是否自动填加一个示例？",
      onOk: () => {
        okCallback(); // 没传直接抛错就行
        setTimeout(driverObj.drive, 50);
      },
      onCancel: () => {
        $Notification({ content: "请添加示例!", type: "warning" });
      },
    });
  }
};
