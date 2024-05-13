<template>
  <div class="head align-center justify-between">
    <a-button @click="onDriver" type="text">查看教程</a-button>
    <a-input-search
      class="head-input"
      :style="{ width: '320px' }"
      v-model="inputVal"
      @search="onAdd"
      @enter="onAdd"
      placeholder="请输入"
      button-text="添加"
      search-button
    />
  </div>
    <div class="justify-between align-center" style="padding: 20px 0">
      <div class="undo align-center">
        待办数
        <span class="flex-center">{{todoList.filter(item=> !item.finished).length}}</span>
      </div>
      <a-button type="primary" @click="onMultipleDel" v-show="todoList.length">批量删除</a-button>
    </div>
  <div class="list">
    <div class="justify-between align-center item" v-for="(item,index) in todoList" :key="item.content">
      <!--    contents -->
      <div class="warp">
        <input type="checkbox" class="checkBox checkBoxInput" :value="item.content" />
        <span class="content" v-if="!item.input" @click="onContent(index)">{{ item.content }}</span>
        <input
          class="content"
          v-else
          ref="contentRefs"
          :value="item.content"
          @keyup.enter="changeContent($event,index)"
          @blur="changeContent($event,index)"
        />
      </div>
      <!--    scope -->
      <a-button type="text" status="primary" class="finish" :class="item.finished ? 'gray' : ''" @click="onFinish(index,item)">
        {{item.finished ? '已完成' : '完成待办'}}
      </a-button>
        <a-button type="text" status="danger" @click="onDel(item.content)">删除</a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { computed, nextTick, onMounted, ref } from "vue";
import { INF_LIST_ITEM, TYPE_LIST } from "@/types/todoList.ts";
import { $Notification } from "@/utils/toast.ts";
import { Modal } from "@arco-design/web-vue";

const props = defineProps({
  list: {
    required: true,
    type: Array,
  },
});
/** data */
const emit = defineEmits(["change", "add", 'del', 'multipleDel']);
const tipShow = ref<boolean>(false);
const contentRefs = ref(); // v-if后只有一个，根据业务情况来
const inputVal = ref("");
const todoList: TYPE_LIST = computed(() => props.list);
/** method */
const onContent = function (index:number) {
  emit('change', index, 'input', true)
  setTimeout(function () {
    contentRefs.value[0].focus()
  }, 100);
};

const changeContent = function (e, index:number) {
  const currentValue = e.target.value;
  if (!currentValue) {
    return $Notification({ content: "不能更改为空白!", type: 'warning' });
  }
  if(currentValue !== todoList.value[index].content){ // 避免重复emit
    emit("change", index, 'content', currentValue);
  }
  setTimeout(function () {
    emit("change", index, 'input', false);
  }, 100);
};
const onAdd = function () {
  if (!inputVal.value) {
    return $Notification({ content: "请键入内容再回车！",type:'warning' });
  }
  const isFound: boolean = todoList.value.filter((item) => item.content === inputVal.value).length > 0;
  if (isFound) {
    return $Notification({ content: `"${inputVal.value}"在列表中已存在，请确认！` });
  }
  emit("add", inputVal.value);
  inputVal.value = ""; // after enter we should clear this value
};
const onFinish = function(index:number,item:INF_LIST_ITEM){
  if(item.finished) return $Notification({content: '已经是已完成状态!', type: 'warning'})
  emit('change', index, 'finished', true)
}
const onDel = function(content:string){
  Modal.confirm({
    title: "提示",
    content: "您确定要删除吗？删除后不可恢复",
    onOk: () => {
      emit("del", content);
    },
  })
}
const onMultipleDel = function () {
  nextTick(function () {
    const checks = Array.from(document.getElementsByClassName("checkBoxInput")) as HTMLInputElement[];
    let noChecks: boolean = true;
    const ids:Array<string> = []
    checks.forEach((item) => {
      if (item.checked) {
        noChecks = false;
        ids.push(item.value)
      }
    });
    if (noChecks) return $Notification({ content: "请先选择项目",type:'warning' });
    emit('multipleDel', ids)
  });
};

const driverObj = driver({
  showProgress: true,
  steps: [
    { element: ".head-input", popover: { title: "第一步", description: "首先输入需要完成的项目" } },
    {
      element: '.item',
      popover: { title: "第二步", description: "该项目会出现在列表里" },
    },
    { element: ".finish", popover: { title: "第三步", description: "如果需要完成该项目，点击完成按钮" } },
    { element: ".list", popover: { title: "第四步", description: "您可以查看所有的待办清单状态" } },
    { element: ".undo", popover: { title: "第五步", description: "您也可以查看待办的数量" } },
    { element: ".head-input", popover: { title: "最后", description: "来试一试吧!" } },
  ],
});
const tempContent = "示例：先赚一个小目标";
const onDriver = function () {
  const hasTodos = todoList.value.length > 0;
  if (hasTodos) {
    driverObj.drive();
  } else {
    Modal.confirm({
      title: '欢迎来到"待办清单"',
      content: "是否自动填加一个示例？",
      onOk: () => {
        emit("add", tempContent);
        setTimeout(driverObj.drive, 50);
      },
      onCancel: ()=>{
        $Notification({content: '请添加示例!',type: 'warning'})
      }
    });
  }
};

/** life callback */
onMounted(function () {
  const isUsedKey = 'isUsed'
  const isUsed = localStorage.getItem(isUsedKey);
  if(!isUsed){
    localStorage.setItem(isUsedKey,'true')
    onDriver()
  }
});
</script>

<style lang="less" scoped>
.undo{
  font-size: 16px;
  color: #666;
  font-weight: 600;
  span{
    border-radius: 50%;
    width: 25px;
    height: 25px;
    background: #c9c9c9;
    color: #ffffff;
    margin-left: 6px;
  }
}
.list {
  margin: auto;
  .item {
    background: #fff;
    padding: 5px 0;
    .warp {
      flex: 9;
      .checkBox {
        display: inline-block;
        width: 30px;
        height: 13px;
      }
      .content {
        display: inline-block;
        width: 80%;
      }
    }
    .gray{
      color: gray;
    }
  }
  .item + .item {
    margin-top: 15px;
  }
}
</style>
