<template>
    <div class="commentTitle">
        <div class="userInfo" v-if="myInfo">
            <img :src="myInfo.user_img" v-if="myInfo.user_img">
            <img src="@/assets/defaultImg.jpg" v-else>
            <input type="text" autofocus ref="inputFocus" placeholder="说点什么吧" maxlength="1000" v-model="commentContent">
            <van-button @click="sendMyComment" color="#f78299" size="small">发表</van-button>
        </div>
        <div class="userInfo" v-else>
            <img src="@/assets/defaultImg.jpg">
            <input type="text" autofocus placeholder="说点什么吧" maxlength="1000" v-model="commentContent">
            <van-button @click="sendMyComment" color="#f78299" size="small">发表</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        props:['myInfo'],
        data() {
            return {
                commentContent:null
            }
        },
        methods: {
            // 发送我的评论
            sendMyComment(){
                // 用户未登录
                if (!localStorage.getItem('token') && !localStorage.getItem('id')) {
                    this.$msg.fail('登录后才能发表评论哦')
                    if (this.commentContent) {
                        this.commentContent = null
                    }
                    return
                }
                //用户已登录，判断评论是否有内容
                if (this.commentContent) {
                    // 去首尾空格
                    this.commentContent=this.commentContent.trim()
                    // 检查评论长度
                    if (this.commentContent.length==1000) {
                        this.$msg.fail('你的评论太长了！')
                        return
                    }
                    if(!this.commentContent){
                        this.$msg.fail('评论内容不能为空！')
                        return
                    }
                    //向父组件发送自定义事件
                    this.$emit('sendComment',this.commentContent)
                    this.commentContent = null
                    
                }else{
                    this.$msg.fail('评论内容不能为空！')
                }
                
            },
            // 获取输入框然后聚焦
            focusInput(){
                this.$refs.inputFocus.focus()
            }
        }
    }
</script>

<style lang="less">
.commentTitle{
    padding: 5.556vw 2.778vw;
    .userInfo{
        display: flex;
        img{
            width: 8vw;
            height: 8vw;
            border-radius: 4vw;
        }
        input{
            margin-left: 2.778vw;
            margin-right: 5.556vw;
            padding: 0 20px;
            background-color: #f4f4f4;
            border-radius: 4.167vw;
            font-size: 3.333vw;
            
        }
        .van-button--small{
            height: 8.333vw;
            font-size: 3.333vw;
        }
        
        
    }
    
}
</style>