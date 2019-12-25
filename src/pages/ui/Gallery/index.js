import React,{ useState, useEffect } from 'react';
import { Card, Row, Col, Modal } from 'antd';
let imgSrcPrefix = 'https://qiniu.xl686.com/20191223_admin_gallery_'

export default () =>{
   
    const [imgList,setImgList] = useState([])
    const [visible,setVisible] = useState(false)
    const [imgUrl,setImgUrl] = useState('')
    useEffect( ()=>{
        let list = []
        for(let i = 0; i<5; i++){
            list[i] = []
            for(let j = 0; j<5; j++){
                list[i][j] = <Card key={i-j} onClick={() => handleClick(i,j)}  style={{marginBottom:10}}  cover={<img src={imgSrcPrefix+i+j+'.png?v='+Date.parse(new  Date())} alt="React"/>}>
                       <Card.Meta title="React Admin" description="I'm HADES"/>
                </Card>
            }
        }
        setImgList(list)

    },[])
    function handleClick(i,j){
        setVisible(true)
        console.log(i)
        setImgUrl(imgSrcPrefix+i+j+'.png?v='+Date.parse(new  Date()))
    }
    return(
        <div className="gallery-card">
            <Row gutter={5}>
                <Col md={5}>{imgList[0]}</Col>
                <Col md={5}>{imgList[1]} </Col>
                <Col md={5}>{imgList[2]}</Col>
                <Col md={5}>{imgList[3]}</Col>
                <Col md={4}>{imgList[4]}</Col>
            </Row>
            <Modal
                width={300}
                height={500}
                title="Basic Modal"
                footer={null}
                visible={visible}
                onOk={() =>setVisible(false)}
                onCancel={() =>setVisible(false)}
                >
                <img src={imgUrl} alt="" style={{width:'100%'}}/>
            </Modal>
        </div>
    )
}