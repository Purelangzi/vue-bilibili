<template>
    <div class="detail" v-if="details">
        <NavBar :userInfo="userInfo"></NavBar>
        <div class="detailInfo">
            <div class="video">
                <video :src="details.content" preload controls :poster="details.img"></video>
            </div>
            <div class="rouseApp">
                <van-button type="primary" color="#fb7299">App 内打开，流畅又高清</van-button>
                <span class="place"><i class="iconfont icon-CN_bilibiliB"></i>{{details.category.title}}</span>
            </div>
            <VideoInfo :details="details"></VideoInfo>
        </div>
        <div class="toolbar">
            <span class="toolbarItem">
                <i class="iconfont icon-dianzan"></i><span>点赞</span>
            </span>
            <span :class="{toolbarItem:true,activeColor:isCollect}" @click="collectClick">
                <i class="iconfont icon-Star"></i><span>收藏</span>
            </span>
            <span class="toolbarItem">
                <i class="iconfont icon-xiazai"></i><span>缓存</span>
            </span>
            <span :class="{toolbarItem:true,activeColor:isAttent}" @click="attentClick">
                <i class="iconfont icon-guanzhu1" style="font-size:4.444vw"></i><span>关注</span>
            </span>
            <span class="toolbarItem">
                <i class="iconfont icon-arrow-" @click="showShare = true"></i><span>分享</span>
            </span>
        </div>
        <van-share-sheet
          v-model="showShare"
          title="立即分享给好友"
          :options="options"
          @select="onSelect"
        />
        <van-tabs animated title-active-color="#f87299" color="#f87299">
          <van-tab title="相关推荐">
                <div class="detailparent">
                    <van-loading size="10vw" v-if="!commendList" color="#f87299">加载中...</van-loading>
                    <Cover v-else class="detailitem"
                        v-for="(item,index) in commendList" 
                        :detailitem="item" 
                        :key="index"
                    ></Cover>
                </div>
          </van-tab>
          <van-tab v-if="commmentLength"  :title="'评论（'+ commmentLength +'）'">
              <CommentTitle @sendComment="sendComment" ref="commentFocus" :myInfo="userInfo"></CommentTitle>
              <Comment @publishClick="publishClick" ref="reload"></Comment>
          </van-tab>
          <van-tab v-else title="评论">
                <CommentTitle @sendComment="sendComment" ref="commentFocus" :myInfo="userInfo"></CommentTitle>
                <Comment @publishClick="publishClick" ref="reload"></Comment>
          </van-tab>
        </van-tabs>
        <BackTop distance="700"></BackTop>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar"
