import React, { useEffect, useState } from "react";
import { Menu } from "@arco-design/web-react";
import ReactSvg from "@/assets/react.svg";
import { useNavigate } from "react-router-dom";
import "./index.less";

const MenuItem = Menu.Item;

export default function Nav() {
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
    setCurrentRoutes([location.pathname]);
  }, []);

  return (
    <Menu
      mode="horizontal"
      selectedKeys={currentRoutes}
      onClickMenuItem={handleMenuSelect}
      className="app-nav"
    >
      <MenuItem key="null" disabled>
        <img src={ReactSvg} className="logo" alt="Vite logo" />
      </MenuItem>
      <MenuItem key="/">Home</MenuItem>
      <MenuItem key="/my">My</MenuItem>
    </Menu>
  );
}
