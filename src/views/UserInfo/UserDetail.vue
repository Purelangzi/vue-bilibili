<template>
    <div class="userDetail" v-if="userInfo">
        <div class="banner">
            <img src="@/assets/bannerTopImg.png">
        </div>
        <div class="Info1">
            <div class="userAvatar">
                <img :src="userInfo.user_img" v-if="userInfo?userInfo.user_img: false" >
                <img src="@/assets/defaultImg.jpg" v-else>
            </div>
            <div class="userEdit">
                <div>
                    <p>
                        <span>4</span>
                        <span class="userText">粉丝</span>
                    </p>
                    <span class="split"></span>
                    <p>
                        <span>509</span>
                        <span class="userText">关注</span>
                    </p>
                    <span class="split"></span>
                    <p>
                        <span>1</span>
                        <span class="userText">获赞</span>
                    </p>
                </div>
                <div @click="$router.push('/edit')">
                    <div class="userEditBtn">编辑资料</div>
                </div>
                
            </div>
        </div>
        <div class="Info2">
            <span>{{userInfo.name}}</span>
            <p v-if="userInfo.user_desc">{{userInfo.user_desc}}</p>
            <p v-else>这个人很神秘，什么都没有写</p>
        </div>
    </div>
</template>

<script>
    export default {
        props:['userInfo'],
        data() {
            return {
                show:false
            }
        }
    }
</script>

<style lang="less">
.userDetail{
    background-color: #fff;
    .banner{
        width: 100vw;
        height: 24vw;
        overflow: hidden;
        img{
            width: 100vw;
            height: 34.666vw;
        }
    }
    .Info1{
        display: flex;
        .userAvatar{
            padding: 0 3.333vw;
            margin-right: 5.556vw;
            img{
                margin-top: -1.6vw;
                width: 22.4vw;
                height: 22.4vw;
                border-radius: 11.2vw;
            }
        }
        .userEdit{
            flex: 1;
            font-size: 3.733vw;
            div:nth-child(1){
                display: flex;
                padding: 2.361vw 0 0 0.833vw;
                p{
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    color: #212121;
                    .userText{
                        font-size: 2.933vw;
                        color: #999;
                    }
                }
                .split{
                    margin: 1.944vw -2.639vw 0;
                    width: 1px;
                    height: 4.266vw;
                    background-color: #e7e7e7;
                }
            }
            div:nth-child(2) {
                padding: 0.556vw 3.056vw;
                .userEditBtn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1.389vw;
                    margin-left: 0.556vw;
                    margin-top: 2.778vw;
                    border: 1px solid #F87299;
                    color: #F87299;
                    border-radius: 1.111vw;
                }
            }
            
        }
    }
    .Info2{
        padding: 3.333vw;
        span{
            margin: 2.778vw 0 0.833vw 0;
            font-size: 4.8vw;
        }
        p{
            font-size: 3.333vw;
            padding: 0;
            margin: 2.778vw 0 0 0;
            color: #999;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>