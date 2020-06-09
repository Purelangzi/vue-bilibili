<template>
    <div class="login">
        <LoginTop middleTop="登录bilibili">
            <div slot="right" style="color:#FF9DB5;font-size:3.611vw"  
                @click="$router.push('/register')"
            >注册</div>
        </LoginTop>
        <LoginText style="margin:4.167vw 0;"
            label="账号"
            rule="^.{4,16}$"
            placeholder="请输入账号"
            @contentWatch="res => registerInfo.username = res"
        />
        <LoginText
            label="密码"
            rule="^.{4,16}$"
            type="password"
            placeholder="请输入密码"
            @contentWatch="res => registerInfo.password = res"
        />
        <LoginBtn btntext="登录" @TextClick="loginSubmit"></LoginBtn>
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
                    username:'',
                    password:''
                }
            }
        },
        methods: {
            async loginSubmit(){
                let {name,username,password} = this.registerInfo
                let rulg = /^.{4,16}$/
                if (rulg.test(username) && rulg.test(password)) {
                    const res = await this.$http.post('/login',this.registerInfo)
                    this.$msg.fail(res.data.msg)
                    // 判断后端返回的状态码
                    if (res.data.code == 301 || res.data.code == 302) {
                        return
                    }
                    // 把返回的id的token存储到本地
                    localStorage.setItem('id',res.data.id)
                    localStorage.setItem('token',res.data.token)
                    setTimeout(() => {
                        this.$router.push('/userinfo')
                    }, 1000)
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