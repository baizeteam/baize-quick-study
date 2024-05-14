import {$Notification} from "@/utils/toast.ts";
export const TODO: "todo" = "todo";
export type TYPE_LIST = Array<string>

export const addItem = function (list: TYPE_LIST, content: string) {
  try {
    list.unshift(content);
    localStorage.setItem(TODO, JSON.stringify(list));
    $Notification({content:'添加成功'})
  }catch (e){
    $Notification({content:'添加失败'})
  }
};
export const delItem = function (list: TYPE_LIST, content: string) {
    try {
      const index = list.findIndex(item=> item === content);
      list.splice(index, 1);
      localStorage.setItem(TODO, JSON.stringify(list));
      $Notification({content:'删除成功'});
    } catch (e) {
      $Notification({content:'删除失败'})
    }
};
export const getList = function (): TYPE_LIST {
  try {
    return JSON.parse(localStorage.getItem(TODO)) || [];
  } catch (e) {
    return [];
  }
};