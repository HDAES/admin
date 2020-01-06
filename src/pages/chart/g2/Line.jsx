import React, { useEffect } from 'react';
import G2 from '@antv/g2';
import { Card } from 'antd';
export default () => {
    useEffect( () =>{
        Line1()
        Line2()
        Line3()
    })
    return (
        <>
            <Card title="基础折线图">
                <div id="c1"></div>
            </Card>
            <Card title="双折线图" style={{margin:'20px 0'}}>
                <div id="c2"></div>
            </Card>
            <Card title="阶梯折线图" >
                <div id="c3"></div>
            </Card>
        </>
    )
}

function Line1(){
    const data = [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 13 }
      ];
      const chart = new G2.Chart({
        container: 'c1',
        forceFit: true,
        height: 500
      });
      chart.source(data);
      chart.scale('value', {
        min: 0
      });
      chart.scale('year', {
        range: [ 0, 1 ]
      });
      chart.tooltip({
        crosshairs: {
          type: 'line'
        }
      });
      chart.line().position('year*value');
      chart.point().position('year*value')
        .size(4)
        .shape('circle')
        .style({
          stroke: '#fff',
          lineWidth: 1
        });
      chart.render();
}
function Line2(){
    const data = [
        { month: 'Jan', city: 'Tokyo', temperature: 7 },
        { month: 'Jan', city: 'London', temperature: 3.9 },
        { month: 'Feb', city: 'Tokyo', temperature: 6.9 },
        { month: 'Feb', city: 'London', temperature: 4.2 },
        { month: 'Mar', city: 'Tokyo', temperature: 9.5 },
        { month: 'Mar', city: 'London', temperature: 5.7 },
        { month: 'Apr', city: 'Tokyo', temperature: 14.5 },
        { month: 'Apr', city: 'London', temperature: 8.5 },
        { month: 'May', city: 'Tokyo', temperature: 18.4 },
        { month: 'May', city: 'London', temperature: 11.9 },
        { month: 'Jun', city: 'Tokyo', temperature: 21.5 },
        { month: 'Jun', city: 'London', temperature: 15.2 },
        { month: 'Jul', city: 'Tokyo', temperature: 25.2 },
        { month: 'Jul', city: 'London', temperature: 17 },
        { month: 'Aug', city: 'Tokyo', temperature: 26.5 },
        { month: 'Aug', city: 'London', temperature: 16.6 },
        { month: 'Sep', city: 'Tokyo', temperature: 23.3 },
        { month: 'Sep', city: 'London', temperature: 14.2 },
        { month: 'Oct', city: 'Tokyo', temperature: 18.3 },
        { month: 'Oct', city: 'London', temperature: 10.3 },
        { month: 'Nov', city: 'Tokyo', temperature: 13.9 },
        { month: 'Nov', city: 'London', temperature: 6.6 },
        { month: 'Dec', city: 'Tokyo', temperature: 9.6 },
        { month: 'Dec', city: 'London', temperature: 4.8 }
      ];
      
      const chart = new G2.Chart({
        container: 'c2',
        forceFit: true,
        height: 500
      });
      chart.source(data, {
        month: {
          range: [ 0, 1 ]
        }
      });
      chart.tooltip({
        crosshairs: {
          type: 'line'
        }
      });
      chart.axis('temperature', {
        label: {
          formatter: val => {
            return val + '°C';
          }
        }
      });
      chart.line().position('month*temperature').color('city');
      chart.point().position('month*temperature').color('city')
        .size(4)
        .shape('circle')
        .style({
          stroke: '#fff',
          lineWidth: 1
        });
      chart.render();
}
function Line3(){
    const data = [
        { month: 'Jan', key: 'series1', value: 125 },
        { month: 'Jan', key: 'series2', value: 51 },
        { month: 'Feb', key: 'series1', value: 132 },
        { month: 'Feb', key: 'series2', value: 91 },
        { month: 'Mar', key: 'series1', value: 141 },
        { month: 'Mar', key: 'series2', value: 34 },
        { month: 'Apr', key: 'series1', value: 158 },
        { month: 'Apr', key: 'series2', value: 47 },
        { month: 'May', key: 'series1', value: 133 },
        { month: 'May', key: 'series2', value: 63 },
        { month: 'June', key: 'series1', value: 143 },
        { month: 'June', key: 'series2', value: 58 },
        { month: 'July', key: 'series1', value: 176 },
        { month: 'July', key: 'series2', value: 56 },
        { month: 'Aug', key: 'series1', value: 194 },
        { month: 'Aug', key: 'series2', value: 77 },
        { month: 'Sep', key: 'series1', value: 115 },
        { month: 'Sep', key: 'series2', value: 99 },
        { month: 'Oct', key: 'series1', value: 134 },
        { month: 'Oct', key: 'series2', value: 106 },
        { month: 'Nov', key: 'series1', value: 110 },
        { month: 'Nov', key: 'series2', value: 88 },
        { month: 'Dec', key: 'series1', value: 91 },
        { month: 'Dec', key: 'series2', value: 56 }];
      
      const chart = new G2.Chart({
        container: 'c3',
        forceFit: true,
        height: 500
      });
      chart.source(data, {
        month: {
          range: [ 0, 1 ]
        }
      });
      chart
        .line()
        .position('month*value')
        .shape('hv')
        .color('key');
      chart.render();
      
}