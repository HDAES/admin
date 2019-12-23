import React,{ useState} from "react";
import Ityped from "../../../components/Ityped";
import { Card, Radio, Button, notification, Slider, message  } from "antd";
const text =
  "标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。";

  export default () => {
      const [type,setType] = useState ('success')
      const [placement,setPlacement] = useState('topRight')
      const [duration,setDuration] = useState(4)

        function openNotificationWithIcon (){
          
            notification[type]({
                message: `Notification Title`,
                description:`类型：${type}；位置：${placement}；过渡时间：${duration}s`,
                placement ,
                duration
            })
        }
        function openMessageWithIcon (){
            message[type](`This is a ${type} message`, duration)
        }
      return (
          <div  className="ui-base">
            <Ityped text={text}/>
            <Card title="Notification通知提醒框" hoverable={true} className="ui-card">
                <div>
                    <span style={{marginRight:20}}>类型：</span> 
                    <Radio.Group 
                        defaultValue={type}
                        onChange={(e)=>setType(e.target.value)}
                        >
                        <Radio value="success">success</Radio>
                        <Radio value="info">info</Radio>
                        <Radio value="warning">warning</Radio>
                        <Radio value="error">error</Radio>
                    </Radio.Group>
                </div>
                <div style={{margin:' 20px 0'}}>
                    <span style={{marginRight:20}}>位置：</span> 
                    <Radio.Group 
                        defaultValue={placement} 
                        onChange={(e)=>setPlacement(e.target.value)}
                        >
                        <Radio value="topLeft">topLeft</Radio>
                        <Radio value="topRight">topRight</Radio>
                        <Radio value="bottomLeft">bottomLeft</Radio>
                        <Radio value="bottomRight">bottomRight</Radio>
                    </Radio.Group>
                </div>
                <div style={{margin:' 20px 0'}}>
                    <span style={{marginRight:20}}>持续时间：</span> 
                    <Slider onChange={(value )=>setDuration(value )} defaultValue={duration} max={10} min={0} />
                </div>
                <Button  type="primary" onClick={openNotificationWithIcon}>popup</Button>
            </Card>

            <Card title="Message全局提示" hoverable={true} className="ui-card">
                <div>
                    <span style={{marginRight:20}}>类型：</span> 
                    <Radio.Group 
                        defaultValue={type}
                        onChange={(e)=>setType(e.target.value)}
                        >
                        <Radio value="success">success</Radio>
                        <Radio value="warning">warning</Radio>
                        <Radio value="error">error</Radio>
                    </Radio.Group>
                </div>
                <div style={{margin:' 20px 0'}}>
                    <span style={{marginRight:20}}>持续时间：</span> 
                    <Slider onChange={(value )=>setDuration(value )} defaultValue={duration} max={10} min={0} />
                </div>
                <Button  type="primary" onClick={openMessageWithIcon}>popup</Button>
            </Card>
          </div>
      )
  }