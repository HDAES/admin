import React, { useEffect,useState} from 'react'
import { Card, Form,Input, Button, Table,Modal,Select,Upload,Icon,message,Radio} from 'antd'
import Editor from 'for-editor';
import { getArticleList,updateArticle,addArticle,getArticle,addUpdateArticle} from '../../../axios/http'
import api from '../../../axios/api'
import { formatTime } from '../../../utils'
import { connect } from 'react-redux'
const mapStateToProps = state =>{
    return {tags:state.tags,section:state.section}
}
export default connect(mapStateToProps)(Form.create()(({section,tags,form}) =>{
    const [articleList,setArticleList] = useState()     //所有文章
    const [editVisible,setEditVisible] = useState(false)  // 详情编辑Modal框
    const [artEditVisible,setArtEditVisible] = useState(false)  //文章编辑Modal框
    const [editArticle,setEditArticle] = useState()      // 选中的值
    const [isEdit,setIsEdit] = useState(true) //判断修改还是增加 true为修改 
    const [tableLoading,setTableLoading] = useState(true)
    const { getFieldDecorator } = form
    useEffect(()=>{
        getArticleList().then((res) =>{
            setArticleList(res.articleList)
            setTableLoading(false)
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
        }else{
            addArticle({
                ...editArticle,
                ...temp
            }).then((res)=>{
                message.success('添加成功')
                setEditVisible(false)
                setArticleList(res)
                form.resetFields()
            })
        }
        
    }
    // 打开添加弹框
    function addArticleModal(){
        setEditArticle({id:0,f_id:1,s_id:1,title:'',description:'',type:0,image:''})
        setEditVisible(true)
        setIsEdit(false)
    }
    //搜索按钮
    function search(){
        const temp = form.getFieldsValue()
        if(temp.filter_title===undefined){
            message.error('请输入关键词')
        }else{
          
        }
    }
    //刷新
    function refresh(){
        setTableLoading(true)
        getArticleList().then((res) =>{
            setArticleList(res.articleList)
            setTableLoading(false)
        })
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
                <Button type="primary" ghost style={{margin:"0 20px"}} onClick={()=>{setArtEditVisible(true);setEditArticle(e)}}>文章</Button>
                <Button type="danger" ghost >删除</Button>
                
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
            <Control form={form} addArticleModal={addArticleModal} refresh={refresh} search={search}/>
            <Table columns={columns} dataSource={articleList} rowKey="id" loading={tableLoading}/>
        
        {
            editVisible?<Modal
                title="编辑"
                width="800px"
                style={{ top: 20 }}
                visible={editVisible}
                onOk={savaArticle}
                onCancel={()=>{setEditVisible(false);form.resetFields()}}
            >
            <Form {...formItemLayout}>
                <Form.Item label="文章ID"><Input placeholder={editArticle.id} disabled/></Form.Item>
                <Form.Item label="分类">
                    {
                        getFieldDecorator('f_id', {initialValue:editArticle.f_id})
                        (<Select onChange={(val)=>{setEditArticle({...editArticle,f_id:val})}}>{
                                    section.map((item)=>{
                                    return <Select.Option value={item.id}key={item.id}>{item.name}</Select.Option>
                                    }) 
                        }</Select>)
                    }
                </Form.Item>
                <Form.Item label="标签">
                    {
                        getFieldDecorator('s_id', {initialValue:editArticle.s_id})
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
        { artEditVisible?<ArtEdit visible={artEditVisible} setVisible ={setArtEditVisible} editArticle={editArticle} refresh={refresh}/>:null}
        
    </Card>  
}))

function Control({form,addArticleModal,refresh,search}){
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
            <Button type="primary" onClick={()=>search()}>搜索</Button>
        </Form.Item>
        <Form.Item label="">
            <Button type="primary" onClick={()=>addArticleModal()}>添加</Button>
        </Form.Item>
        <Form.Item label="">
            <Button type="primary" onClick={()=>{refresh()}}>刷新</Button>
        </Form.Item>
    </Form>
}


//文章编辑
function ArtEdit({visible,setVisible,editArticle,refresh}){
    const [article,setArticle] = useState()
    
    useEffect(()=>{
        getArticle({c_id:editArticle.c_id}).then(res=>{
            if(res.length>0){
                setArticle(res[0].context)
            }  
        })
    },[editArticle.c_id])

    //保存修改 
    function sava(){
        console.log('123')
        addUpdateArticle({
            id:editArticle.id,
            c_id:editArticle.c_id,
            context:article
        }).then(res=>{
            message.success(res.message)
            setVisible(false)
            refresh()
        })
    }
    return <Modal
        width={1000}
        title={123}
        visible={visible}
        okText="保存"
        cancelText="取消"
        onOk={sava}
        onCancel={ ()=>setVisible(false)}
        > 
            <Editor 
                preview={true}
                subfield={true}
                value={article} 
                onChange={(value)=>setArticle(value)}
                    />
        
    </Modal>
}

