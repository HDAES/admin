import React, { useState } from 'react';
import { Card, Tabs, Icon, Upload, message } from 'antd';
import PictureCard from './pictureCard'
//import axios from '../../axios'
import api from '../../axios/api'
import '../common.less'
const { TabPane } = Tabs;
export default () => {
    const [imageUrl,setImageUrl] = useState()
    const [loading,setLoading] = useState(false)
    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    function handleChange(info){
        console.log(info)
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>{
                    setImageUrl(imageUrl)
                    setLoading(false)
                }
            );

            console.log()
          }
    }
    const uploadConfig = {
        action:api.uploads,
        listType:"picture-card",
        className:"avatar-uploader",
        showUploadList:false,
        headers:{
            "Authorization" : localStorage.getItem('AS_MALL_ACCESS_TOKEN')
        },
        onChange:(info )=>handleChange(info ),
        beforeUpload
    }
    const uploadButton = (
        <div className="uploads-contarn">
          <Icon type={loading ? 'loading' : 'plus'}  style={{fontSize:32}}/>
          <div className="ant-upload-text">Upload</div>
        </div>
      )
    return(
        <Card title="上传图片">
            <Tabs defaultActiveKey="1">
                <TabPane tab="单张" key="1">
                    <Upload 
                        {...uploadConfig}
                    >
                       {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>

                    <PictureCard />
                </TabPane>
                <TabPane tab="多张" key="2">
                Content of Tab Pane 2
                </TabPane>
            </Tabs>
        </Card>
    )
}



function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }