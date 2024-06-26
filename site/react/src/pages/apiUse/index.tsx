import React from "react";
import MockData from "@/components/MockData";
import CodeDemo from "@/components/CodeDemo";

export default function ApiUse(): React.JSX.Element {
  return (
    <>
      <div>接口请求</div>
      <MockData />
      <CodeDemo fileList={["@/components/MockData/index.tsx"]} />
    </>
  );
}
