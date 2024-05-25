import React, { useEffect } from "react";
import CodeDemo from "@/components/CodeDemo";

export default function LifeCycle(): React.JSX.Element {
  // useEffect 用于监听组件的生命周期，包括挂载、更新和卸载
  useEffect(() => {
    console.log("react 挂载完成");
    return () => {
      console.log("react 卸载完成");
    };
  }, []);

  return (
    <>
      <div>生命周期</div>
      <CodeDemo />
    </>
  );
}
