<template>
  <div class="home">
    

    <div class="topbox">
      <span class="usernamebox">你好 {{username}}</span>
      <span class="logo">商 品 库 存 管 理 系 统</span>
      <!-- <van-search v-model="value" placeholder="请输入搜索关键词"  class="search" /> -->
    </div>
   
    
    <div class="Todaybox">
      <div class="TodayText">出库总利润</div>
      <div class="TodayMoney">
        <span class="yuan">￥</span>
        <span class="money">{{Outmoney}}</span>
      </div>

      <div class="inandout">
        <div class="outbox">
          <div class="text">出库数</div>
          <div class="outnum">{{Outnum}}</div>
        </div>

        <div class="inbox">
          <div class="text">入库数</div>
          <div class="innum">{{Innum}}</div>
        </div>  

        <div class="allbox">
          <div class="text">出入库总数</div>
          <div class="allnum">{{InOutnum}}</div>
        </div>  
      </div>
      
    </div>

    <div class="banner">
      <van-swipe :autoplay="5000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>


    <div class="allfast">
      <div class="fasttext">快捷功能</div>

      <!-- <div class="allboxfast">
        <div class="box" v-for="(item,index) in imgarr" :key="index">
          <div class="imgbox" >
            <img :src="item.img" alt="" >
          </div>
          <div class="text">{{item.text}}</div>
        </div>


        
      </div> -->


      <div class="allboxfast">
        <div class="box">
          <div class="imgbox" @click="toInOutpage">
            <img src="../assets/icon/出入库历史明细信息.png" alt="" >
          </div>
          <div class="text">出入库明细</div>
        </div>


        <div class="box">
            <div class="imgbox" @click="togoodnumPage">
              <img src="../assets/icon/数据.png" alt="" >
            </div>
            <div class="text">库存视图</div>
          </div>

        <div class="box">
          <div class="imgbox" @click="togoodsortPage">
            <img src="../assets/icon/排序.png" alt="" >
          </div>
          <div class="text">商品排序</div>
        </div>


       
        
      
      </div>
      

      <div class="allboxfast">
        
        <div class="box">
          <div class="imgbox" @click="toOutpage">
            <img src="../assets/icon/出库.png" alt="" >
          </div>
          <div class="text">商品出库</div>
        </div>
      

      
        <div class="box">
          <div class="imgbox" @click="toAddpage">
            <img src="../assets/icon/入库.png" alt="" >
          </div>
          <div class="text">商品入库</div>
        </div>

        <div class="box">
          <div class="imgbox" @click="tostaffpage">
            <img src="../assets/icon/员工管理.png" alt="" >
          </div>
          <div class="text">员工管理</div>
        </div>
      

      </div>
      
    </div>

    





  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

import '../assets/less/home.less'

import Vue from 'vue';
import { Lazyload } from 'vant';


Vue.use(Lazyload);

export default {
  
  
  data() {
    return {
      images: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg',
      ],

      value: '',

      // username:this.$route.query.username,
      username : window.sessionStorage.getItem('username'),
      // 接收数据时，这里的route没有r！！！！不要加r！！！！

      Outmoney:'',
      Outnum:'',
      Innum:'',
      InOutnum:'',//出入库总数


      // historyimg:require("../assets/icon/出入库历史明细信息.png")
      // imgarr:[
      //   {
      //     text:"历史明细",
      //     img:require("../assets/icon/出入库历史明细信息.png")
      //   },
      //   {
      //     text:"库存查询",
      //     img:require("../assets/icon/库存查询.png")
      //   },
       
      // ],

      
      



    };
  },

  

  created() {
    // this.submitfun()
  //  if(String(this.username).length == 4)
    console.log("username",String(this.username));
    if(String(this.username) == 'null'){
      console.log("username",String(this.username));
      this.username = "***"
      this.Outmoney = "***"
      this.Outnum="***"
      this.Innum = "***"
      this.InOutnum="***"
    }else if(String(this.username).length <=6){
      this.selectaddgood()
      this.selectexgood()
      // this.allspend();
      this.allprofit();
    }else{
      this.selectaddgood()
      this.selectexgood()
      this.allspend();
    }

    //  this.get();

    

   

    
    
    // console.log("username", window.sessionStorage.getItem('username'));
    
  },

  methods:{
    tostaffpage(){
      if(this.username.length <=6){
       this.$router.push({name:'allstaff'})
      }else{
        this.$toast("抱歉，您没有查看的权限")
      }
    },
     allspend() {    //查找addgood表总花费数据
            this.axios.get('http://127.0.0.1/addgoods/allspend').then(res=>{
                console.log("入库花费总额",res.data[0].spendall);
                this.Outmoney = res.data[0].spendall;
                var spendtext = document.querySelector(".TodayText");
                spendtext.innerHTML = '入库总花费'
            }).catch(err=>{
                console.log("获取数据失败" + err);
            })
        },

      allprofit() {    //查找exgood表总利润数据
            this.axios.get('http://127.0.0.1/exgoods/allprofit').then(res=>{
                console.log("出库利润总额",res.data[0].profitall);
                this.Outmoney = res.data[0].profitall;
                
            }).catch(err=>{
                console.log("获取数据失败" + err);
            })
      },


        

    selectaddgood() {    //查询花费和时间入库表操作
      this.axios.get('http://127.0.0.1/addgoods/alladdnum',{               
      }).then(res=>{
        this.Innum = res.data
        console.log("入库总数",this.Innum);
        // console.log("shushu",res);


      }).catch(err=>{
      
      console.log("获取数据失败" + err);
      })
    },

    // 计算出库总额
    MoneyFun(list){
      var allmoney=0.0
      for(var i=0;i<list.length;i++){
        allmoney =allmoney+ list[i];
      }
      return allmoney

    },

    selectexgood() {    //查询利润和时间出库表操作
            this.axios.get('http://127.0.0.1/exgoods/selectprofit',{           
            }).then(res=>{
                //  console.log("查询数据库入库表的时间和花费金额",res.data);
                 var Alloutlist =Object.freeze(res.data);
                //  console.log("出库表的全部",Alloutlist);
               
                 var outprofitlist = Alloutlist[0];
                
                 this.axios.get('http://127.0.0.1/exgoods/alloutnum',{     
                        
                }).then(res=>{
                  this.Outnum = res.data
                  console.log("出库总数",this.Outnum);

                  this.InOutnum = this.Innum + this.Outnum
                  console.log("出入库总数",this.InOutnum);

                }).catch(err=>{
                
                console.log("获取数据失败" + err);
                })
            }).catch(err=>{
                
                console.log("获取数据失败" + err);
            })
    },

    // 出入库明细
    toInOutpage(){
      this.$router.push({name:"goodInOut"})
    },
    
    // get() {
    //   this.axios.get('http://127.0.0.1/user').then(res=>{
    //       console.log(res.data);
    //   }).catch(err=>{
    //       console.log("获取数据失败" + err);
    //   })
    // },

    // 库存视图页面
    togoodnumPage(){
      this.$router.push({name:'goodnum'})
    },

   

    // 出库页面
    toOutpage(){
      this.$router.push({name:'goodout'})
    },

    // 进库，增加商品页面
    toAddpage(){
      this.$router.push({name:'goodadd'})
    },

    // 排序页面
    togoodsortPage(){
      this.$router.push({name :'goodsort'})
    }



  },
}


</script>