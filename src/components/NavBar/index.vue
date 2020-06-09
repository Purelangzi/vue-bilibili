<template>
    <div class="navbar">
        <div class="logo" @click="$router.push('/')">
            <i class="iconfont icon-bilibili"></i>
        </div>
        <div>
            <p>
                <van-icon class="inp-icon" name="search" />
                <span>请输入搜索内容</span>
            </p>
        </div>
        <div>
            <div @click="$router.push('/userinfo')">
                <img :src="userInfo.user_img" v-if="userInfo?userInfo.user_img: false" >
                <img src="@/assets/defaultImg.jpg" v-else>
            </div>
            <p>下载 App</p>
        </div>
    </div>
</template>

<script>
    export default {
        name:'navbar',
        props:['userInfo']
    }
</script>

<style lang="less">
.navbar{
    height: 11.733vw;
    background-color: #fff;
    display: flex;
    white-space: nowrap;
    .logo{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: -2.333vw;
        width: 30.833vw;
        i{
            color: #fb7299;
            font-size: 7.46667vw;
        }
    }
    div:nth-child(2){
        flex: 1;
        display: flex;
        align-items: center;
        p{
            position: relative;
            margin-left: -1.728vw;
            background-color: #f4f4f4;
            width: 35.556vw;
            height: 6.4vw;
            border-radius: 3.2vw;
            color: #999;
            .inp-icon{
                position: absolute;
                left: 8%;
                top: 27%;
                font-size: 3.333vw;
            }
            span{
                position: absolute;
                top: 50%;
                left: 20%;
                transform: translate(0,-50%);
                font-size: 2.678vw;
            }
        }
    }
    div:nth-child(3){
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            width: 6.667vw;
            height: 6.667vw;
            border-radius: 50%;
        }
        p{
            box-sizing: border-box;
            padding: 0.933vw 3.2vw;
            margin:  0 3.222vw;
            color: #fff;
            background-color: #FB7299;
            font-size: 3.499vw;
            border-radius: 0.833vw;
            height: 6.4vw;
            width: 21.222vw;
        }
    }
}
</style>