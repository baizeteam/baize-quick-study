import React, { useState } from "react";
import { $Notification } from "@/utils/toast.ts";
import { Button, Input } from "@arco-design/web-react";
import { Modal } from "@arco-design/web-react";
import {TYPE_LIST} from "@/utils/todo.ts";

const InputSearch = Input.Search;

interface INF_PROPS {
  list: TYPE_LIST;
  add: Function;
  del: Function;
}
export default function Todo(props: INF_PROPS) {
  const [inputVal, setInputVal] = useState("");
  const { list, del, add } = props;
  const todoList = list;
  const onAdd = function () {
    if (!inputVal) return $Notification({ content: "请键入内容再回车！", type: "warning" });
    add(inputVal);
    setInputVal(""); // after enter we should clear this value
  };

  const onDel = function (content: string) {
    Modal.confirm({
      title: "提示",
      content: "您确定要删除吗？删除后不可恢复",
      onOk: () => del(content)
    });
  };
  return (
    <div className="todosPage">
        <InputSearch
          searchButton
          placeholder="请输入"
          style={{ width: "320px" }}
          onChange={(e) => setInputVal(e)}
          onSearch={onAdd}
          className="head-input"
          value={inputVal}
        />
        {todoList.map((item) => (
          <div className="justify-between align-center item" key={item}>
            <span className="content">{item}</span>
            <Button type="text" status="danger" onClick={() => onDel(item)}>删除</Button>
          </div>
        ))}
    </div>
  );
}
