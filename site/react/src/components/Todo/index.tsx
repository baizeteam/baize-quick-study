import React, { useState } from "react";
import { $Notification } from "@/utils/toast.ts";
import { Button, Input, Modal, Empty } from "@arco-design/web-react";
import { TYPE_LIST } from "@/utils/todo.ts";

const InputSearch = Input.Search;

interface INF_PROPS {
  list: TYPE_LIST;
  add: Function;
  del: Function;
}
export default function Todo(props: INF_PROPS): React.JSX.Element {
  const [inputVal, setInputVal] = useState("");
  const { list, del, add } = props;
  const todoList = list;
  const onAdd = function () {
    if (!inputVal) return $Notification({ content: "请输入内容！", type: "warning" });
    add(inputVal);
    setInputVal(""); // after enter we should clear this value
  };

  const onDel = function (content: string) {
    Modal.confirm({
      title: "提示",
      content: "您确定要删除吗？删除后不可恢复",
      onOk: () => del(content),
    });
  };
  return (
    <div className="todosPage">
      <InputSearch
        searchButton="添加"
        placeholder="请输入"
        style={{ width: "320px" }}
        onChange={(e) => setInputVal(e)}
        onSearch={onAdd}
        className="head-input"
        id="baseUseTodoInput"
        value={inputVal}
      />
      <div id="todoList" className="list">
        {todoList.length ? (
          <>
            {todoList.map((item, index) => (
              <div className="justify-between align-center item" key={item + index}>
                <span className="content">{item}</span>
                <Button type="text" status="danger" onClick={() => onDel(item)}>
                  删除
                </Button>
              </div>
            ))}
          </>
        ) : (
          <Empty style={{ marginTop: "48px" }} />
        )}
      </div>
    </div>
  );
}
