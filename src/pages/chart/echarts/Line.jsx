import React, { useEffect } from 'react';
import { Card } from 'antd';
//按需导入
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import echartTheme from './echartTheme'
import ReactEcharts from 'echarts-for-react'

export default () => {
    useEffect( () =>{
        echarts.registerTheme('theme',echartTheme)
    }) 
    return (
        <div>
                <Card title="折线图表之一">
                    <ReactEcharts 
                        option={getOption()}
                        theme='theme'
                        style={{height:500}}
                    />
                </Card>
                <Card title="折线图表之二" style={{marginTop:10}}>
                    <ReactEcharts 
                        option={getOption2()}
                        theme='theme'
                        style={{height:500}}
                    />
                </Card>
                <Card title="折线图表之三" style={{marginTop:10}}>
                    <ReactEcharts 
                        option={getOption3()}
                        theme='theme'
                        style={{height:500}}
                    />
                </Card>
            </div>
    )
}


function getOption (){
    let option = {
        title:{
            text:'用户骑行订单',
            x:'center',
        },
        tooltip:{
            trigger:'axis'
        },
        xAxis:{
            data:['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis:{
            type:'value'
        },
        series:[{
            name:'订单量',
            type:'line',
            data:[1000,2000,2800,4000,4500,3000,2000]
        }]
    }
    return option
}
function getOption2 (){
    let option = {
        title:{
            text:'用户骑行订单'
        },
        tooltip:{
            trigger:'axis'
        },
        legend:{
          data:['ofo订单量','膜拜订单量']  
        },
        xAxis:{
            data:['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis:{
            type:'value'
        },
        series:[{
            name:'ofo订单量',
            type:'line',
            data:[1000,2000,2800,4000,4500,3000,2000]
        },
        {
            name:'膜拜订单量',
            type:'line',
            data:[1200,1040,3000,4000,3500,3000,2000]
        }]
    }
    return option
}
function getOption3 (){
    let option = {
        title:{
            text:'用户骑行订单',
            x:'center',
        },
        tooltip:{
            trigger:'axis'
        },
        xAxis:{
            data:['周一','周二','周三','周四','周五','周六','周日'],
            type: 'category',
            boundaryGap: false
        },
        yAxis:{
            type:'value'
        },
        series:[{
            name:'订单量',
            type:'line',
            data:[1000,2000,2800,4000,4500,3000,2000],
            areaStyle: {}
        }]
    }
    return option
}