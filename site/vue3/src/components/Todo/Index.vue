<template>
  <div class="head align-center justify-between">
    <a-button @click="onDriver(true)" type="text">查看教程</a-button>
    <a-input-search
      class="head-input"
      :style="{ width: '320px' }"
      v-model="inputVal"
      @search="onAdd"
      placeholder="请输入"
      button-text="添加"
      search-button
    />
  </div>
  <div class="list">
    <div class="align-center justify-between">
          <a-button type="primary" @click="onfinish" v-show="todoList.length">完成</a-button>
        </div>
    <div class="justify-between align-center item" v-for="item in todoList" :key="item.content">
          <!--    contents -->
          <div class="warp">
            <input type="checkbox" class="checkBox checkBoxInput" :value="item.content" />
            <span class="content" v-if="!item.input" @click="onContent">{{ item.content }}</span>
            <input
              class="content"
              v-else
              ref="contentRef"
              :value="item.content"
              @keyup.enter="changeContent($event, item)"
              @blur="changeContent($event,item)"
            />
          </div>
          <!--    scope -->
          <a-popover :popup-visible="tipShow" position="left" title="提示">
            <a-button type="text" status="danger" @click="tipShow=true">删除</a-button>
            <template #content>
              <p style="margin: 6px 0">您确定要删除吗？删除后不可恢复</p>
              <div class="justify-end">
                <a-button style="margin-right: 6px" type="primary" @click="delItem">确定</a-button>
                <a-button @click="tipShow = false">取消</a-button>
              </div>
            </template>
          </a-popover>
        </div>
  </div>
</template>

<script lang="ts" setup>
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { computed, nextTick, onMounted, ref } from "vue";
import { TYPE_LIST} from "@/types/todoList.ts";
import { $Notification } from "@/utils/toast.ts";
import { Modal } from "@arco-design/web-vue";

const props = defineProps({
  list: {
    required: true,
    type: Array
  }
})
/** data */
const emit = defineEmits(['change','add'])
const tipShow = ref<boolean>(false)
const contentRef = ref(); // v-if后只有一个，根据业务情况来
const inputVal = ref("");
const todoList:TYPE_LIST = computed(() => props.list);
/** method */
const onContent = function (item) {
  item.input = true;
  setTimeout(function () {
    contentRef.value.focus();
  }, 100);
};

const changeContent = function (e,item) {
  const inputVal = e.target.value;
  if (!inputVal) {
    return $Notification({ content: "不能更改为空白!" });
  }
  // console.log(value,'changeContent')
  emit('change',inputVal)
  setTimeout(function () {
    item.input = false;
  }, 100);
};
const onAdd = function () {
  if (!inputVal.value) {
    return $Notification({ content: "请键入内容再回车！" });
  }
  const isFound: boolean = todoList.value.filter((item) => item.content === inputVal.value).length > 0;
  if (isFound) {
    return $Notification({ content: `"${inputVal.value}"在列表中已存在，请确认！` });
  }
  emit('add', inputVal.value)
  inputVal.value = ""; // after enter we should clear this value
};
const onfinish = function () {
  nextTick(function () {
    const checks = Array.from(document.getElementsByClassName("checkBoxInput")) as HTMLInputElement[];
    let noChecks: boolean = true;
    checks.forEach((item) => {
      if (item.checked) {
        noChecks = false;
        emit('add')
      }
    });
    if (noChecks) return $Notification({ content: "请先选择未完成项目" });
  });
};

const onDriver = function (isTeach?: boolean) {
  const content = "示例：先赚一个小目标";
  // 有可能是不小心删了初次的undoItem, 但还想查看示例, 为他增加一个示例
  if (!todoList.value.length) {
    Modal.confirm({
      title: "提示",
      content: "检测到您未添加未完成项目，是否自动增加一个示例？",
      onOk: () => {
        emit('add', content)
      },
    });
  }
  const driverObj = driver({
    showProgress: true,
    steps: [
      { element: ".head-input", popover: { title: "第一步", description: "首先输入需要完成的项目" } },
      {
        element: todoList.value.length ? ".content" : ".undoList",
        popover: { title: "第二步", description: "该项目会出现在未完成列表里" },
      },
      { element: ".checkBoxInput", popover: { title: "第三步", description: "点击勾选该项目" } },
      { element: ".onfinish", popover: { title: "第四步", description: "点击完成" } },
      { element: ".doneList", popover: { title: "第五步", description: "项目会来到已完成列表" } },
      { element: ".head-input", popover: { title: "最后", description: "来试一试吧!" } },
    ],
  });
  const hasDriver: string = "hasDriver";
  if (!localStorage.getItem(hasDriver) || isTeach) {
    !isTeach && emit('add',content); // 做了引导步骤，就得需要示例项目, 但isTeach肯定会重复添加
    localStorage.setItem(hasDriver, "true");
    driverObj.drive();
  }
};

/** life callback */
onMounted(function () {
  // onDriver();
});
</script>

<style lang="less" scoped>
.list {
    margin: auto;
    .item {
      background: #fff;
      padding: 0 6px;
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
    }
    .item + .item {
      margin-top: 15px;
    }
  }
</style>
