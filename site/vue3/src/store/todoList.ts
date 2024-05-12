import { defineStore } from "pinia"
import {undo, done, TYPE_UNDO_DONE, TYPE_LIST, TYPE_CONTENT} from '@/types/todoList.ts'


const addItem = function (list: TYPE_LIST, content: TYPE_CONTENT, type:TYPE_UNDO_DONE) {
  try {
    list.push({ content, input: false })
    localStorage.setItem(type, JSON.stringify(list))
  } catch (e) {
    console.error("添加失败: " + e)
  }
}
const delItem = function (list:TYPE_LIST, index:number, type:TYPE_UNDO_DONE) {
  try {
    list.splice(index, 1)
    localStorage.setItem(type, JSON.stringify(list))
  } catch (e) {
    console.error("删除失败: " + e)
  }
}
const getList = function (type:TYPE_UNDO_DONE): TYPE_LIST {
  try {
    const list:TYPE_LIST = JSON.parse(localStorage.getItem(type) as string) || []
    list.forEach((item) => (item.input = false))
    return list
  } catch (e) {
    console.error(e)
    localStorage.removeItem(type)
    return []
  }
}
export const useUndoStore = defineStore(undo, {
  state: function () {
    return {
      undos: getList(undo)
    }
  },
  getters: {
    getUndos(state):TYPE_LIST {
      return state.undos
    }
  },
  actions: {
    setUndoItem(content:TYPE_CONTENT, index:number) {
      this.undos[index].content = content
      // console.log(content, index, this.undos, "finish")
    },
    addUndoItem(content:TYPE_CONTENT) {
      // console.log(this,'this')
      addItem(this.undos, content, undo)
    },
    delUndoItem(index:number) {
      delItem(this.undos, index, undo)
    }
  }
})

export const useDoneStore = defineStore(done, {
  state: function () {
    return {
      dones: getList(done)
    }
  },
  getters: {
    getDones(state):TYPE_LIST {
      return state.dones
    }
  },
  actions: {
    addDoneItem(content:TYPE_CONTENT) {
      // console.log(this,'this')
      addItem(this.dones, content, done)
    },
    delDoneItem(index:number) {
      delItem(this.dones, index, done)
    }
  }
})
