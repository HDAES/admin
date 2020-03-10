import React, { useState } from 'react'
import { Card,Table,Button, Modal, Form, Input, Select, message  } from 'antd'
import { deleteTag, updateTag, add} from '../../../axios/http'
import { connect } from 'react-redux'
import { setTags } from '../../../redux/action'
const mapStateToProps = state =>{
    return {
        tags:state.tags,
        section:state.section
    }
}

export default connect(mapStateToProps)(Form.create()(({dispatch,tags,section,form}) =>{
    const [editVisible,setEditVisible] = useState(false)    // 控制modal 显示
    const [tag,setTag] = useState(tags[0])
    const [isUpdate,setIsUpdate] = useState(true)   // 修改还是新增  true为修改
    const { getFieldDecorator } = form
    // 删除标签方法
    function DeleteTag(sid){
            Modal.confirm({
                title: 'Do you Want to delete these tags?',
                onOk() {
                    deleteTag(sid).then(res=>{
                        message.success('成功删除')
                        dispatch(setTags(res.tags))
                    })
                }
            })
    }
    // 修改或者添加标签
    function SaveTag(){
        const temp = form.getFieldsValue()
        if(isUpdate){
            updateTag({...temp,sid:tag.sid}).then((res)=>{
                message.success('修改成功')
                dispatch(setTags(res.tags))
                setEditVisible(false)
                form.resetFields()
            })
        }else{
            add(temp).then((res)=>{
                message.success('添加成功')
                dispatch(setTags(res.tags))
                setEditVisible(false)
                form.resetFields()
            })
        }
    }
    const columns =[{
        title:"id",
        dataIndex:"sid"
    },{
        title:'父类',
        dataIndex:"name"
    },{
        title:'标签名字',
        dataIndex:"s_name"
    },{
        title:'图标',
        dataIndex:"s_icon",
        render:(e)=>{
            return <i className={`iconfont ${e}`}></i>   
        }
    },{
        title:'操作',
        render:(e)=>{
            return <div>
                <Button type="primary" onClick={()=>{
                    setEditVisible(true);setTag(e);setIsUpdate(true)
                }}>编辑</Button>
                 <Button type="primary" ghost style={{margin:"0 20px"}} onClick={()=>{
                    setEditVisible(true);setTag({sid:0,name:'',s_name:'',s_icon:''});setIsUpdate(false)
                }}>新增</Button>
                <Button  type="danger" ghost 
                onClick={()=>DeleteTag(e.sid)}>删除</Button>

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
    return <div>
        <Card title="二级分类（标签）">
            <Table columns={columns } dataSource={tags} rowKey="sid">
            </Table>
            <Modal
                title="Modal"
                visible={editVisible}
                onOk={SaveTag}
                onCancel={()=>{setEditVisible(false);form.resetFields()}}
                okText="保存"
                cancelText="取消"
                >
                <Form {...formItemLayout}>
                    <Form.Item label="id">
                        <Input disabled placeholder={tag.sid}/>
                    </Form.Item>
                    <Form.Item label="父级分类">
                        {
                            getFieldDecorator('f_id', {
                                initialValue:tag.id
                            })
                            (   
                                <Select>
                                    {
                                       section.map((item)=>{
                                        return <Select.Option value={item.id}key={item.id}>{item.name}</Select.Option>
                                       }) 
                                    } 
                                </Select>
                            )
                        }
                    </Form.Item>
                    <Form.Item label="标签名">
                    {
                            getFieldDecorator('s_name', {
                                initialValue:tag.s_name
                            })
                            (   
                                <Input />
                            )
                        }
                    </Form.Item>
                    <Form.Item label="图标">
                    {
                            getFieldDecorator('s_icon', {
                                initialValue:tag.s_icon
                            })
                            (   
                                <Input />
                            )
                        }
                    </Form.Item>
                </Form>
            </Modal>
        </Card> 
    </div>
}))