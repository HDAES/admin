import React,{ useState} from 'react';
import { Upload, Icon, Modal, message } from 'antd';
import api from '../../../axios/api'

export default () =>{
    const [fileList,setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
    ])
    const [previewImage,setPreviewImage] = useState()
    const [previewVisible,setPreviewVisible] = useState(false)


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
    
    function handleChange({fileList }){
        console.log(fileList)
        setFileList(fileList)
       
    }
    const uploadConfig = {
        action:api.uploads,
        listType:"picture-card",
        className:"avatar-uploader",
        fileList:fileList,
        headers:{
            "Authorization" : localStorage.getItem('AS_MALL_ACCESS_TOKEN')
        },
        onChange:(info )=>handleChange(info ),
        beforeUpload
        
    }

    return (
        <div className="clearfix">
            <Upload
                {...uploadConfig}
            >
            {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
    )
}

const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }