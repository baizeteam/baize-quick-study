import React from "react";
import { observer } from "mobx-react";
import { Tooltip } from "@arco-design/web-react";
import mainUserStore from "@/store/mainUserStore";
import "./index.module.less";

function UserInfo() {
  return (
    <div styleName="user-info">
      <Tooltip
        content={
          <div>
            <div>名字：{mainUserStore.user.name}</div>
            <div>年龄：{mainUserStore.user.age}</div>
          </div>
        }
      >
        {mainUserStore.user.name}
      </Tooltip>
    </div>
  );
}
export default observer(UserInfo);
