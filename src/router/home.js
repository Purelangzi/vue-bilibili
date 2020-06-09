export default {
    name:'home',
    path:'/home',
    meta:{
        keepAlive:true
    },
    component:()=>import('@/views/Home/Home')
}