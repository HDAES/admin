import api from './api'
import axios from './index'
//删除标签
export async function deleteTag(sid){
    return axios({
        method:'POST',
        url:api.deltags,
        data:{sid}
    })   
}
// 修改标签
export async function updateTag(newTag){
    return axios({
        method:'POST',
        url:api.updatetag,
        data:newTag
    })
}
// 添加标签
export async function add(newTag){
    return axios({
        method:'POST',
        url:api.addtag,
        data:newTag
    })
}
// 获取文章详情
export function getArticleList(){
    return axios({
        url:api.getArticleDetails
    }) 
}

// 修改文章详情
export function updateArticle(newArticle){
    console.log(newArticle)
    return axios({
        method:'POST',
        url:api.updateArticleDetails,
        data:newArticle
    })
}

//添加文章详情
export function addArticle(newArticle){
    return axios({
        method:'POST',
        url:api.addArticleDetails,
        data:newArticle
    })
}

//获取文章
export function getArticle(id){
    return axios({
        method:'POST',
        url:api.getArticle,
        data:id
    })
}
//修改或添加文章
export function addUpdateArticle(options){
    return axios({
        method:'POST',
        url:api.addUpdateArticle,
        data:options
    })
}
//获取音乐类别
export function getMusicList(){
    return axios({
        method:'GET',
        url:api.getMusicList
    })
}
//添加音乐
export function addMusicAxios(options){
    return axios({
        method:'POST',
        url:api.addMusic,
        data:options
    })
}

export function delMusicAxios(options){
    return axios({
        method:'POST',
        url:api.delMusic,
        data:options
    })
}