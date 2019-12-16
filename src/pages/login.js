import React from 'react';
import { Form, Input, Icon, Button } from 'antd';
export default Form.create()(({form, history}) => {

    

     function submit (){
        form.validateFields( (err) => {
            if(!err){
               console.log(history)
               history.push('/index')
            }
        })   
    }
    const { getFieldDecorator } =form;
    return <div className="login">
        <div className="back-image" />
        <div className="login-form">
            <div className="title">Login</div>
            <Form>
                <Form.Item>
                    {
                        getFieldDecorator('userName',{
                            rules:[
                                { required: true, message: 'Please input your username!' },
                                { min:5,max:10, message: '长度不在范围内' },
                                { pattern:/^\w+$/g,message:'用户名必须为字母或者数组'}
                            ]
                        })(
                            <Input prefix={<Icon type="user" />} placeholder="请输入用户名" />
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('passWord',{
                            rules:[
                                { required: true, message: 'Please input your password!' },
                                { min:5,max:10, message: '长度不在范围内' },
                                { pattern:/^\w+$/g,message:'用户名必须为字母或者数组'}
                            ]
                        })(
                            <Input prefix={<Icon type="lock" />} placeholder="请输入用户名" />
                        )
                    }
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={submit}>登录</Button>
                </Form.Item>
            </Form>
        </div>
    </div>
})