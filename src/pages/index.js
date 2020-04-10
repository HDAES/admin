import React from 'react';
import CountTo from 'react-count-to';
import { Card, Icon } from 'antd';

export default () => {
   
    return (
        <div className="index">
            <CountGrounp/>
            
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
                    <Icon className="card-icon" type="message" />
                    <div>
                        <div className="card-name">Messages</div>
                        <CountTo className="card-count" to={81212} speed={1234} />
                    </div>
                    
                </div>
            </Card>
            <Card className="card card3" hoverable={true}>
                <div className="card-item">
                    <Icon className="card-icon" type="transaction" />
                    <div>
                        <div className="card-name">Purchases</div>
                        <CountTo className="card-count" to={9283} speed={1234} />
                    </div>
                    
                </div>
            </Card>
            <Card className="card card4" hoverable={true}>
                <div className="card-item">
                    <Icon className="card-icon" type="shopping-cart" />
                    <div>
                        <div className="card-name">Shoppings</div>
                        <CountTo className="card-count" to={14612} speed={1234} />
                    </div>
                    
                </div>
            </Card>
        </div>
    )
}