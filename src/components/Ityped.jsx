import React, { useEffect } from 'react';
import { Card } from 'antd'
import { init } from 'ityped'

export default ({text}) => {
    
    useEffect( () =>{
        const strings = new Array(text)
        const myElement = document.querySelector('#des')
        init(myElement, { 
            strings,
            disableBackTyping:true,
            showCursor: false, 
        })
    },[text]) 
 
    return ( 
        <Card title="何时使用" hoverable={true} style={{flexBasis: '100%',marginBottom:20,backgroundColor:'#FFFFFF'}}>
            <div id="des" style={{height:30}}></div>
        </Card>
        )
    
}
 
