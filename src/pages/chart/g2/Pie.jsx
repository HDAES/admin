import React, { useEffect } from 'react';
import G2 from '@antv/g2';
import { Card } from 'antd';
export default () =>{
    useEffect( () =>{
        Pie1()
        Pie2()
        Pie3()
    })
    return (
        <>
         <Card title="基础饼图">
                <div id="c4"></div>
            </Card>
            <Card title="环图" style={{margin:'20px 0'}}>
                <div id="c5"></div>
            </Card>
            <Card title="南丁格尔玫瑰图" >
                <div id="c6"></div>
            </Card>
        </>
    )
}
function Pie1(){
    const data = [
        { item: '事例一', count: 40, percent: 0.4 },
        { item: '事例二', count: 21, percent: 0.21 },
        { item: '事例三', count: 17, percent: 0.17 },
        { item: '事例四', count: 13, percent: 0.13 },
        { item: '事例五', count: 9, percent: 0.09 }
      ];
      const chart = new G2.Chart({
        container: 'c4',
        forceFit: true,
        height: 500
      });
      chart.source(data, {
        percent: {
          formatter: val => {
            val = (val * 100) + '%';
            return val;
          }
        }
      });
      chart.coord('theta', {
        radius: 0.75
      });
      chart.tooltip({
        showTitle: false,
        itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
      });
      chart.intervalStack()
        .position('percent')
        .color('item')
        .label('percent', {
          formatter: (val, item) => {
            return item.point.item + ': ' + val;
          }
        })
        .tooltip('item*percent', (item, percent) => {
          percent = percent * 100 + '%';
          return {
            name: item,
            value: percent
          };
        })
        .style({
          lineWidth: 1,
          stroke: '#fff'
        });
      chart.render();
}
function Pie2(){
    const data = [
        { item: '事例一', count: 40, percent: 0.4 },
        { item: '事例二', count: 21, percent: 0.21 },
        { item: '事例三', count: 17, percent: 0.17 },
        { item: '事例四', count: 13, percent: 0.13 },
        { item: '事例五', count: 9, percent: 0.09 }
      ];
      const chart = new G2.Chart({
        container: 'c5',
        forceFit: true,
        height: 500,
        animate: false
      });
      chart.source(data, {
        percent: {
          formatter: val => {
            val = (val * 100) + '%';
            return val;
          }
        }
      });
      chart.coord('theta', {
        radius: 0.75,
        innerRadius: 0.6
      });
      chart.tooltip({
        showTitle: false,
        itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
      });
      // 辅助文本
      chart.guide().html({
        position: [ '50%', '50%' ],
        html: '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">主机<br><span style="color:#8c8c8c;font-size:20px">200</span>台</div>',
        alignX: 'middle',
        alignY: 'middle'
      });
      const interval = chart.intervalStack()
        .position('percent')
        .color('item')
        .label('percent', {
          formatter: (val, item) => {
            return item.point.item + ': ' + val;
          }
        })
        .tooltip('item*percent', (item, percent) => {
          percent = percent * 100 + '%';
          return {
            name: item,
            value: percent
          };
        })
        .style({
          lineWidth: 1,
          stroke: '#fff'
        });
      chart.render();
      interval.setSelected(data[0]);
}
function Pie3(){
    const data = [
        { type: '分类一', value: 27 },
        { type: '分类二', value: 25 },
        { type: '分类三', value: 18 },
        { type: '分类四', value: 15 },
        { type: '分类五', value: 10 },
        { type: 'Other', value: 5 }
      ];
      
      const chart = new G2.Chart({
        container: 'c6',
        forceFit: true,
        height: 500,
        padding: [ 40, 0 ]
      });
      
      chart.source(data);
      chart.coord('polar', {
        startAngle: Math.PI, // 起始角度
        endAngle: Math.PI * (3 / 2) // 结束角度
      });
      chart.interval()
        .position('type*value')
        .color('type', 'rgb(252,143,72)-rgb(255,215,135)')
        .label('value', {
          offset: -15,
          label: {
            textAlign: 'center',
            fill: '#000'
          }
        })
        .style({
          lineWidth: 1,
          stroke: '#fff'
        });
      
      chart.render();
}
