<template>
    <div @click="editClick">
        <div class="editbanner">
            <span>{{left}}</span>
            <span><slot name="right"></slot></span>
        </div>
    </div>
</template>

<script>
    export default {
        props:['left','right'],
        methods: {
            editClick(){
                this.$emit('editClick')
            }
        }
    }
</script>

<style lang="less">
.editbanner{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2.778vw 3.2vw;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    font-size: 4vw;
    color: #505050;
}
</style>