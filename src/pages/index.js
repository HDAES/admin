import React, { useState } from 'react';
import CountTo from 'react-count-to';
import { Card, Icon, Table,Tag,Switch ,Avatar ,Skeleton } from 'antd';
const { Meta } = Card;
export default () => {
   
    return (
        <div className="index">
            <CountGrounp/>
            <Scontainer/>
        </div>
    )
}

function CountGrounp(){
    return (
        <div className="count-grounp">
            <Card className="card card1" hoverable={true}>
                <div className="card-item">
                    <div className="icon-containr1">
                        <Icon className="card-icon" type="usergroup-delete"/>
                    </div>
                    <div>
                        <div className="card-name">New Visits</div>
                        <CountTo className="card-count" to={104685} speed={1234} />
                    </div>
                    
                </div>
            </Card>
            <Card className="card card2" hoverable={true}>
                <div className="card-item">
                    <div className="icon-containr2">
                        <Icon className="card-icon" type="message" />
                    </div>
                    <div>
                        <div className="card-name">Messages</div>
                        <CountTo className="card-count" to={81212} speed={1234} />
                    </div>
                    
                </div>
            </Card>
            <Card className="card card3" hoverable={true}>
                <div className="card-item">
                    <div className="icon-containr3">
                    <Icon className="card-icon" type="transaction" />
                    </div>
                    <div>
                        <div className="card-name">Purchases</div>
                        <CountTo className="card-count" to={9283} speed={1234} />
                    </div>
                    
                </div>
            </Card>
            <Card className="card card4" hoverable={true}>
                <div className="card-item">
                    <div className="icon-containr4">
                    <Icon className="card-icon" type="shopping-cart" />
                    </div>
                    <div>
                        <div className="card-name">Shoppings</div>
                        <CountTo className="card-count" to={14612} speed={1234} />
                    </div>
                    
                </div>
            </Card>
        </div>
    )
}

function Scontainer(){

    const  [loading,setLoading] = useState(true)
    const columns  =[{
        title: 'Order_No',
        dataIndex: 'id',
    },{
        title: 'Price',
        dataIndex: 'price',
        width:120
    },{
        title: 'Status',
        dataIndex: 'status',
        width:120,
        render:(e)=>{
        return  e===0?<Tag color="red">penging</Tag>:<Tag color="green">success</Tag>
        }
    }]
    const dataSource = [
        {
          key: '1',
          id:'fde5D1BF-cfEe-4CbE-E063-Ac8a6c',
          price: '¥1,576.7',
          status: 0,
        },{
            key: '2',
            id:'50596739-91Ac-e9Be-CE50-2BDc47',
            price: '¥4,085.2',
            status: 0,
          },{
            key: '3',
            id:'4F2A35A9-1D79-ADec-EC5c-F8dfdd',
            price: '¥7,280.2',
            status: 1,
          },{
            key: '4',
            id:'23DBCF3d-05Dd-b75d-3bDB-4A74D7',
            price: '¥9,830.7',
            status: 1,
          },{
            key: '5',
            id:'eCfCCfB7-F72E-CDdB-6AFe-df7dd2',
            price: '¥7,637.4',
            status: 0,
          },
        
      ];
    return(
        <div className="Scontainer">

            <Card className="table">
                <Table columns={columns} dataSource={dataSource} pagination={false}/>
            </Card>

            <Card className="todo">
                <Switch checked={!loading} onChange={()=>setLoading(!loading)} />
                <Card 
                 style={{ marginTop: 30 }}
                 actions={[
                   <Icon type="setting" key="setting" />,
                   <Icon type="edit" key="edit" />,
                   <Icon type="ellipsis" key="ellipsis" />,
                 ]}
                >
                    <Skeleton loading={loading} avatar active>
                        <Meta
                        avatar={
                            <Avatar src="http://qiniu.xl686.com/avatar.png?v=0512" />
                        }
                        title="Hades"
                        description="Welcome to my admin management system"
                        />
                    </Skeleton>
                </Card>
            </Card>
        </div>
    )
}