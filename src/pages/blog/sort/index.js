import React , { useState }from 'react'
import { Tabs, Card, Form, Input, Button, Upload, Icon,message } from 'antd';
import { connect } from 'react-redux'
import api from '../../../axios/api'
import axios from '../../../axios'
import { setSections } from '../../../redux/action'
const { TabPane } = Tabs;

const mapStateToProps = state =>{
    return {
        section:state.section
    }
}

export default connect(mapStateToProps)(({section}) =>{

    return (
        <div className="sort">
           <Card title="博客分类管理">
           <Tabs defaultActiveKey="1">
               {
                   section.map((item,index) =>{
                       return  <TabPane tab={item.name} key={index}>
                                    <MyTabPane val={item}/>
                                </TabPane>
                   })
               }  
            </Tabs>
           </Card>
        </div>
    )
})

const MyTabPane = connect()(Form.create()(({val,form,dispatch}) =>{
    const [item,setItem] = useState(val)
    const { getFieldDecorator } = form;
    
    //保存修改
    function Save(){
        const temp = form.getFieldsValue()
        //上传
        axios({
            method:'POST',
            url:api.updateSection,
            data:{
                ...item,
                name:temp.name,
                icon:temp.icon
            }
        }).then((res)=>{
            message.success(res.message)
            dispatch(setSections(res.section))
        })
       
    }
    
    const formItemLayout = {
        labelCol: {
          sm: { span: 1 },
        },
        wrapperCol: {
          sm: { span: 23 },
        },
      };
    const uploadProps = {
        name: 'file',
        action: api.upload,
        onChange(info) {
            if (info.file.status !== 'uploading') {
            setItem({
                ...item,
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
    return (
        <Form {...formItemLayout}>
            <Form.Item label="图片">
                <div>
                    <img src={item.image} alt={item.name}></img>
                    <Upload {...uploadProps}>
                        <Button>
                        <Icon type="upload" />Update picture
                        </Button>
                    </Upload>
                </div>
               
            </Form.Item>
            <Form.Item label="名字">
            {
                getFieldDecorator('name', {
                    initialValue:item.name
                })
                (
                    <Input style={{width:400}}/>
                )
            }
            </Form.Item>
            <Form.Item label="Icon">
            {
                getFieldDecorator('icon', {
                    initialValue:item.icon
                })
                (   
                    <Input style={{width:400}}/>
                )
            }
            </Form.Item>
            <Form.Item label=" " colon={false}>
                <Button type="primary" onClick={Save}>保存</Button>
            </Form.Item>
        </Form>
    )
}))