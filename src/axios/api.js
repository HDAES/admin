
let serverUrl = ''

if(process.env.NODE_ENV === 'development'){
    serverUrl = 'http://127.0.0.1:3001'
}else{
    serverUrl = 'https://blog.xl686.com'
}

export default {
    serverUrl,
    Login: serverUrl+'/api/login',// 登录
    getRole: serverUrl+'/api/user/getrole',// 获取角色列表
    addRole: serverUrl+'/api/user/addrole',// 添加角色
    delRole: serverUrl+'/api/user/delrole',    // 删除角色
    getRoleMenus: serverUrl+'/api/user/getrolemenus',   // 获取角色的权限列表
    updataRoleMenus: serverUrl+'/api/user/updatarolemenus',    // 更新角色的权限列表
    updataPassWord: serverUrl+'/api/user/updatapassword',       // 修改密码
    addMenus: serverUrl+'/api/manager/addmenus', // 添加菜单
    delMenus: serverUrl+'/api/manager/delmenus', //删除菜单
    uploads: serverUrl+'/api/common/uploads',//上传图片
    getsection : serverUrl+'/api/manager/section',//获取博客分类
    updateSection:serverUrl+'/api/manager/updatasection',   //更新博客分类
    getTags:  serverUrl+'/api/manager/tags', //获取博客标签
    deltags: serverUrl+'/api/manager/deltags', //删除二级标签
    updatetag:serverUrl+'/api/manager/updatetag', //修改二级标签
    addtag:serverUrl+'/api/manager/addtag', //修改二级标签
    getArticleDetails :serverUrl+'/api/manager/getarticledetails', //获取文章详情列表
    updateArticleDetails: serverUrl+'/api/manager/updatearticledetails', //修改文章详情
    addArticleDetails: serverUrl+'/api/manager/addarticledetails', //修改文章详情
    getArticle:serverUrl+'/api/manager/getarticle' , //获取文章
    addUpdateArticle: serverUrl+'/api/manager/addupdatearticle', //修改或添加文章
    getMusicList: serverUrl+'/api/manager/getmusiclist',    //获取音乐列表
    addMusic:serverUrl+'/api/manager/addmusic',    //添加音乐
    delMusic:serverUrl+'/api/manager/delmusic',    //删除音乐

    // commom 公共方法
    upload:'http://blog.xl686.com/api/common/uploads',
    //搜索方法
    searchMusic:'http://music.xl686.com/search'
}