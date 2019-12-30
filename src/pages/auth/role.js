import React, {useState, useEffect} from 'react';
import { Card, Button, Table, Modal, Input, Form, Tag, Icon, Tree, message } from 'antd';
import api from '../../axios/api'
import axios from '../../axios'
import { formatTime,defaultPage } from '../../utils'
import { connect } from 'react-redux'
const { TreeNode } = Tree;
const { confirm } = Modal;

const mapStateToProps = state =>{
    return {
      user:state.user
    }
  }
export default  connect(mapStateToProps)(Form.create()(( {form, user } ) =>{
    const [role,setRole] = useState([])
    const [page,setPage] = useState(1)
    const [addRoleVisible,setRoleVisible] = useState(false)
    const [pagination,setPagination] = useState({})
    const [refresh,setRefresh] = useState(false)
    const [selecteKey,setSelecteKey] = useState()   //选中的 key
    const [authVisible,setAuthVisible] = useState(false) //权限弹框 控制
    const [authRows,setAuthRows] = useState()   //选中时当前行的数据
    const [roleMenus,setRoleMenus] = useState([])  // 当前用户的 菜单列表
    const [updataVisible,setUpdataVisible ] = useState(false) // 修改密码弹框
    const [newPassWord,setNewPassWord] = useState()

    useEffect(() => {
        axios({method:'GET',url:api.getRole,data:{params:{page}}}).then( res =>{
            res.list.map( (item) =>{
                item.key = item.id
                return true
            })
            setRole(res.list)
            setPage(res.page)
            setPagination(defaultPage(res,(current)=>{
                setPage(current)
            }))
        })
      
    },[page,refresh])

    const rowSelection ={
        type:'radio',
        onChange:(key) =>setSelecteKey(key),
        selectedRowKeys:selecteKey
    }
   // 权限操作
    function Authority(rows){
        axios({method:'GET',url:api.getRoleMenus,data:{params:{role_id:rows.id } }}).then( res =>{
            setRoleMenus(res)
            setAuthVisible(true)
        })
    }
    // 删除成员
    function deleteRole(){
        if(selecteKey === undefined){
            message.error('请先选择你要删除的角色')
        }else{
            confirm({
                title: `是否删除当前角色？`,
                content: '删除后不可恢复',
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk() {
                  axios({method:'POST',url:api.delRole,data:{id:selecteKey[0]}}).then( res =>{
                      if(res.code === 0){
                        setRefresh(e=>!e)
                        message.success('删除成功')
                      }else{
                          message.error('删除失败')
                      }
                  })
                },
                onCancel() {
                    message.warning('取消操作')
                },
              });
        }
    }

    function changePassWord(){
        if(user.id === 1 || user.id === 2){
           setUpdataVisible(true)
        }else{
            message.error('权限不足')
        }
    }
    function updataPassWord(){
        axios({method:'POST',url:api.updataPassWord,data:{ password:newPassWord,id:authRows.id}}).then( res =>{
            if(res.code === 0){
                message.success(res.message)
                setUpdataVisible(false)
            }else{
                message.error(res.err)
                setUpdataVisible(false)
            }
        })
    }
    // 表头
    const columns   = [
        {
            title:'ID',
            dataIndex:'id',
        },
        {
            title:'角色名字',
            dataIndex:'name'
        },
        {
            title:'账号',
            dataIndex:'account'
        },
        
        {
            title:'创建人',
            dataIndex:'create_name'
        },
        {
            title:'创建时间',
            dataIndex:'create_time',
            render:(create_time)=>{
                return formatTime(create_time)
            }
        },
        {
            title:'更新时间',
            dataIndex:'update_time',
            render:(update_time)=>{
                return formatTime(update_time)
            }
        },{
            title:'状态',
            dataIndex:'status',
            render:(status)=>renderStatus(status)
        },{
            title:'权限',
            render:(rows)=><div>
                <Icon type="apartment" onClick={()=>Authority(rows)}/>
            </div>    
        },{
            title:'操作',
            render:(rows) =><div>
                <Button size="small" type="link" onClick={() => changePassWord(rows)}>修改密码</Button>
            </div>
        }
    ]

    return (
        <Card title="角色管理">
            <div className="role-operating">
                <Button type="primary" onClick={() => setRoleVisible(true)}>添加成员</Button>
                <Button type="danger" onClick={deleteRole} style={{margin:'0 20px'}}>删除成员</Button>
            </div>
            <Table 
                columns={columns} 
                dataSource={role}
                rowSelection={rowSelection}  
                style={{marginTop:20}} 
                pagination={pagination}
                onRow={ record  =>{
                    return {
                        onClick:() =>{ setSelecteKey( [record.key]); setAuthRows(record)}
                    }
                }}
            ></Table>

            <AddModal form={form} setRefresh={()=>setRefresh((e)=>!e)} addRoleVisible={addRoleVisible} setRoleVisible={()=>setRoleVisible(false)}/>
            <AuthModal  roleMenus={roleMenus} authVisible={authVisible} setAuthVisible={()=>setAuthVisible(false)} authRows={authRows}/>
            <Modal
                title="密码修改"
                visible={updataVisible}
                onOk={updataPassWord}
                onCancel={()=>setUpdataVisible(false)}
                >
               <Input placeholder='密码' onChange={(e)=>setNewPassWord(e.target.value )}/>
            </Modal>
        </Card>
    )
}))



