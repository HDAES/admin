import React, { useEffect,useState} from 'react'
import { Card, Form,Input, Button, Table,Modal,Select,Upload,Icon,message,Radio} from 'antd'
import { getArticleList,updateArticle } from '../../../axios/http'
import api from '../../../axios/api'
import { formatTime } from '../../../utils'
import { connect } from 'react-redux'
const mapStateToProps = state =>{
    return {tags:state.tags,section:state.section}
}
export default connect(mapStateToProps)(Form.create()(({section,tags,form}) =>{

    const [articleList,setArticleList] = useState() 
    const [editVisible,setEditVisible] = useState(false)  // 编辑Modal框
    const [editArticle,setEditArticle] = useState(0)      // 选中的索引下标
    const [isEdit,setIsEdit] = useState(true) //判断修改还是增加 true为修改 
    const { getFieldDecorator } = form
    useEffect(()=>{
        getArticleList().then((res) =>{
            setArticleList(res.articleList)
        })
    },[])


    //保存修改
    function savaArticle(){
        const temp = form.getFieldsValue()
        if(isEdit){
            updateArticle({
                ...editArticle,
                ...temp
            }).then((res)=>{
                message.success('修改成功')
                setEditVisible(false)
                setArticleList(res)
                form.resetFields()
            })
        }
        
    }
    const columns =[{
        title:"id",
        dataIndex:"id"
    },{
        title:'分类',
        dataIndex:"f_name"
    },{
        title:'标签',
        dataIndex:"s_name"
    },{
        title:'标题',
        dataIndex:"title",
    },{
        title:'描述',
        dataIndex:"description",
    },{
        title:'图片',
        dataIndex:'image',
        render:(e)=>{
            return <img src={e} width="100" alt={e}/>
        }
    },{
        title:'类型',
        dataIndex:'type',
        render:(e)=>( e===0?'原创':'转载')
    },{
        title:'阅读次数',
        dataIndex:'reading'
    },{
        title:'创建时间',
        dataIndex:'d_create_time',
        render:(e)=>{ return formatTime(e)}
    },{
        title:'操作',
        render:(e)=>{
            return <div>
                <Button type='primary' onClick={()=>{setEditVisible(true);setEditArticle(e);setIsEdit(true)}}>编辑</Button>
                <Button type="danger" ghost style={{marginLeft:20}}>删除</Button>
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
    const uploadProps = {
        name: 'file',
        action: api.upload,
        onChange(info) {
            if (info.file.status !== 'uploading') {
            setEditArticle({
                ...editArticle,
                image:'http://blog.xl686.com'+info.fileList[0].response.data.imgPath
            })
            }
            if (info.file.status === 'done') {
            message.success(`file uploaded successfully`);
            } else if (info.file.status === 'error') {
            message.error(`file upload failed.`);
            }
        },
    };

    return <Card title="文章详情">
            <Control form={form}/>
            <Table columns={columns} dataSource={articleList} rowKey="id"/>
        
        {
            editVisible?<Modal
                title="编辑"
                width="800px"
                style={{ top: 20 }}
                visible={editVisible}
                onOk={savaArticle}
                onCancel={()=>setEditVisible(false)}
            >
            <Form {...formItemLayout}>
                <Form.Item label="文章ID"><Input placeholder={editArticle.id}/></Form.Item>
                <Form.Item label="分类">
                    {
                        getFieldDecorator('f_id', {initialValue:editArticle.f_id})
                        (<Select>{
                                    section.map((item)=>{
                                    return <Select.Option value={item.id}key={item.id}>{item.name}</Select.Option>
                                    }) 
                        }</Select>)
                    }
                </Form.Item>
                <Form.Item label="标签">
                    {
                        getFieldDecorator('s_id', {initialValue:editArticle.f_id})
                        (<Select>{
                                tags.map((item)=>{
                                    if(item.f_id === editArticle.f_id){
                                        return <Select.Option value={item.sid}key={item.sid}>{item.s_name}</Select.Option>
                                    }else{
                                        return null
                                    } 
                                }) 
                        }</Select>)
                    }
                </Form.Item>
                <Form.Item label="标题">
                    {
                        getFieldDecorator('title', {initialValue:editArticle.title})
                        (<Input/>)
                    }
                </Form.Item>
                <Form.Item label="描述">
                    {
                        getFieldDecorator('description', {initialValue:editArticle.description})
                        (<Input/>)
                    }
                </Form.Item>
                <Form.Item label="类型">
                    {
                        getFieldDecorator('type', {initialValue:editArticle.type})
                        (
                            <Radio.Group>
                                <Radio  value={0}>原创</Radio>
                                <Radio  value={1}>转载</Radio>
                            </Radio.Group>
                        )
                    }
                </Form.Item>
                <Form.Item label="图片">
                    <div>
                        <img src={editArticle.image} width='500' height="200" style={{objectFit: 'contain'}} alt={editArticle.name}></img>
                        <Upload {...uploadProps}>
                            <Button>
                            <Icon type="upload" />Update picture
                            </Button>
                        </Upload>
                    </div>
                </Form.Item>
            </Form>
            </Modal>:null
        }
        
    </Card>  
}))

function Control({form}){
    const { getFieldDecorator } = form
    return <Form layout="inline" style={{marginBottom:20}}>
        <Form.Item label="标题">
            {
                getFieldDecorator('filter_title')
                (   
                    <Input />
                )
            }
        </Form.Item>
        <Form.Item label="">
            <Button type="primary">搜索</Button>
        </Form.Item>
        <Form.Item label="">
            <Button type="primary">添加</Button>
        </Form.Item>
        <Form.Item label="">
            <Button type="primary">刷新</Button>
        </Form.Item>
    </Form>
}

