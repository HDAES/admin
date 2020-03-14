import React,{useState,useEffect} from 'react'
import { Card, Table, Button, message, Modal,Form, Input } from 'antd'
import { getSayingAxios,delSayingAxios,updateSayingAxios,addSayingAxios} from '../../../axios/http'
export default Form.create()(({form}) =>{
    const [list,setList]= useState()
    const [editVisible,setEditVisible] = useState(false)
    const [isEdit,setIsEdit] = useState(true) //判断修改还是增加 true为修改
    const [editSaying,setEditSaying] = useState() 
    const { getFieldDecorator } = form
    useEffect( ()=>{
        getSayingAxios().then(res=>{
            setList(res)
        })
    },[])

    //删除
    function delSaying(e){
        delSayingAxios({id:e.id}).then(res=>{
            message.success(res.message)
            setList(res.sayList)
        })
    }
    //保存
    function Sava(){
        const temp = form.getFieldsValue()
        if(isEdit){
            //修改
            updateSayingAxios(temp).then(res=>{
                message.success(res.message)
                setEditVisible(false)
                setList(res.sayList)
                form.resetFields()
            })
        }else{
            addSayingAxios(temp).then(res=>{
                message.success(res.message)
                setEditVisible(false)
                setList(res.sayList)
                form.resetFields()
            })
        }
        
    }
    //添加
    function add(){
        setEditVisible(true)
        setIsEdit(false)
        setEditSaying({id:0,text:'',author:''})
    }
    const columns=[{
        title:'ID',
        dataIndex:'id'
    },{
        title:'text',
        dataIndex:'text'
    },{
        title:'author',
        dataIndex:'author'
    },{
        title:'操作',
        render:(e)=>{
          return  <div>
                <Button type="primary" onClick={()=>{setEditVisible(true);setIsEdit(true);setEditSaying(e)}}>编辑</Button>
                <Button type="primary" ghost style={{margin:"0 20px"}} onClick={()=>add()}>添加</Button>
                <Button type="danger" ghost onClick={()=>delSaying(e)}>删除</Button>
            </div>
        }
    }]
    const formItemLayout = {
        labelCol: {
          sm: { span: 4 },
        },
        wrapperCol: {
          sm: { span: 20 },
        },
    };
    return <Card title="名言管理">
        <Table  columns={columns} dataSource={list} rowKey="id"></Table>
        {
            editVisible?
            <Modal
            title="编辑"
            visible={editVisible}
            okText="保存"
            onOk={()=>Sava()}
            onCancel={()=>setEditVisible(false)}
          >
          <Form {...formItemLayout}>
              <Form.Item label="ID">
                  {
                      getFieldDecorator('id', {initialValue:editSaying.id})
                      (<Input disabled/>)
                  }
              </Form.Item>
              <Form.Item label="text">
                  {
                      getFieldDecorator('text', {initialValue:editSaying.text})
                      (<Input />)
                  }
              </Form.Item>
              <Form.Item label="author">
                  {
                      getFieldDecorator('author', {initialValue:editSaying.author})
                      (<Input />)
                  }
              </Form.Item>
          </Form>
          </Modal>:null
        }
        
    </Card>
})