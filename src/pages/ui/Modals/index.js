import React, { useState } from 'react';
import Ityped from "../../../components/Ityped";
import { Card, Button, Modal, Radio, Drawer } from 'antd';
const { confirm } = Modal;
const text =
  "需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 Modal 在当前页面正中打开一个浮层，承载相应的操作。";
export default () =>{
    const [showModel1,setShowModel1] = useState(false)
    const [showModel2,setShowModel2] = useState(false)
    const [showModel3,setShowModel3] = useState(false)
    const [showModel4,setShowModel4] = useState(false)
    const [placement,setPlacement] = useState('left')
    const [showDrawer,setShowDrawer] = useState(false)
    function showConfirm() {
        confirm({
          title: 'Do you Want to delete these items?',
          content: 'Some descriptions',
          onOk() {
            console.log('OK');
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }
    function showDeleteConfirm() {
    confirm({
        title: 'Are you sure delete this task?',
        content: 'Some descriptions',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
        console.log('OK');
        },
        onCancel() {
        console.log('Cancel');
        },
    });
    }
    function showPropsConfirm() {
        confirm({
          title: 'Are you sure delete this task?',
          content: 'Some descriptions',
          okText: 'Yes',
          okType: 'danger',
          okButtonProps: {
            disabled: true,
          },
          cancelText: 'No',
          onOk() {
            console.log('OK');
          },
          onCancel() {
            console.log('Cancel');
          },
        });
    }
    function showPromiseConfirm() {
        confirm({
          title: 'Do you want to delete these items?',
          content: 'When clicked the OK button, this dialog will be closed after 1 second',
          onOk() {
            return new Promise((resolve, reject) => {
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch(() => console.log('Oops errors!'));
          },
          onCancel() {},
        });
      }
    return (
        <div  className="ui-base">
            <Ityped text={text} />
            
            <Card title="对话框" hoverable={true} className="ui-card">
                <Button type="primary" onClick={ () => setShowModel1(true)}>Open Modal</Button>
                <Button type="primary" onClick={ () => setShowModel2(true)}>自定义页脚</Button>
                <Button type="primary" onClick={ () => setShowModel3(true)}>顶部20px弹框</Button>
                <Button type="primary" onClick={ () => setShowModel4(true)}>水平垂直居中</Button>
            </Card>

            <Card title="确认对话框" hoverable={true} className="ui-card">
                <Button onClick={showConfirm}>Confirm</Button>
                <Button onClick={showDeleteConfirm} type="dashed">Delete</Button>
                <Button onClick={showPropsConfirm} type="dashed">With extra props</Button>
                <Button onClick={showPromiseConfirm} type="dashed">异步关闭</Button>
            </Card>

            <Card title="自定义方法" hoverable={true} className="ui-card">
                <Radio.Group 
                 style={{ marginRight: 8 }}
                 defaultValue={placement}
                 onChange={(e)=>setPlacement(e.target.value)}>
                    <Radio value="left">left</Radio>
                    <Radio value="top">top</Radio>
                    <Radio value="right">right</Radio>
                    <Radio value="bottom">bottom</Radio> 
                </Radio.Group>
                <Button type="primary" onClick={() =>setShowDrawer(true)}>Open</Button>
            </Card>

            <Drawer
                title="Basic Drawer"
                placement={placement}
                onClose={()=> setShowDrawer(false)}
                visible={showDrawer}
                >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>

            
            <Modal
                title="React"
                visible={showModel1}
                onCancel={()=> setShowModel1(false)}
                >
                <p>欢迎你的到来</p>
            </Modal>
            <Modal
                title="React"
                visible={showModel2}
                okText="好的"
                cancelText="算了"
                onCancel={()=> setShowModel2(false)}
                >
                <p>欢迎你的到来</p>
            </Modal>
            <Modal
                title="React"
                style={{top:'20px'}}
                visible={showModel3}
                onCancel={()=> setShowModel3(false)}
                >
                <p>欢迎你的到来</p>
            </Modal>
            <Modal
                title="React"
                wrapClassName="model-center"
                visible={showModel4}
                onCancel={()=>setShowModel4(false)}
                >
                <p>欢迎你的到来</p>
            </Modal>
        </div>
    )
}