<template>
    <div class="comment">
        <van-loading size="10vw" v-if="!commentList" color="#f87299">加载中...</van-loading>
        <div v-if="commentList && commentList.length == 0">
            <img style="width:100%;" src="@/assets/notFound.png">
        </div>
        <div class="item" v-else v-for="(item,index) in commentList" :key="index">
            <div class="commentItem">
                <div class="userImg">
                    <img :src="item.userinfo.user_img" v-if="item.userinfo && item.userinfo.user_img" >
                    <img src="@/assets/defaultImg.jpg" v-else >
                </div>
                <div class="detail" >
                    <p>
                        <span class="userName" v-if="item.userinfo">{{item.userinfo.name}}</span>
                        <span class="userName" v-else>神秘人</span>
                        <span class="time" v-if="item.comment_date">{{item.comment_date}}</span>
                        <span class="time" v-else>神秘时间</span>
                    </p>
                    <div class="content" v-if="item.comment_content">
                        {{item.comment_content}}
                        <span class="pusblishReply" @click="publishClick(item.comment_id)">+回复</span>
                    </div>
                    <div class="content" v-else>
                        该用户评论内容竟然没有
                    </div>
                </div>
            </div>
            <Reply @publishReplyComment="publishClick" :commentChildren="item.children"></Reply>
        </div>
        <div class="end" v-if="commentList && commentList.length != 0">
            <p>...(*￣０￣)ノ再怎么找也没有啦</p>
        </div>
    </div>
</template>

<script>
import Reply from './Reply'
    export default {
        data() {
            return {
                commentList:null
            }
        },
        methods: {
            // 递归改造评论数据
            changeComentData(data){
                function fn(temp){
                    let arr1 = []
                    for (var i = 0; i <data.length; i++) {
                        if (data[i].parent_id == temp) {
                            arr1.push(data[i])
                            data[i].children = fn(data[i].comment_id)
                        }
                    }
                    return arr1
                }
                return fn(null)
            },
            // 把要回复的评论id传给父组件
            publishClick(id){
                this.$emit('publishClick',id)
            },
            // 请求评论数据
            async commentData(){
                const res = await this.$http.get('/comment/' + this.$route.params.id )
                setTimeout(() => {
                    this.commentList = res.data
                    this.commentList = this.changeComentData(this.commentList)    
                }, 500);
            }
        },
        created() {
            this.commentData()
        },
        watch: {
            $route(){
                this.commentData()
            }
        },
        components:{
            Reply
        }
    }
</script>

<style lang="less">
.van-loading{
    text-align: center;
}
.comment{
    .item{
        border-bottom: 1px solid #e7e7e7;
        .commentItem{
            padding: 3.2vw;
            display: flex;
            position: relative;
            .userImg{
                img{
                    width: 8vw;
                    height: 8vw;
                    border-radius: 4vw;
                }
            }
            .detail{
                margin-left: 4vw;
                font-size: 3.466vw;
                p{
                    display: flex;
                    font-size: 3.466vw;
                    flex-flow: column;
                    .userName{
                        color: #757575;
                    }
                    .time{
                        margin-top: 1.8666vw;
                        color: #999;
                        font-size: 3.2vw;
                    }
                }
                .content{
                    margin-top: 2.4vw;
                    color: #212121;
                    white-space: pre-line;
                    word-break: break-word;
                    .pusblishReply{
                        position: absolute;
                        right: 3.867vw;
                        top: 7.222vw;
                        color: #f87299;
                        font-size: 3.333vw;
                    }
                }
            }
        }
        .van-divider{
            margin: 0;
        }
    }
    
    .end{
        text-align: center;
        font-size: 3.333vw;
        color: #999;
        padding: 18.002px 0;
    }
}
    


</style>