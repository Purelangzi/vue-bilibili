<template>
    <div class="register">
        <LoginTop middleTop="注册bilibili">
            <div slot="right" style="color:#FF9DB5;font-size:3.611vw" 
                @click="$router.push('/login')"
            >切换到登录</div>
        </LoginTop>
        <LoginText style="margin:4.167vw 0;"
            label="昵称"
            placeholder="1～10个字符，区分大小写"
            @contentWatch="res => registerInfo.name = res"
        />
        <LoginText
            label="账号"
            placeholder="4～16个字符，区分大小写"
            @contentWatch="res => registerInfo.username = res"
        />
        <LoginText
            label="密码"
            type="password"
            placeholder="4～16个字符，区分大小写"
            @contentWatch="res => registerInfo.password = res"
        />
        <LoginBtn btntext="注册" @TextClick="registerSubmit"></LoginBtn>
    </div>
</template>

<script>
import LoginTop from '@/components/Login/LoginTop.vue'
import LoginText from '@/components/Login/LoginText.vue'
import LoginBtn from '@/components/Login/LoginBtn.vue'
    export default {
        data() {
            return {
                registerInfo:{
                    name:'',
                    username:'',
                    password:''
                } 
            }
        },
        methods: {
            async registerSubmit(){
                let {name,username,password} = this.registerInfo
                let rulg = /^.{4,16}$/
                if (/^.{1,10}$/.test(name) && rulg.test(username) && rulg.test(password)) {
                    const res = await this.$http.post('/register',this.registerInfo)
                    this.$msg.fail(res.data.msg)
                    // 如果注册的账号已存在
                    if(res.data.code == 302){
                        return
                    }
                    // 把返回的id的token存储到本地
                    localStorage.setItem('id',res.data.id)
                    localStorage.setItem('token',res.data.objtoken)
                    setTimeout(() => {
                        this.$router.push('/userinfo')
                    }, 2000)
                }else{
                    this.$msg.fail('格式不正确！')
                }
            }
        },
        components:{
            LoginTop,
            LoginText,
            LoginBtn
        }
    }
</script>

<style lang="less">

</style>