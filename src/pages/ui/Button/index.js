import React,{ useState} from "react";
import Ityped from "../../../components/Ityped";
import { Card, Button } from "antd";
const text =
  "标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。";
export default () => {
    const [loading,setLoading] = useState(false)
    

    return <div className="ui-base">
    <Ityped text={text} />

    <Card title="基本按钮" hoverable={true} className="ui-card">
      <Button type="primary">Primary</Button>
      <Button>Default</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="danger">Danger</Button>
      <Button type="link">Link</Button>
    </Card>


    <Card title="图标按钮" hoverable={true} className="ui-card">
      <Button type="primary" shape="circle" icon="search" />
      <Button type="primary" shape="circle">A</Button>
      <Button type="primary" icon="search">earch</Button>
      <Button shape="circle" icon="search" />
      <Button icon="search">Search</Button>
    </Card>



    <Card title="按钮尺寸" hoverable={true} className="ui-card">
      <Button type="primary"  size="large">large</Button>
      <Button type="primary"  >normal</Button>
      <Button type="primary"  size="small">small</Button>
    </Card>

    <Card title="加载中状态" hoverable={true} className="ui-card">
        <Button type="primary" loading>Loading </Button>
        <Button type="primary" loading={loading} onClick={() => setLoading(true)}>
          Click me!
        </Button>
    </Card>
  </div>
}
