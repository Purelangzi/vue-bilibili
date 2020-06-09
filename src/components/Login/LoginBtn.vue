<template>
    <div class="LoginBtn" @click="TextClick">
        <div class="loginbtn">{{btntext}}</div>
    </div>
</template>s

<script>
    export default {
        props:['btntext'],
        methods: {
            TextClick(){
                this.$emit('TextClick')
            }
        },
    }
</script>

<style lang="less">
.LoginBtn{
    padding: 4.167vw 2.778vw;
}
.loginbtn{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 12.5vw;
    background-color: #FF9DB5;
    color: #fff;
    font-size: 4.444vw;
    border-radius: 6.25vw;
}
</style>