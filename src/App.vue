<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<style lang="less">
body{
  background-color: #f4f4f4;
}
p{
  margin: 0;
  padding: 0;
}
input{
  outline: none;
  border: 0;
}
</style>
