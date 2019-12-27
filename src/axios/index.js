import axios from 'axios'
import { Modal } from 'antd'

export default (options) =>{
        let baseUrl = 'http://127.0.0.1:3001'

        return new Promise( (resolve,reject) =>{
            axios({
                url:options.url,
                method:options.method,
                baseURL:baseUrl,
                timeout:5000,
                params:(options.data && options.data.params) || ''
            }).then( (response) =>{
                if(response.status === 200){
                    let res = response.data
                    if(res.code === 200){
                        resolve(res.data)
                    }else{
                        reject(res)
                        Modal.info({
                            title:'提示',
                            content:JSON.stringify(res.message) 
                        })
                    }
                }
            }).catch( err =>{
                Modal.warn({
                    title:'提示',
                    content:err.message
                })
            })
        })
    }