import Cover from '@/components/Cover'
import VideoInfo from './VideoInfo'
import CommentTitle from './CommentTitle'
import Comment from './Comment'
import BackTop from '@/components/BackTop'
    export default {
        data() {
            return {
                details:null,
                showShare: false,
                commendList:null,
                userInfo:null,
                commmentLength:null,
                comment:null,
                isCollect:null,
                isAttent:null,
                sendCommentData:{
                    comment_content:'',
                    comment_date:null,
                    parent_id:null,
                    article_id:null
                },
                options: [
                    [
                      { name: '微信', icon: 'wechat' },
                      { name: '微博', icon: 'weibo' },
                      { name: 'QQ', icon: 'qq' },
                    ],
                    [
                      { name: '复制链接', icon: 'link' },
                      { name: '分享海报', icon: 'poster' },
                      { name: '二维码', icon: 'qrcode' },
                    ]
                ]
            }
        },
        components:{
            NavBar,
            VideoInfo,
            Cover,
            CommentTitle,
            Comment,
            BackTop
        },
        methods: {
            // 请求获取视频详情数据
            async detailitemData(){
                const res = await this.$http.get('/article/'+ this.$route.params.id)
                this.details = res.data[0]
                if(this.details){
                    this.attention()
                }
            },
            // 点击分享
            onSelect(option) {  
                this.$msg.success(option.name + '分享成功（开个玩笑hh）') 
                this.showShare = false
            },
            //获取推荐视频数据
            async commendData(){
                const res = await this.$http.get('/commend')
                setTimeout(() => {
                    this.commendList = res.data
                }, 500);
            },
            // 获取用户数据
            async myUserInfo(){
                const res = await this.$http.get("/user/" + localStorage.getItem("id"));
                this.userInfo = res.data[0]      
            },
            // 请求评论数据
            async commentData(){
                const res = await this.$http.get('/comment/' + this.$route.params.id )
                this.commmentLength = res.data.length
            },
            // 请求发表评论
            async sendComment(data){
                console.log('父组件接收到了发送的评论');
                const date = new Date()
                let month = date.getMonth() + 1
                let day = date.getDate()
                if (month<10) {
                    month = '0' + month 
                }
                if(day<10){
                    day = '0' + day 
                }
                let nowDate = `${month}-${day}`
                this.sendCommentData.comment_content = data
                this.sendCommentData.comment_date = nowDate
                this.sendCommentData.article_id = this.$route.params.id
                const sendResult = await this.$http.post('/comment_post/' + localStorage.getItem('id'),this.sendCommentData)
                // 评论长度加一，不可能一次评论回复多人的而造成评论条数加n
                this.commmentLength += 1
                // 通过ref链调用子组件请求评论数据的方法，实现无刷新更新数据
                this.$refs.reload.commentData()
                // 重新把parent_id设置为空，不然如果不点击别的回复，继续在输入框输入内容会继续回复刚才的人
                this.sendCommentData.parent_id = null
                if(sendResult.status == 200){
                    this.$msg.success('评论发表成功！')
                }
            },
            // 接送多级评论id
            publishClick(id){
                this.sendCommentData.parent_id = id
                // 通过ref链调用子组件传递聚焦输入框的方法
                this.$refs.commentFocus.focusInput()
            },
            // 请求收藏视频
            async collectClick(){
                // 用户已登录
                if(localStorage.getItem('token')){
                    const res = await this.$http.post('/collection/' +localStorage.getItem('id'),{article_id:this.$route.params.id})
                    if(res.data.msg == '收藏成功'){
                        this.isCollect = true
                        this.$msg.success(res.data.msg)
                    }else{
                        this.isCollect = false
                        this.$msg.success('已取消收藏')
                    }
                }else{
                    this.$msg.fail('登录后才能收藏哦')
                }
            },
            // 进入页面获取是否收藏
            async collection(){
                // 用户已登录
                if(localStorage.getItem('token')){
                    const res = await this.$http.get('/collection/' +localStorage.getItem('id'),{
                        params:{
                            article_id:this.$route.params.id
                        }
                    })
                    this.isCollect = res.data.success
                }
            }, 
            // 请求关注发视频的用户
            async attentClick(){
                // 用户已登录
                if(localStorage.getItem('token')){
                    const res = await this.$http.post('/sub_scription/' +localStorage.getItem('id'),{sub_id:this.details.userid})
                    if(res.data.msg == '关注成功'){
                        this.isAttent = true
                        this.$msg.success(res.data.msg)
                    }else{
                        this.isAttent = false
                        this.$msg.success('已取消关注')
                    }
                }else{
                    this.$msg.fail('登录后才能关注哦')
                }
            },
            //进入页面获取是否关注发视频的用户
            async attention(){
                // 用户已登录
                if(localStorage.getItem('token')){
                    const res = await this.$http.get('/sub_scription/' +localStorage.getItem('id'),{
                        params:{
                            sub_id:this.details.userid
                        }
                    })
                    this.isAttent = res.data.success
                }
            }, 
        },
        created() {
            if (localStorage.getItem('token')) {
                this.myUserInfo()  
            }
            this.detailitemData()
            this.commendData()
            this.commentData()
            this.collection()
        },
        watch: {
            $route(){
                this.detailitemData()
                this.commendData()
                this.commentData()
                this.collection()
            }
        }
    }
</script>

<style lang="less">
.detail{
    background-color: #fff;
    .detailInfo{
        .video{
            width: 100%;
            video{
                width: 100%;
            }
        }
        .rouseApp{
            text-align: center;
            margin: 3.333vw auto 0;
            position: relative;
            button{
                width: 93.5vw;
                height: 9.444vw;
                border-radius: 4.8vw;
                font-size: 3.889vw;
            }
            .place{
                position: absolute;
                left: 2%;
                top: 158%;
                z-index: 11;
                padding: 0 1.6vw;
                height: 5.333vw;
                line-height: 5.333vw;
                color: #fb7299;
                font-size: 3.333vw;
                background: #f4f4f4;
                border-radius: 3.2vw;
                vertical-align: middle;
                margin-top: 0.533vw;
                i{
                    font-size: 3.889vw;
                }
            }
        }
    }
    .toolbar{
        padding: 2.833vw 3.2vw;
        font-size: 2.778vw;
        color: #999;
        .toolbarItem{
            margin-right: 4.444vw;
            i{
                margin-right: 1.333vw;
                font-size: 6.944vw;
                color: #757575;
                vertical-align: middle;
            }
            span{
                vertical-align: middle;
            }
        }
        .toolbarItem:first-child i{
            font-size: 5.333vw;
        }
        .toolbarItem:last-child{
            margin-left: 7.778vw;
            margin-right: 0;
        }
        .activeColor{
            color: #f87299;
            i{
                color: #f87299;
            }
        }
    }
    .van-tab{
        font-size: 3.789vw;
    }
    .van-tabs__line{
        height: .533vw;
    }
    .detailparent{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .detailitem{
          margin: 2.222vw 0;
          width: 45%;
        }
    }
}

</style>