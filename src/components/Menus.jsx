import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "antd";
const menusList = [
  {
    name: "首页",
    index: "/index",
    icon: "home"
  },
  {
    name: "常用组件",
    index: "/ui",
    icon:'ant-design',
    children: [
      {
        name: "图标",
        index: "/ui/icon",
        
      },
      {
        name: "按钮",
        index: "/ui/button",
        
      },{
        name: "弹框，抽屉",
        index: "/ui/modals", 
      },
      {
        name: "Loading",
        index: "/ui/loading", 
      },
      {
        name: "通知提示",
        index: "/ui/notification", 
      },
      {
        name: "表单组件",
        index: "/ui/form",
      }
    ]
  }
];
export default ({history}) => {
  const [menuNode, setMenuNode] = useState(null);
  useEffect(() => {
    setMenuNode(renderMenu(menusList));
    return () => {};
  }, []);

  return (
    <div className="menus">
      <Link to="/index" className="logo">
        <img src="/assets/logo-ant.svg" alt="logo" />
        xl686.com
      </Link>

      <Menu theme="dark" >{menuNode}</Menu>
    </div>
  );
};

/**
 * 渲染导航列表
 */
function renderMenu(data) {
  return data.map(item => {
    if (item.children) {
      return (
        <Menu.SubMenu title={<span><Icon type={item.icon} />{item.name} </span>} key={item.index} >
          {renderMenu(item.children)}
        </Menu.SubMenu>
      );
    } else {
      return (
        <Menu.Item title={item.name} key={item.index}>
          <Link to={item.index}>
            
              {item.name}</Link>
        </Menu.Item>
      );
    }
  });
}
