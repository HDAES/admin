import React,{ useState} from "react";
import Ityped from "../../../components/Ityped";
import { Card, Switch, Spin, Icon, Alert } from "antd";
import './index.less'
const text =
  "页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。";
export default () => {
    const [loading,setLoading] = useState(false)
    const icon = <Icon type="loading" style={{fontSize:'20px'}}/>
    return (
        <div  className="ui-base">
            <Ityped text={text}/>

            <Card title="spin的用法" className="ui-card" hoverable={true}>
                <Spin size="small"/>
                <Spin style={{margin:'0 10px'}}/>
                <Spin size="large"/>
                <Spin indicator={icon} style={{margin:'0 10px'}} />
            </Card>
            <Card title="内容遮罩" className="ui-card" hoverable={true}>
                <Spin><Alert message="React" description="欢迎来到React高级教程" type="warning"/></Spin>
                <Spin tip="加载中" spinning={loading} >
                    <Alert message="React" description="欢迎来到React高级教程" type="warning"/>
                </Spin>
                <Switch checked={loading} onChange={()=>setLoading((e)=>!e)} />
            </Card>
            <Card title="自定义1" className="ui-card" hoverable={true}>
                <div className="load-container1">
                    <div className="boxLoading"></div>
                </div>
            </Card>
            <Card title="自定义2" className="ui-card" hoverable={true}>
                <div className="load-container2">
                    <div className="container">
                        <div className="boxLoading boxLoading1"></div>
                        <div className="boxLoading boxLoading2"></div>
                        <div className="boxLoading boxLoading3"></div>
                        <div className="boxLoading boxLoading4"></div>
                        <div className="boxLoading boxLoading5"></div>
                    </div>
                </div>
            </Card>
            <Card title="自定义3" className="ui-card" hoverable={true}>
                <div className="load-container3">
                    <div className="load load1"></div>
                    <div className="load load2"></div>
                    <div className="load"></div>
                </div>
            </Card>
            <Card title="自定义4" className="ui-card" hoverable={true}>
                <div className="load-container4"></div>
            </Card>
        </div>
    )
}