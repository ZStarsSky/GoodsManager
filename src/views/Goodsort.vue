<template>

    <div class="goodsort">
        <van-nav-bar
        title="商品排序"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />
        <van-dropdown-menu>
            <van-dropdown-item v-model="value1" :options="option1" />
            <van-dropdown-item v-model="value2" :options="option2" @click.native="sortpricefun"/>
        </van-dropdown-menu>

        <!--  :num="item.num" -->
        <div v-for="(item,index) in goodlist" :key="index" class="goodbox">
            <van-card
            
            :price="item.outprice"
            :num="item.num"
            :title="item.goodName"
            :thumb="item.gpic"
            />
        </div>
    </div>
</template>

<script>
import '../assets/less/goodsort.less'
export default {
  data() {
    return {
      value1: 0,
      value2: 'a',
      option1: [
        { text: '全部商品', value: 0 },
      ],
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '价格升序', value: 'b' },
        { text: '价格降序', value: 'c' },
        { text: '数量升序', value: 'd' },
        { text: '数量降序', value: 'e' },
      ],

      goodlist:[],
    };
  },

  created(){
      this.sortpricefun()

  },

  methods:{
      // 返回上一页
         onClickLeft() {
             this.$router.go(-1)
        },


      sortpricefun(){
          if(this.value2 == "a"){
              this.all();

          }else if(this.value2 == 'b'){
              this.upPricesort()

          }else if(this.value2 == 'c'){
              this.downPricesort();

          }else if(this.value2=='d'){
                this.upsort()
                
          }else{
                this.downsort()
            
          }

      },


      all() {    //查找good表全部数据
            this.axios.get('http://127.0.0.1/all').then(res=>{
                console.log(res.data,"good表全部数据");
                this.goodlist=res.data
                
            }).catch(err=>{
                console.log("获取数据失败" + err);
            })
        },

        upPricesort() {    //查找good表按照价格升序
            this.axios.get('http://127.0.0.1/list/upprice').then(res=>{
                console.log(res.data,"good表按照价格升序");
                this.goodlist=res.data
                
            }).catch(err=>{
                console.log("获取数据失败" + err);
            })
        },
         downPricesort() {    //查找good表按照价格降序
            this.axios.get('http://127.0.0.1/list/downprice').then(res=>{
                console.log(res.data,"good表按照价格降序");
                this.goodlist=res.data
                
            }).catch(err=>{
                console.log("获取数据失败" + err);
            })
        },

          upsort() {    //查找good表按照数量升序
            this.axios.get('http://127.0.0.1/list/upnumsort').then(res=>{
                console.log(res.data,"good表按照数量升序");
                this.goodlist=res.data
                
            }).catch(err=>{
                console.log("获取数据失败" + err);
            })
        },
         downsort() {    //查找good表按照数量降序
            this.axios.get('http://127.0.0.1/list/downnumsort').then(res=>{
                console.log(res.data,"good表按照数量降序");
                this.goodlist=res.data
                
            }).catch(err=>{
                console.log("获取数据失败" + err);
            })
        },
  },
};
</script>