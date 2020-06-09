<template>
    <div class="back-top-box" v-if="isShow" @click="backTop">
        <i class="iconfont icon-fanhuidingbu4"></i>
    </div>
</template>

<script>
    export default {
        props:['distance'],
        data() {
            return {
                isShow:false
            }
        },
         methods: {
            handelEvent(e){
                let sTop = document.documentElement.scrollTop || document.body.scrollTop
                if (sTop >= this.distance && !this.isShow) {
                    this.isShow = true
                }else if(sTop < this.distance && this.isShow){
                    this.isShow = false
                }
            },
            backTop(){
              window.scrollTo(0,0)
            }
        },
        created() {
            window.addEventListener('scroll',this.handelEvent)
        }
    }
</script>

<style lang="less">
    .back-top-box{
        position: fixed;
        right: 4.167vw;
        bottom: 22.222vw;
        border-radius: 50%;
        background: #fff;
        i{
            color: #f87299;
            font-size: 10.333vw;
        }
    }
</style>