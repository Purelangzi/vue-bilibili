<template>
    <div class="reply" v-if="commentChildren">
        <div class="commentItem" v-for="(item,index) in commentChildren" :key="index">
            <div class="userImg">
                <img :src="item.userinfo.user_img" v-if="item.userinfo && item.userinfo.user_img" >
                <img src="@/assets/defaultImg.jpg" v-else >
                <p>
                    <span class="userName" v-if="item.userinfo">{{item.userinfo.name}}</span>
                    <span class="userName" v-else>神秘人</span>
                    <span class="time" v-if="item.comment_date">{{item.comment_date}}</span>
                    <span class="time" v-else>神秘时间</span>
                </p>

            </div>
            <div class="detail" >
                <div class="content" v-if="item.comment_content">
                    <div v-if="!replyName">
                        {{item.comment_content}}<span class="commentReply" @click="commentReplyClick(item.comment_id)">+回复</span>
                    </div>
                    <div v-else>
                        回复 <span style="color:#f87299;">@{{item.parent_user_info.name}}</span>：{{item.comment_content}}
                        <span class="commentReply" @click="commentReplyClick(item.comment_id)">+回复</span>
                    </div>
                </div>
                <div class="content" v-else>
                    该用户评论内容竟然没有
                </div>
            </div>
            <div class="commentChildren">
                <commentChildrenItem @replyCommentChild="replyCommentChild" :commentChildren="item.children" :replyName="true"></commentChildrenItem>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'commentChildrenItem',
        props:['commentChildren','replyName'],
        methods: {
            // 传递二级评论id
            commentReplyClick(id){
                // 传递多级评论给二级评论
                this.$emit('replyCommentChild',id)
                // 传递二级评论id给一级评论
                this.$emit('publishReplyComment',id)
            },
            replyCommentChild(id){
                // 二级之后的多级评论都调用二级评论传递一级评论的方法
                this.commentReplyClick(id)
                // 传递多级评论id给一级评论
                this.$emit('publishReplyComment',id)
            }
        }
    }
</script>

<style lang="less">
.reply {
    padding-left: 10.278vw;
    .commentChildren .reply {
        padding-left: 0;
        .commentItem {
            padding: 0;
            .commentReply{
                right: 0.812vw;
            }
        }
    }
    .commentItem {
        flex-direction: column;
        .userImg{
            display: flex;
            p{
                display: flex;
                margin-left: 4vw;
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
        }
        .detail{
            margin-left: 12vw !important;
            margin-bottom: 4vw !important;
            .commentReply{
                position: absolute;
                right: 3.867vw;
                top: 7.222vw;
                color: #f87299;
                font-size: 3.333vw;
            }
        }
        
        
        
    }
    
}
</style>