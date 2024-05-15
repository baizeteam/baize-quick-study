import {$Notification} from "@/utils/toast.ts";
export const TODO: "todo" = "todo";
export type TYPE_LIST = Array<string>

export const addItem = function (list: TYPE_LIST, content: string, set?:Function) {
  try {
    list.unshift(content);
    localStorage.setItem(TODO, JSON.stringify(list));
    set && set(list)
    $Notification({content:'添加' + content + '成功'})
  }catch (e){
    $Notification({content:'添加' + content + '失败', type:'error'})
  }
};
export const delItem = function (list: TYPE_LIST, content: string, set?: Function) {
  try {
    const index = list.findIndex(item=> item === content);
    if(set){
      const cloneList = [...list]   /** 不要直接修改原数据，这样页面才会响应式 */
      cloneList.splice(index, 1);
      localStorage.setItem(TODO, JSON.stringify(cloneList));
      set(cloneList)
    }else{
      list.splice(index, 1);
      localStorage.setItem(TODO, JSON.stringify(list));
    }

    $Notification({content:'删除' + content + '成功'});
  } catch (e) {
    $Notification({content:'删除' + content + '失败',type:'error'})
  }
};
export const getList = function (): TYPE_LIST {
  try {
    return JSON.parse(localStorage.getItem(TODO) as string) || [];
  } catch (e) {
    return [];
  }
};