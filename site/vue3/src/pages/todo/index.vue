<template>
  <Header :height="headHeight" @teach="onDriver(true)" :width="mainWidth" @enterValue="addUndoItem" />
  <div class="main" :style="{ height: `calc(100vh - ${headHeight} - 21px` }">
    <div class="list" :style="{ width: mainWidth }">
      <div class="undoList">
        <div class="align-center justify-between">
          <Title :radius="undoList.length" title="未完成" />
          <button class="pointer onfinish" @click="onfinish" v-show="undoList.length">完成</button>
        </div>
        <div class="sortable">
          <Item
            :isUndo="true"
            v-for="(item, i) in undoList"
            :key="item.content"
            :data="item"
            @change="(text) => setUndoItem(text, i)"
            @del="delItem(undo, i)"
          />
        </div>
      </div>
      <div class="doneList">
        <Title :radius="doneList.length" title="已完成" />
        <Item
          v-for="(item, i) in doneList"
          :key="item.content"
          :data="item"
          @del="delItem(done, i)"
        />
      </div>
    </div>
  </div>
  <a-modal v-model:visible="modelShow" @ok="modelOk" @cancel="modelCancel">
    <template #title>
      提示
    </template>
    <div>{{modelContent}}</div>
  </a-modal>
</template>

<script lang="ts" setup>
import {Notification} from "@arco-design/web-vue";
import Sortable from "sortablejs"
import { driver } from "driver.js"
import "driver.js/dist/driver.css"
import { computed, nextTick, onMounted, ref } from "vue";
import Header from "@/components/Todo/Header.vue";
import Title from "@/components/Todo/Title.vue";
import Item from "@/components/Todo/Item.vue";
import {undo, done, TYPE_CONTENT, TYPE_UNDO_DONE} from '@/types/todoList.ts'
import { useDoneStore, useUndoStore } from "@/store/todoList"
import { $Notification } from "@/utils/toast.ts";

const undoStore = useUndoStore()
const doneStore = useDoneStore()
const headHeight = "60px"
const mainWidth = "100%"
const undoList = computed(() => undoStore.getUndos)
const doneList = computed(() => doneStore.getDones)
const modelShow = ref<boolean>(false)
const modelContent = ref<string>('')
/** method */
const addUndoItem = function (text:TYPE_CONTENT):void {
  const undoFound:boolean = undoList.value.filter((item) => item.content === text).length > 0
  const doneFound:boolean = doneList.value.filter((item) => item.content === text).length > 0
  if (undoFound) {
    return $Notification({content: `"${text}"在未完成列中已存在，请确认！`})
  }
  if (doneFound) {
    return $Notification({content: `"${text}"在已完成列中已存在，请确认！`})
  }
  undoStore.addUndoItem(text)
}

const addDoneItem = function (text:TYPE_CONTENT):void {
  const doneFound:boolean = doneList.value.filter((item) => item.content === text).length > 0
  if (doneFound) {
    return $Notification({content: `"${text}"在已完成列中已存在，请确认！`})
  }
  doneStore.addDoneItem(text)
  const undoIndex:number = undoList.value.findIndex((item) => item.content === text)
  // console.log(undoIndex)
  undoStore.delUndoItem(undoIndex)
}
const setUndoItem = function (text:TYPE_CONTENT, index:number):void {
  // console.log(text,index,'emit')
  undoStore.setUndoItem(text, index)
}
const modelOk = function(){
  modelShow.value = false
}

const modelCancel = function(){
  modelShow.value = false
}
const delItem = function (type:TYPE_UNDO_DONE, index:number) {
  if (type === undo) {
    undoStore.delUndoItem(index)
  } else if (type === done) {
    doneStore.delDoneItem(index)
  } else {
    console.error("错误的删除类型")
  }
}
const onfinish = function () {
  nextTick(function () {
    const checks = Array.from(document.getElementsByClassName("checkBoxInput") as Array<HTMLInputElement>)
    let noChecks:boolean = true
    checks.forEach((item) => {
      if (item.checked) {
        noChecks = false
        addDoneItem(item.value)
      }
    })
    if(noChecks) return $Notification({content: '请先选择未完成项目'})
  })
}
const rowDrop = function () {
  const sortableHtml = document.getElementsByClassName("sortable")[0]
  new Sortable(<HTMLElement>sortableHtml, {
    animation: 150
  })
}

const onDriver = function (isTeach: boolean){
  const undoContent = '示例：先赚一个小目标'
  // 有可能是不小心删了初次的undoItem, 但还想查看示例, 为他增加一个示例
  if(!undoList.value.length){
    const shouldAdd: unknown | null = prompt('检测到您未添加未完成项目，是否自动增加一个示例？')
    if(shouldAdd !== null){
      addUndoItem(undoContent)
    }else{
      return
    }
  }
  const driverObj = driver({
    showProgress: true,
    steps: [
      { element: ".head-input", popover: { title: "第一步", description: "首先输入需要完成的项目" } },
      {
        element: undoList.value.length ? ".content" : '.undoList',
        popover: { title: "第二步", description: "该项目会出现在未完成列表里" }
      },
      { element: ".checkBoxInput", popover: { title: "第三步", description: "点击勾选该项目" } },
      { element: ".onfinish", popover: { title: "第四步", description: "点击完成" } },
      { element: ".doneList", popover: { title: "第五步", description: "项目会来到已完成列表" } },
      { element: ".head-input", popover: { title: "最后", description: "来试一试吧!" } }
    ]
  })
  const hasDriver:string = "hasDriver"
  if (!localStorage.getItem(hasDriver) || isTeach) {
    !isTeach && addUndoItem(undoContent) // 做了引导步骤，就得需要示例项目, 但isTeach肯定会重复添加
    localStorage.setItem(hasDriver, "true")
    driverObj.drive()
  }
}


/** life callback */
onMounted(function () {
  rowDrop()
  onDriver()
})
</script>

<style lang="less" scoped>
.main {
  background: #f5f5f5;
  padding: 10px 0;
  .list {
    margin: auto;
  }
}
</style>
