import axios from 'axios'
import router from './src/router'
import Vue from 'vue'
// 使用自定义配置创建axios实例
const http = axios.create({
    // 基础地址 http://112.74.99.5:3000/web/api
    baseURL: 'http://112.74.99.5:3000/web/api'
})

// 添加一个请求拦截器
http.interceptors.request.use(function (config) {
    // 在请求发送之前判断本地存储是否有token和id
    if (localStorage.getItem('token') && localStorage.getItem('id')) {
        //配置请求头
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
    }
    return config;
}, function (error) {
    // 请求错误怎么办
    return Promise.reject(error);
});

// 添加一个响应拦截器
http.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    // 判断响应错误对象的状态码是否401或402
    if (error.response.status == 401 || error.response.status == 402) {
        // 提示用户登录
        router.push('/login')
        Vue.prototype.$msg.fail(error.response.data.message)
    }
    return Promise.reject(error);
});

export default http