import React from "react";
import { observer } from "mobx-react";
import { Input } from "@arco-design/web-react";
import CodeDemo from "@/components/CodeDemo";
import userStore from "@/store/userStore";

const StoreUse = function (): React.JSX.Element {
  return (
    <>
      <Input
        addBefore="名字"
        style={{ width: 200, marginBottom: 12, display: "block" }}
        value={userStore.user.name}
        onChange={(e) => userStore.updateUserInfo("name", e)}
      />
      <Input
        addBefore="年龄"
        style={{ width: 200, marginBottom: 12, display: "block" }}
        value={userStore.user.age}
        onChange={(e) => userStore.updateUserInfo("age", e)}
      />
      <CodeDemo fileList={["@/store/userStore.ts"]} />
    </>
  );
};
export default observer(StoreUse);
