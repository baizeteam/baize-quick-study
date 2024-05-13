import React from "react";
import { $Notification } from "../../utils/toast.ts";
import { onDriver } from "../../utils/todo.ts";
import { INF_LIST_ITEM, TYPE_LIST } from "../../types/todoList.ts";
import { Button, Input } from "@arco-design/web-react";
import { Modal } from "@arco-design/web-vue";

const InputSearch = Input.Search;
let inputVal: string = "";

interface INF_PROPS {
  list: TYPE_LIST;
  change: Function;
  add: Function;
  del: Function;
  multipleDel: Function;
}
export default function Todo(props: INF_PROPS) {
  const { list, change, del, add, multipleDel } = props;
  const todoList = list;
  const onContent = function (index: number) {
    change(index, "input", true);
    setTimeout(function () {
      // focus
    }, 100);
  };
  const changeContent = function (e: any, index: number) {
    const currentValue = e.target.value;
    if (!currentValue) {
      return $Notification({ content: "不能更改为空白!", type: "warning" });
    }
    if (currentValue !== todoList[index].content) {
      // 避免重复触发提交
      change(index, "content", currentValue);
    }
    setTimeout(function () {
      change(index, "input", false);
    }, 100);
  };
  const onAdd = function () {
    if (!inputVal) {
      return $Notification({ content: "请键入内容再回车！", type: "warning" });
    }
    const isFound: boolean = todoList.filter((item) => item.content === inputVal.value).length > 0;
    if (isFound) {
      return $Notification({ content: `"${inputVal}"在列表中已存在，请确认！` });
    }
    add(inputVal);
    inputVal = ""; // after enter we should clear this value
  };

  const onFinish = function (index: number, item: INF_LIST_ITEM) {
    if (item.finished) return $Notification({ content: "已经是已完成状态!", type: "warning" });
    change(index, "finished", true);
  };

  const onDel = function (content: string) {
    Modal.confirm({
      title: "提示",
      content: "您确定要删除吗？删除后不可恢复",
      onOk: () => {
        del(content);
      },
    });
  };
  // 批量删除
  const onMultipleDel = function () {
    const checks = Array.from(document.getElementsByClassName("checkBoxInput")) as HTMLInputElement[];
    let noChecks: boolean = true;
    const ids: Array<string> = [];
    checks.forEach((item) => {
      if (item.checked) {
        noChecks = false;
        ids.push(item.value);
      }
    });
    if (noChecks) return $Notification({ content: "请先选择项目", type: "warning" });
    multipleDel(ids);
  };

  const driverOk = function () {
    add("示例：先赚一个小目标");
  };

  const renderContent = function (item: INF_LIST_ITEM, index: number): JSX.Element {
    if (item.input) {
      const keyUp = function (e: any, index: number) {};
      return (
        <input
          className="content"
          value={item.content}
          onKeyUp={(e) => keyUp(e, index)}
          onBlur={(e) => changeContent(e, index)}
        />
      );
    } else {
      return <span className="content" onClick={() => onContent(index)}></span>;
    }
  };
  return (
    <div className="todosPage">
      <div className="head align-center justify-between">
        <Button onClick={() => onDriver(todoList.length, driverOk)} type="text">
          查看教程
        </Button>
        <InputSearch
          searchButton
          placeholder="请输入"
          style={{ width: "320px" }}
          onChange={(e, event) => {
            inputVal = e;
            console.log(e, "sssss", event.target);
          }}
          onSearch={onAdd}
          className="head-input"
          value={inputVal}
        />
      </div>
      <div className="justify-between align-center" style={{ padding: "20px 0" }}>
        <div className="undo align-center">
          待办数
          <span className="flex-center">{todoList.filter((item) => !item.finished).length}</span>
        </div>
        <Button type="primary" onClick={onMultipleDel} style={{ display: todoList.length ? "block" : "none" }}>
          批量删除
        </Button>
      </div>
      <div className="list">
        {todoList.map((item, index) => (
          <div className="justify-between align-center item">
            <div className="warp">
              <input type="checkbox" className="checkBox checkBoxInput" value={item.content} />
              {renderContent(item, index)}
            </div>
            <Button
              type="text"
              onClick={() => onFinish(index, item)}
              className={item.finished ? "gray finish" : "finish"}
            >
              {item.finished ? "已完成" : "完成待办"}
            </Button>
            <Button type="text" status="danger" onClick={() => onDel(item.content)}>
              删除
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
