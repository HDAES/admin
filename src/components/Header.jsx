import React, { useState } from "react";
import { Icon,Badge, Avatar, Dropdown, Menu} from "antd";
import { connect } from 'react-redux'

const mapStateToProps = state =>{
  return {
    user:state.user
  }
}
export default connect(mapStateToProps)(({user}) => {
  const [full, setFull] = useState(false);
  function handleFull() {
    let dos = document.documentElement;
    if (full) {
      if (document.exitFullScreen) {
        document.exitFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setFull(false);
    } else {
      if (dos.requestFullscreen) {
        dos.requestFullscreen();
      } else if (dos.mozRequestFullScreen) {
        dos.mozRequestFullScreen();
      } else if (dos.webkitRequestFullScreen) {
        dos.webkitRequestFullScreen();
      }
      setFull(true);
    }
  }

  function handleClick(e){
   
    switch(e.key){
        case '1' :
            window.open('http://www.xl686.com/about')
            break;
        case '2' :
            window.open('https://github.com/HDAES/admin')
            break;
        case '3' :
            window.location.href='/#/index'
            break;
        case '4' :
            window.location.href='/#/login'
            break;
        default : 
            break;
    }
  }
  const menu = (
    <Menu onClick={handleClick}>
      <Menu.Item key="1">关于作者</Menu.Item>
      <Menu.Item key="2">项目仓库</Menu.Item>
      <Menu.Item key="3">返回首页</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="4">退出登录</Menu.Item>
    </Menu>
  );
  console.log('header  render')
  return (
    <div className="header">
     
        <Icon type="fullscreen" className="icon-btn" onClick={handleFull} />
        <Badge dot>
            <Icon className="badge-icon" type="bell" />
        </Badge>
       
        <Dropdown overlay={menu} >
           <div className="avatar" ><Avatar  size={36} icon="user" /> <span style={{marginLeft:5}}>{user.name}</span></div>
        </Dropdown> 
    </div>
  );
})
