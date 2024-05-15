import { makeAutoObservable, runInAction} from "mobx";
import {addItem, delItem, getList} from "@/utils/todo.ts";

class TodoStore {
    todos = getList()
    constructor() {
        makeAutoObservable(this)
    }
    createItem(content: string) {
        // console.log(this,'this')
        return addItem(this.todos, content);
    }
    /** 我使用了 runInAction 函数来包装 delItem 方法, 这将自动处理所有必要的反应性更新。因为 splice 方法本身并不会通知mobx有状态改变 */
    removeItem(id:string){
       runInAction(()=>{
          delItem(this.todos,id)
       })
    }
}

const todoStore = new TodoStore()
export default todoStore