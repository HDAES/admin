import React,{ useState, useEffect } from 'react'
import { Card, Table,Button, message } from 'antd'
import { getLinkAxios,overheadLinkAxios,passLinkAxios} from '../../../axios/http'

export default () =>{

    const [list,setList] = useState()   //友链列表
    useEffect(()=>{
        getLinkAxios().then(res=>{
            setList(res)
        })
    },[])
    //打开新窗口
    function open(e){
        window.open(e,'_blank')
    }
    //顶置
    function overheadLink(e){
        overheadLinkAxios({
            id:e.id,
            weights:e.weights
        }).then(res=>{
            message.success(res.message)
            setList(res.linkList)
        })
    }
    //通过申请 
    function agreeLink(e){
        passLinkAxios({id:e.id}).then(res=>{
            message.success(res.message)
            setList(res.linkList)
        })
    }
    const columns =[{
        title:"id",
        dataIndex:"id"
    },{
        title:'昵称',
        dataIndex:"nickname"
    },{
        title:'头像',
        dataIndex:"avatar",
        render:(e)=>{
            return <img src={e} width="100" alt={e}/>
        }
    },{
        title:'地址',
        dataIndex:"url",
        render:(e)=>{
            return <Button type="link" onClick={()=>open(e)}>{e}</Button>
        }
    },{
        title:'介绍',
        dataIndex:"Intr",
    },{
        title:'状态',
        dataIndex:"status",
        render:(e)=>{
            return e===0?"未通过":'已通过'
        }
    },{
        title:'操作',
        render:(e)=>{
           return  <div>
                <Button type="primary" onClick={()=>overheadLink(e)}>顶置</Button>
                <Button type="danger" ghost  onClick={()=>agreeLink(e)} style={{marginLeft:20}}>通过</Button>
           </div>
           
        }
    }]
    return <Card title="友情链接">
        <Table  columns={columns} dataSource={list}/>
    </Card>
}