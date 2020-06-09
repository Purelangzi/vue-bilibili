<template>
  <div class="home" v-if="category">
    <NavBar :userInfo="userInfo"></NavBar>
    <van-tabs v-model="active" swipeable animated sticky title-active-color="#F87299">
      <van-tab v-for="(item,index) in category" :key="index" :title="item.title">
        <van-list
          v-model="item.loading"
          :immediate-check="false"
          :finished="item.finished"
          finished-text="没有更多了"
          offset="1"
          @load="onLoad"
        >
          <div class="detailparent" v-if="item.list">
            <Cover class="detailitem" 
              :detailitem="categoryitem" 
              v-for="(categoryitem,categoryindex) in item.list" 
              :key="categoryindex"
            ></Cover>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
      <BackTop distance="300"></BackTop>
    
  </div>
</template>

<script>
import NavBar from "@/components/NavBar"
import Cover from '@/components/Cover'
import BackTop from '@/components/BackTop'
export default {
  name:'home',
  data() {
    return {
      category:[],
      active:0,
      userInfo:null
    }
  },
  components: {
    NavBar,
    Cover,
    BackTop
  },
  methods: {
    // 获取全部分类数据
    async selectCategory() {
      const res = await this.$http.get('/category')
      this.changeCategory(res.data)
    },
    // 改造全部分类数据
    changeCategory(data){
      const category1 = data.map((item,index)=>{
        item.list = []
        item.page = 0
        item.pagesize = 10
        this.loading = false
        this.finished = false
        return item
      })
      this.category = category1
      this.selectCover()
    },
    // 请求获取视频数据
    async selectCover(){
      const categoryitem = this.categoryItem()
      const res = await this.$http.get('/detail/' + categoryitem._id,{
        params:{
          page:categoryitem.page,
          pagesize:categoryitem.pagesize
        }
      })
      setTimeout(() => {
        
      }, 2000);
      categoryitem.list.push(...res.data)
      categoryitem.loading = false
      // 判断数据是否请求完毕
      if (res.data.length < categoryitem.pagesize) {
        categoryitem.finished = true
      }
    },
    // 下划到底部触发
    onLoad(){
      console.log('触发')
      const categoryitem = this.categoryItem();
      categoryitem.page += 1;
      this.selectCover(); 
      
    },
    // 获取当前分类项数据
    categoryItem(){
      const categoryitem = this.category[this.active]
      return categoryitem
    },
    // 获取用户数据
    async getUserInfo(){
      // 如果用户已登录，获取用户数据
      if(localStorage.getItem('token')){
        const res = await this.$http.get('/user/' + localStorage.getItem('id'))
        this.userInfo = res.data[0]
      }else{ // 未登录则清空之前遗留的用户数据
        this.userInfo = null
      }
    }
  },
  watch: {
    active(){
      this.selectCover()
    },
    $route(){
      // 如果跳转的是首页，则获取用户数据
      if(this.$route.name == 'home'){
        this.getUserInfo()
      }
    }
  },
  created() {
    this.selectCategory()
  }
};
</script>
<style lang="less">

.home{
  background-color: #fff;
  .detailparent{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .detailitem{
      margin: 2.222vw 0;
      width: 45%;
      
    }
  }
  .van-tabs__wrap--scrollable .van-tab{
    font-size: 3.889vw;
  }
  .van-list__placeholder{
    z-index: 20;
    color: #969799;
    font-size: 14px;
    line-height: 50px;
    text-align: center;
  }
}
  
</style>