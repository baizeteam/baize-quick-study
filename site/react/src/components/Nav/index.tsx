import React, { useEffect, useState } from "react";
import { Menu, Popover } from "@arco-design/web-react";
import ReactSvg from "@/assets/react.svg";
import { useNavigate } from "react-router-dom";
import { basePath } from "@/router";
import "./index.module.less";

const MenuItem = Menu.Item;

export default function Nav(): React.JSX.Element {
  const navigate = useNavigate();
  const [currentRoutes, setCurrentRoutes] = useState<string[]>([]);

  // 修改menu状态
  const handleMenuSelect = (key: string) => {
    // 跳转到指定路由
    navigate(key);
    // 更新当前选中状态
    setCurrentRoutes([key]);
  };

  // 打开子应用
  const openApp = () => {
    const urlPath = import.meta.env.DEV ? location.protocol + "//localhost:5601/react/" : "/react/";
    window.open(urlPath, "_blank");
  };

  useEffect(() => {
    if (location.pathname === basePath + "/") {
      navigate("/base-use");
      setCurrentRoutes(["/base-use"]);
    }
    setCurrentRoutes([location.pathname.replace(basePath, "")]);
  }, [location.pathname]);

  return (
    <div styleName="app-nav">
      <Popover title="点击打开React子应用" trigger="hover" position="rt">
        <div styleName="logo" onClick={openApp}>
          <img src={ReactSvg} alt="react" />
        </div>
      </Popover>
      <Menu mode="horizontal" selectedKeys={currentRoutes} onClickMenuItem={handleMenuSelect}>
        <MenuItem key="/base-use">基本使用</MenuItem>
        <MenuItem key="/life-cycle">生命周期</MenuItem>
        <MenuItem key="/store-use">状态管理</MenuItem>
        <MenuItem key="/api-use">接口请求</MenuItem>
      </Menu>
    </div>
  );
}
