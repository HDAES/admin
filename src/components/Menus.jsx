import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "antd";

import { connect } from 'react-redux'

const mapStateToProps = state =>{
  return {
    levelmenus:state.levelmenus
  }
}

export default connect(mapStateToProps)(({levelmenus}) => {
  const [menuNode, setMenuNode] = useState(null);
  console.log(levelmenus)
  useEffect(() => {
    
    setMenuNode(renderMenu(levelmenus));
     
    return () => {};
  }, [levelmenus]);

  return (
    <div className="menus">
      <Link to="/index" className="logo">
        <img src="/assets/logo-ant.svg" alt="logo" />
        xl686.com
      </Link>

      <Menu theme="dark" mode="inline">{ menuNode}</Menu>
    </div>
  );
})



/**
 * 渲染导航列表
 */
function renderMenu(data) {
  return data.map(item => {
    if (item.children) {
      return (
        <Menu.SubMenu title={<span>  {item.icon !=null? <Icon type={item.icon} /> :null }   {item.name} </span>} key={item.id} >
          {renderMenu(item.children)}
        </Menu.SubMenu>
      );
    } else {
      return (
        <Menu.Item title={item.name} key={item.id}>
          <Link to={item.path}>
            
              {item.name}</Link>
        </Menu.Item>
      );
    }
  });
}