function AddModal({form,addRoleVisible,setRoleVisible,setRefresh}){
    const { getFieldDecorator } = form
    function addRole(){
        form.validateFields( (err) => {
            if(!err){
               axios({method:'POST',url:api.addRole,data:form.getFieldsValue()}).then(res=>{
                    setRoleVisible()
                    setRefresh()
               })
            }
        })   
    }
    return (
        <Modal
        title="添加管理角色"
        visible={addRoleVisible}
        onOk={addRole}
        onCancel={setRoleVisible}
    >
        <Form  {...FormItemLayout}>
            <Form.Item label="角色名">
            {
                getFieldDecorator('name',{
                    rules:[
                        { required: true, message: 'Please input your name!' },
                    ]
                })(
                    <Input placeholder='角色名'/>
                )
            }
            </Form.Item>
            <Form.Item label="账号">
            {
                getFieldDecorator('account',{
                    rules:[
                        { required: true, message: 'Please input your account!' },
                    ]
                })(
                    <Input placeholder='账号名'/>
                )
            }
            </Form.Item>
            <Form.Item label="密码">
            {
                getFieldDecorator('password',{
                    rules:[
                        { required: true, message: 'Please input your password!' },
                    ]
                })(
                    <Input placeholder='密码'/>
                )
            }
            </Form.Item>
        </Form>
    </Modal>
    )
}



function AuthModal ({ authVisible, setAuthVisible,roleMenus,authRows}){
    const [ checkedKeys,setCheckedKeys] = useState([])
    useEffect( ()=>{ 
        setCheckedKeys(roleMenus.role_menus)
    },[roleMenus.role_menus])

    function updataMenus(){
        axios({method:'POST',url:api.updataRoleMenus,data:{menus:checkedKeys,role_id:authRows.id}}).then( (res) =>{
            if(res.code ===0){
                setAuthVisible()
                message.success('修改成功')
            }
        })
    }
    return (
        <Modal
            title="管理角色权限"
            visible={authVisible}
            onOk={updataMenus}
            onCancel={setAuthVisible}
        >
            <Form {...FormItemLayout}>
                <Form.Item label="角色名">
                    <Input disabled  value={ authRows===undefined? '':authRows.name }/>
                </Form.Item>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={ (checkedKeys) =>setCheckedKeys(checkedKeys)}
                    checkedKeys={checkedKeys}
                >
                   { renderTreeNode(roleMenus.all_menus) }
                </Tree>
            </Form>
        </Modal>
    )
}

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

const FormItemLayout = {
    labelCol:{
        xs:24,
        sm:5
    },
    wrapperCol:{
        xs:24,
        sm:15
    }
}

function renderStatus(status){
    if(status === 0){
        return  <Tag color="#f50">未审核</Tag>
    }else if(status === 1){
        return  <Tag color="#108ee9">审核通过</Tag>
    }
}