<template>
    <div @click="$router.push('/detail/' + detailitem.id)" v-if="detailitem">
        <div class="detailItem">
            <div class="imgparent">
                <img :src="detailitem.img" >
                <div class="shadow">
                    <span class="video iconfont icon-bofang" >1223</span>
                    <span class="comment iconfont icon-file-text">{{detailitem.commentlen?detailitem.commentlen:69}}</span>
                </div>
            </div>
            <p>{{detailitem.name}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        props:['detailitem']
    }
</script>

<style lang="less">
.detailItem{
    font-size: 3.333vw;
    .imgparent{
        position: relative;
        img{
        width: 100%;
        height: 100%;
        }
        .shadow{
            padding: 0 2.778vw;
            margin-bottom: 1.389vw;
            position: absolute;
            bottom: 0.556vw;
            background: linear-gradient(0deg,rgba(0,0,0,.85),transparent);
            justify-content: space-between;
            color: #fff;
            display: flex;
            left: 0;
            right: 0;
            .comment{
                padding: 0;
            }
            .iconfont{
                font-size: 3.611vw;
            }
        }
    } 
}
</style>