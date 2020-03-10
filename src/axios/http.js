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
