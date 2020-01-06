import React from "react";
import { Card, Tabs } from "antd";
import Bar from './Bar'
import Line from "./Line";
import Pie from './Pie'
import Radar from './Radar'
import Relation from './Relation'
const { TabPane } = Tabs;
const text = 'G2 是一套基于可视化编码的图形语法，以数据驱动，具有高度的易用性和扩展性，用户无需关注各种繁琐的实现细节，一条语句即可构建出各种各样的可交互的统计图表。'
export default () => {
  return (
    <Card title="G2">
      <div style={{margin:'20px 0',fontSize:18}}>{text}</div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="柱状图" key="1">
          <Bar />
        </TabPane>
        <TabPane tab="饼状图" key="2">
          <Pie />
        </TabPane>
        <TabPane tab="折线图" key="3">
          <Line />
        </TabPane>
        <TabPane tab="雷达图" key="4">
          <Radar />
        </TabPane>
        <TabPane tab="关系图" key="5">
          <Relation />
        </TabPane>
      </Tabs>
    </Card>
  );
};
