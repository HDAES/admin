import React, { useEffect, useState} from 'react'
import { Card ,Table, Button, Modal, Input, message} from 'antd'
import axios from 'axios'
import { formatTime } from '../../../utils'
import { getMusicList,addMusicAxios,delMusicAxios} from '../../../axios/http'

export default () =>{

    const [list,setList] = useState()   //音乐列表
    const [visible,setVisible] = useState(false)
    const [searchList,setSearchList] = useState()
    useEffect( ()=>{
        getMusicList().then(res=>{
            setList(res)
        })
    },[])

    //搜索
    function search(keywords){
        if(keywords===''){
            message.error('请先输入关键字')
        }else{
            axios({
                url:'http://music.xl686.com/search?keywords='+keywords
            }).then(res=>{
                setSearchList(res.data.result.songs)
            })
        }
        
    }
    // 添加音乐
    function addMusic(id){
        addMusicAxios({id}).then(res=>message.success(res.message))
    }
    //删除音乐
    function delMusic(id){
        delMusicAxios({id}).then(res=>message.success(res.message))
    }
    const columns =[{
        title:"id",
        dataIndex:"id"
    },{
        title:'歌曲ID',
        dataIndex:"songid"
    },{
        title:'名字',
        dataIndex:"name"
    },{
        title:'歌手',
        dataIndex:"artists",
    },{
        title:'专辑',
        dataIndex:"album",
    },{
        title:'mvID',
        dataIndex:"mvid",
    },{
        title:'歌词',
        dataIndex:'lyric',
        render:(e)=>{
            return e.substring(0,10)
        }
    },{
        title:'图片',
        dataIndex:'picUrl',
        render:(e)=>{
            return <img src={e} width="100" alt={e}/>
        }
    },{
        title:'音乐播放次数',
        dataIndex:'songCTR'
    },{
        title:'MV播放次数',
        dataIndex:'mvCTR'
    },{
        title:'创建时间',
        dataIndex:'create_time',
        render:(e)=>{ return formatTime(e)}
    },{
        title:'操作',
        render:(e)=>{
           return  <Button type="danger" ghost onClick={()=>delMusic(e.id)}>删除</Button>
        }
    }]
    const musicColumn=[{
        title:"id",
        dataIndex:"id"
    },{
        title:"name",
        dataIndex:"name"
    },{
        title:"artists",
        dataIndex:'artists',
        render:(e)=>{
            return e[0].name
        }
    },{
        title:'album',
        dataIndex:'album',
        render:(e)=>{return e.name}
    },{
        title:'操作',
        render:(e)=>{
           return  <Button type="primary" onClick={()=>addMusic(e.id)}>增加</Button>
        }
    }]
    return <Card title="音乐管理">
        <Button type="primary" style={{marginBottom:20}} onClick={()=>setVisible(true)}>添加</Button>
        <Table columns={columns} dataSource={list} rowKey="id"/>
        <Modal
          title="搜索音乐"
          width={800}
          footer={null}
          visible={visible}
          onCancel={()=>setVisible()}
        >   
        
        <Input.Search
            placeholder="input search text"
            enterButton="Search"
            size="large"
            style={{marginBottom:20}}
            onSearch={value => search(value)}
        />
        <Table  columns={musicColumn} dataSource={searchList} rowKey="id"/>
        
           
        </Modal>
      
    </Card>
}