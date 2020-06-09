<template>
    <div class="videoInfo" v-if="details">
        <van-collapse v-model="activeNames" accordion>
            <div class="data">
                <div class="up">
                    <span><i class="iconfont icon-UPzhu"></i></span>
                    <span class="author" v-if="details.userinfo">{{details.userinfo.name}}</span>
                    <span class="author" v-else>神秘人</span>
                </div>
                <div class="number">
                    <span>66.6万次观看</span>
                    <span >2万弹幕</span>
                    <span style="padding-top:0.556vw;">{{details.date}}</span>
                </div>
            </div>
            <van-collapse-item :title="details.name" :name="details.id">
            <p class="copyright">
                <i class="iconfont icon-Group-"></i>
                <span>未经作者授权禁止转载</span>
            </p>
            <p class="desc">
                本家：BV1Ta4y147hE<br>
                作曲/编曲/调校/混音：青色靘<br>
                策划/作词/PV：沧弦落尘<br>
                曲绘：阿喜，不要动我可可爱的柚子<br>
                封面：阿喜，苗库里Owo<br><br>
                原唱：洛天依<br>
                翻唱：赤羽<br>
            </p>
            </van-collapse-item>
        </van-collapse>
    </div>
</template>

<script>
    export default {
        props:['details'],
        data() {
            return {
                activeNames:'details.id'
            }
        }
    }
</script>

<style lang="less">
.videoInfo{
    margin-top: 3.389vw;
    .van-cell{
        padding-left: 3.333vw;
        line-height: normal;
        height: 18.056vw;
        background-color: #fff;
        .van-cell__title{
            font-size: 4.167vw;
            color: #212121;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            span{
                padding-left: 14.5vw;
            }
        }
    }
    .place{
        position: absolute;
        left: 2%;
        top: 10%;
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
    .data{
        display: flex;
        flex-wrap: nowrap;
        position: absolute;
        left: 2.778vw;
        top: 11.111vw;
        z-index: 10;
        color: #999;
        font-size: 3.333vw;
        background-color: #fff;
        .up{
            display: flex;
            color: #212121;
            .iconfont{
                font-size: 3.889vw;
            }
            .author{
                padding-left: 0.833vw;
            }
        }
        .number{
            display: flex;
            margin-left: 5.556vw;
            span{
                margin-right: 6.389vw;
            }
        }
    }
    .van-collapse-item__content{
        padding: 1.389vw 2.778vw;
        color: #999;
        font-size: 3.2vw;
        .copyright{
            i{
                color: #fb7299;
                vertical-align: middle;
                margin-right: 0.8vw;
            }
            span{
                vertical-align: middle;
            }
        }
        .desc{
            padding-top: 1.33333vw;
            white-space: pre-wrap;
        }
    }
}
</style>