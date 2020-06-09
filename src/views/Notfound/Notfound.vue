<template>
    <div>
        <NavBar></NavBar>
        <div class="notfound">
            <div class="nothing">
                <img src="@/assets/404_2.png">
            </div>
            <div class="dec">
                <p>您访问的页面不见了/(ToT)/~~</p>
                <p>尝试去客户端继续探索</p>
            </div>
            <div class="downclient">
                <van-button color="#fb7299" size="large">下载客户端</van-button>
            </div>
        </div> 
    </div>
</template>

<script>
    import NavBar from '@/components/NavBar'
    export default {
        components:{
            NavBar
        }
    }
</script>

<style lang="less">
.notfound{
    width: 100%;
    padding-top: 11.111vw;
    padding-bottom: 12.5vw;
    .nothing{
        margin: 0 auto;
        width: 41.667vw;
        img{
            display: block;
            width: 100%;
        }
    }
    .dec{
        margin-top: 8.333vw;
        p{
            color: #999;
            font-size: 3.333vw;
            line-height: 4.722vw;
            text-align: center;
        }
    }
    .downclient{
        margin: 7.5vw auto 0;
        width: 58.333vw;
        .van-button{
            height: 10vw;
            font-size: 3.889vw;
            border-radius: 1.389vw;
        }
        
    }
}
</style>