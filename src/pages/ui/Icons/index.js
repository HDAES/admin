import React from "react";
import { Input, Card, Form, Radio, Icon } from "antd";
const { Search } = Input;
export default () => {
  return (
    <div className="icon-base">
      <Card className="icon-card" hoverable={true}>
        <Form layout="inline">
          <Form.Item label="图标名称">
            <Search
              placeholder="输入图标名字"
              onSearch={value => console.log(value)}
              enterButton
              style={{ width: 600 }}
            />
          </Form.Item>
          <Form.Item>
            <Radio.Group defaultValue="antd" buttonStyle="solid">
              <Radio.Button value="antd">Antd</Radio.Button>
              <Radio.Button value="iconfont">Iconfont</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Card>
      <div className="icon-content">
        {IconList.map((item, index) => {
          return (
            <div className="icon-item" key={index}>
              <div className="title">{item.title}</div>
              {item.list.map((items, i) => (
                <div className="icon" key={index + "-" + i}>
                  <Icon type={items.type} />
                  <span className="name">{items.type}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const IconList = [
  {
    title: "方向性图标",
    list: [
      {
        name: "左边",
        type: "step-backward"
      },
      {
        name: "右边",
        type: "step-forward"
      },
      {
        name: "左边",
        type: "step-backward"
      },
      {
        name: "右边",
        type: "step-forward"
      },
      {
        name: "左边",
        type: "step-backward"
      },
      {
        name: "右边",
        type: "step-forward"
      },
      {
        name: "左边",
        type: "step-backward"
      },
      {
        name: "右边",
        type: "step-forward"
      }
    ]
  }
];
