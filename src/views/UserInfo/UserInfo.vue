<template>
    <div class="userinfo">
        <NavBar :userInfo = userInfo></NavBar>
        <UserDetail :userInfo = userInfo></UserDetail>
        <UserArticle></UserArticle>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import UserDetail from './UserDetail.vue'
import UserArticle from './UserArticle.vue'
    export default {
        name:'home',
        data() {
            return {
                userInfo:null
            }
        },
        components:{
            NavBar,
            UserDetail,
            UserArticle
        },
        methods: {
            // 请求用户数据
            async userInfoData(){
                const res = await this.$http.get('/user/' + localStorage.getItem('id'))
                this.userInfo = res.data[0]
            }
        },
        created() {
            this.userInfoData()
        },
    }
</script>

<style lang="less">

</style>