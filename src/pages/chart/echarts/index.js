import React from "react";
import { Card, Tabs } from "antd";
import Bar from './Bar'
import Pie from "./Pie";
import Line from "./Line";
const { TabPane } = Tabs;
export default () => {
  return (
    <Card title="百度图表">
      <Tabs defaultActiveKey="1">
        <TabPane tab="柱状图" key="1">
          <Bar/>
        </TabPane>
        <TabPane tab="饼状图" key="2">
          <Pie />
        </TabPane>
        <TabPane tab="折线图" key="3">
          <Line />
        </TabPane>
      </Tabs>
    </Card>
  );
};
