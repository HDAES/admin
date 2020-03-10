import axios from 'axios'
import { Modal, message } from 'antd'

const TOKEN_KEY = 'AS_MALL_ACCESS_TOKEN';



export default (options) =>{
        return new Promise( (resolve,reject) =>{
            axios({
                url:options.url,
                method:options.method,
                timeout:5000,
                data:options.data,
                params:(options.data && options.data.params) || '',
                headers:{
                    "Authorization": localStorage.getItem(TOKEN_KEY)
                }
            }).then( (response) =>{
                if(response.status === 200){
                    let res = response.data
                    if(res.code === 200){
                        resolve(res.data)
                    }else{
                        reject(res)
                        message.error(JSON.stringify(res.message))
                    }
                }
            }).catch( err =>{
                console.log(err)
                Modal.warn({
                    title:'提示',
                    content:err.message
                })
            })
        })
    }
