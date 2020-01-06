import React, { useEffect } from 'react';
import G2 from '@antv/g2';
import { Card } from 'antd';
import json from './RelationData'
import DataSet from '@antv/data-set';
export default () => {
    useEffect( () =>{
       
        Radar(json)
    })
    return (
        <>
            <Card title="雷达图">
                <div id="c11"></div>
            </Card>
        </>
    )
}

function Radar(data){
    const ds = new DataSet();
    const dv = ds.createView().source(data, {
      type: 'graph',
      edges: d => d.links
    });
    dv.transform({
      type: 'diagram.arc',
      marginRatio: 0.5
    });

    const chart = new G2.Chart({
      container: 'c11',
      forceFit: true,
      height: 500
    });
    chart.legend(false);
    chart.tooltip({
      showTitle: false
    });

    const edgeView = chart.view();
    edgeView.source(dv.edges);
    edgeView.axis(false);
    edgeView.edge()
      .position('x*y')
      .shape('arc')
      .color('source')
      .opacity(0.5)
      .tooltip('source*target');

    const nodeView = chart.view();
    nodeView.source(dv.nodes);
    nodeView.axis(false);
    nodeView.point()
      .position('x*y')
      .shape('circle')
      .size('value')
      .color('id')
      .opacity(0.5)
      .style({
        stroke: 'grey'
      })
      .label('name', { // label configuration for non-polar coord
        offset: -10,
        textStyle: {
          textAlign: 'left',
          rotate: 90
        }
      });

    chart.render();
}
