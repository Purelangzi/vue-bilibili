<template>
    <div class="eidtButtom" @click="logOut">
        <van-button 
            type="primary" 
            color="#f87299" 
            :to=route 
            size="normal" 
            block plain
        >{{mes}}
        </van-button>
    </div>
</template>

<script>
    export default {
        props:['mes','route'],
        methods: {
            logOut(){
                this.$emit('logOut')
            }
        }
    }
</script>

<style lang="less">
.eidtButtom{
    .van-button{
        font-size: 3.77vw;
        border-color: transparent !important ;
        height: 11.111vw;
    }
}
</style>