<template>
    <div class="edit" v-if="userInfo">
        <NavBar :userInfo = userInfo></NavBar>
        <div class="uploadImgFile">
            <van-uploader :after-read="afterRead" preview-size="100vw" class="uploadImg" />
            <EditBanner left="头像" style="margin-top: 3.2vw;">
                <div slot="right" class="userImg">
                    <img v-if="userInfo.user_img"
                        :src="userInfo.user_img"
                    >
                    <img src="@/assets/defaultImg.jpg" v-else>
                </div>
            </EditBanner>
        </div> 
        <EditBanner left="昵称" @editClick="show=true">
            <a href="javascript:;" slot="right">{{userInfo.name}}</a>
        </EditBanner>
        <EditBanner left="账号">
            <a href="javascript:;" slot="right">{{userInfo.username}}</a>
        </EditBanner>
        <EditBanner left="性别" @editClick="gendershow=true">
            <a href="javascript:;" slot="right" v-if="userInfo.gender">{{userInfo.gender == 1 ?'男':'女'}}</a>
            <a href="javascript:;" slot="right" v-else>保密</a>
        </EditBanner>
        <EditBanner left="个性签名" @editClick="textShow=true">
            <a href="javascript:;" slot="right">{{userInfo.user_desc}}</a>
        </EditBanner>
        <van-dialog 
            v-model="show" 
            title="昵称" 
            show-cancel-button
            @confirm="confirmClick"
            @cancel="content=''"
            >
            <van-field v-model="content" placeholder="1~10个字符哦"  ref="autofoucs" autofocus="autofocus" />
        </van-dialog>
        <van-dialog 
            v-model="textShow" 
            title="个性签名" 
            show-cancel-button 
            @confirm='textareaClick'
            @cancel="content=''"
            >
            <van-field v-model="content" placeholder="活出个性！" ref="autofoucs" type="textarea" maxlength=16 autofocus="autofocus" />
        </van-dialog>
        <van-action-sheet
            v-model="gendershow" 
            cancel-text="取消" 
            :actions="actions" 
            @select="onSelect" 
        />
        <EditButtom mes="退出登录" @logOut="logOut" style="margin-top:5.3vw;"></EditButtom>
        <EditButtom mes="返回空间" route="userinfo"></EditButtom>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import EditBanner from './EditBanner.vue'
import EditButtom from './EditButtom.vue'
    export default {
        data() {
            return {
                userInfo:{},
                show:false,
                textShow:false,
                gendershow:false,
                content:'',
                actions: [
                    { name: '男', val:1 },
                    { name: '女', val:2 },
                ]
            }
        },
        methods: {
            // 获取用户数据
            async selectUser(){
                const res = await this.$http.get('/user/' + localStorage.getItem('id'))
                this.userInfo = res.data[0]
            },
            // 头像上传
            async afterRead(file) {
                // 实例化一个FromData对象
                const fromData = new FormData()
                // 添加上传文件的数据
                fromData.append('file',file.file)
                // 发送更新请求
                const res = await this.$http.post('/upload',fromData)
                // 个人中心请求用户数据中的图片地址改成刚上传完的头像地址，实时显示
                this.userInfo.user_img = res.data.url
                this.userUpdate()
            },
            // 后台更新用户信息
            async userUpdate(){
                const res = await this.$http.post('/update/' + localStorage.getItem('id'),this.userInfo)
                if(res.data.code == 200){
                    this.$msg.success('修改成功')
                }
            }, 
            // 昵称修改确认
            confirmClick(){
                this.$refs.autofoucs.focus()
                // 正则检查修改内容
                let rulg = /^.{1,10}$/
                if(!rulg.test(this.content)){
                    this.$msg.fail('输入范围限制1~10个字符')
                    this.content = ''
                    return
                }
                this.userInfo.name = this.content
                this.userUpdate()
                this.content = ''
            },
            // 个性签名修改确认
            textareaClick(){
                this.$refs.autofoucs.focus()
                this.userInfo.user_desc = this.content
                this.userUpdate()
                this.content = ''
            },
            // 性别修改确认
            onSelect(data){
                this.userInfo.gender = data.val
                this.userUpdate()
                this.gendershow = false
            },
            // 退出登录，清除本地存储的token和id
            logOut(){
                this.$msg.success('退出成功')
                localStorage.removeItem('token')
                localStorage.removeItem('id')
                setTimeout(() => {
                    this.$router.push('home')
                }, 1000);
            }         
        },
        created() {
            this.selectUser()
        },
        components:{
            NavBar,
            EditBanner,
            EditButtom
        },
    }
</script>

<style lang="less">
.edit{
    a{
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .userImg img{
        width: 12.778vw;
        height: 12.778vw;
        border-radius: 50%;
    }
    .uploadImgFile{
        position: relative;
        overflow: hidden;
        .uploadImg{
            position: absolute;
            opacity: 0;
        }
    }
}
</style>