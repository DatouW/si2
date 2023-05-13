import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import { Menu } from "antd";

import logo from "../../assets/images/logo.png";
import "./index.css";
import menuList from "../../config/menuConfig";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export default function LeftNav() {
  let location = useLocation();
  let path = location.pathname;
  // console.log(path);

  const getMenuNodes = (menuList) => {
    return menuList.map((item) => {
      if (!item.children) {
        // console.log(item.key)
        return getItem(
          <NavLink to={item.key}>{item.title}</NavLink>,
          item.key,
          item.icon
        );
      } else {
        return getItem(
          item.title,
          item.key,
          item.icon,
          getMenuNodes(item.children)
        );
      }
    });
  };

  return (
    <>
      <div className="left-nav">
        <NavLink to="/home" className="left-nav-header">
          <img src={logo} alt="logo" />
          <h1>SI Avicola</h1>
        </NavLink>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[path]}
        defaultOpenKeys={[true]}
        items={getMenuNodes(menuList)}
      />
    </>
  );
}
