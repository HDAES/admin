import React, { useState } from 'react';
import { Card, Tree, Form, Input, Switch, Select, Button, message  } from 'antd';
import { connect } from 'react-redux'
import {setAllMenus } from '../../../redux/action'
import api from '../../../axios/api'
import axios from '../../../axios'
import './index.less'
const { TreeNode } = Tree;
const { Option } = Select;
const mapStateToProps = state =>{
    return {
      all_menus:state.all_menus,
      level_all_menus:state.level_all_menus
    }
  }
export default connect(mapStateToProps)(Form.create()(({dispatch,form, all_menus,level_all_menus}) =>{
    const [isFirst,setIsFirst] = useState(true)
    const { getFieldDecorator } = form
    console.log(all_menus)

    function addMenus(){
        const { name, path, f_id, icon } = form.getFieldsValue()
        form.validateFields( (err) => {
            if(!err){
                if(!isFirst && f_id ===undefined){   
                    message.error('请选择父级菜单')
                }else{
                    axios({method:'POST',url:api.addMenus,data:{name, path,icon,f_id:f_id === undefined ? 0: f_id}}).then(res=>{
                        message.success(res.message)
                        dispatch(setAllMenus(res))
                        form.resetFields()
                    })
                }
            }
        })  
    }

    function delMenus(){
        const {select_id} = form.getFieldsValue()
        if( select_id === undefined){
            message.error('请先选择')
        }else{
            axios({method:'POST',url:api.delMenus,data:{select_id }}).then(res=>{
                if(res.code === -1){
                    message.error(res.err)
                }else{
                    message.success(res.message)
                    dispatch(setAllMenus(res))
                }
            })
        }
    }
    return (
        <Card title="菜单管理">
            <div className="manage-menus" style={{display:'flex'}}>
                    <Tree
                        checkable
                        defaultExpandAll
                        style={{flex:1}}
                    >
                    { renderTreeNode(level_all_menus) }
                    </Tree>
                    <Card title="添加菜单" style={{flex:2}}>
                        <Form   {...FormItemLayout} >
                            <Form.Item label="名字">
                                {
                                    getFieldDecorator('name',{
                                        rules:[
                                            { required: true, message: 'Please input your name!' },
                                        ]
                                    })(
                                        <Input placeholder="名字" />
                                    )
                                }
                            </Form.Item>
                            <Form.Item label="地址">
                                {
                                    getFieldDecorator('path',{
                                        rules:[
                                            { required: true, message: 'Please input your path!' },
                                        ]
                                    })(
                                        <Input placeholder="地址"/>
                                    )
                                }
                            </Form.Item>
                            <Form.Item label="是否一级菜单">
                                <Switch checked={isFirst} onChange={()=>setIsFirst(e=>!e)} />
                            </Form.Item>
                            <Form.Item label="父菜单">
                                    {
                                        getFieldDecorator('f_id')(
                                            <Select placeholder="请选择" disabled={isFirst}>
                                                
                                                { 
                                                    renderSelectOption(all_menus)
                                                }
                                            </Select>
                                        )
                                    } 
                            </Form.Item>
                            <Form.Item label="Icon">
                                    {
                                        getFieldDecorator('icon')(
                                            <Input placeholder="图标" disabled={!isFirst}/>
                                        )
                                    }
                                    
                            </Form.Item>
                            <Form.Item label=" " colon={false}>
                                <Button type="primary" onClick={addMenus}>添加</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                    
                    <Card title="删除菜单" style={{flex:1}}>
                        <Form style={{flex:1}}>
                            <Form.Item label="删除名字">
                                {
                                        getFieldDecorator('select_id')(
                                            <Select placeholder="请选择" >
                                                { 
                                                    renderSelectOption(all_menus)
                                                }
                                            </Select>
                                        )
                                    }
                            </Form.Item>
                            <Form.Item label=" " colon={false}>
                                <Button type="danger" onClick={delMenus}>删除</Button>
                            </Form.Item>
                        </Form>
                    </Card>
            </div>
        </Card>
    )
}))


function renderTreeNode (authMenus){
    if(authMenus === undefined ) return false
    return authMenus.map( (item) =>{
        if(item.children){
            return  (
                <TreeNode title={item.name} key={item.path}>
                       { renderTreeNode(item.children) }
                </TreeNode>
            )
        }else{
            return  <TreeNode title={item.name} key={item.path} />
        }
    })
}

// 渲染 下拉列表
function renderSelectOption (all_menus){ 
    return all_menus.map( (item) =>{
        return <Option value={item.id} key={item.id}>{item.name}</Option> 
    })
}

const FormItemLayout = {
    labelCol:{
        xs:24,
        sm:5
    },
    wrapperCol:{
        xs:24,
        sm:8
    }
}