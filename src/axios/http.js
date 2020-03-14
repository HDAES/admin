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
//删除音乐
export function delMusicAxios(options){
    return axios({
        method:'POST',
        url:api.delMusic,
        data:options
    })
}
//顶置音乐
export function overheadMusicAxios(options){
    return axios({
        method:'POST',
        url:api.overheadMusic,
        data:options
    }) 
}
// 获取名言
export function getSayingAxios(){
    return axios({
        method:'GET',
        url:api.getSaying
    }) 
}
//删除名言
export function delSayingAxios(options){
    return axios({
        method:'POST',
        url:api.delSaying,
        data:options
    }) 
}
//编辑名言
export function updateSayingAxios(options){
    return axios({
        method:'POST',
        url:api.updateSaying,
        data:options
    }) 
}
//新增名言
export function addSayingAxios(options){
    return axios({
        method:'POST',
        url:api.addSaying,
        data:options
    }) 
}
//获取友链列表
export function getLinkAxios(){
    return axios({
        method:'GET',
        url:api.getLink
    }) 
}
//顶置
export function overheadLinkAxios(options){
    return axios({
        method:'POST',
        url:api.overheadLink,
        data:options
    }) 
}
//通过申请
export function passLinkAxios(options){
    return axios({
        method:'POST',
        url:api.passLink,
        data:options
    })
}