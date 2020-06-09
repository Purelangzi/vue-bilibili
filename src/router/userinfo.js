export default {
    name: 'userinfo',
    path: '/userinfo',
    // 设置meta字段
    meta:{
        //  是否需要权限
        isToken:true
    },
    component: () => import('@/views/UserInfo/UserInfo')
}