<template>
    <van-cell-group>
        <van-field
            v-model="content"
            :label="label"
            :type="type"
            :placeholder="placeholder"
        />
    </van-cell-group>
</template>

<script>
    export default {
        data() {
            return {
                content:''
            }
        },
        props:['label','type','placeholder'],
        watch: {
            content(){
                this.content = this.content.trim()
                this.$emit('contentWatch', this.content)
            }
        }
    }
</script>

<style lang="less">
.van-cell{
    font-size: 3.889vw;
}
</style>