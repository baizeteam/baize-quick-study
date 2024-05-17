import React, { useEffect, useState } from "react";
import { Menu } from "@arco-design/web-react";
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

  useEffect(() => {
    if (location.pathname === basePath + "/") {
      navigate("/base-use");
      setCurrentRoutes(["/base-use"]);
    }
    setCurrentRoutes([location.pathname.replace(basePath, "")]);
  }, [location.pathname]);

  return (
    <Menu mode="horizontal" selectedKeys={currentRoutes} onClickMenuItem={handleMenuSelect} styleName="app-nav">
      <MenuItem key="null" disabled>
        <img src={ReactSvg} styleName="logo" alt="Vite logo" />
      </MenuItem>
      <MenuItem key="/base-use">基本使用</MenuItem>
      <MenuItem key="/life-cycle">生命周期</MenuItem>
      <MenuItem key="/store-use">状态管理</MenuItem>
      <MenuItem key="/api-use">接口请求</MenuItem>
    </Menu>
  );
}
