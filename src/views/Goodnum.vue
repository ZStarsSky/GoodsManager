<template>
<!-- 展示商品库存还剩余多少 -->

    <div class="goodselect">

            <div>
                <van-nav-bar
                title="商品库存视图"
                left-text="返回"
                
                left-arrow
                @click-left="onClickLeft"
                
                />
            </div>


            <van-dropdown-menu id="sortbox" >
            <van-dropdown-item v-model="value1" :options="option1" />
            <!-- <input type="text" v-model="value2"> -->
            <van-dropdown-item v-model="value2" :options="option2" @click.native="sortfun"/>
            </van-dropdown-menu>

            <div  v-for="(gooditem,index2) in goodlist" :key="index2" >
                <div class="goodbox" >

                    <p style="display:none" class="iidd">{{gooditem.goodId}}</p>

                    <div class="imgbox1">
                        <img :src="gooditem.gpic" alt="" >
                       
                    </div>
                     <!-- <img src="../assets/picture/可乐.jpg" alt="" > -->
                    
                    <div class="textbox">
                        <div class="goodname">{{gooditem.goodName}}</div>
                        <div>
                            <span class="text">库存量</span>
                            <span class="num">{{gooditem.num}}</span>
                        </div>
                       
                    </div>

                    <div>
                        <van-circle v-model="gooditem.num" :rate="gooditem.num"  :text="gooditem.num>=20?gooditem.num.toFixed(0):gooditem.num.toFixed(0)+'\n'+'库存不足'" :speed="100" :color="gooditem.num>=20?'#1989fa':'red'" layer-color="#ebedf0"/>
                    </div>
                    
                    <!-- type="text" :value="gooditem.goodId"  -->
                        <!-- :class="gooditem.goodId" -->

                </div>
            </div>
                    <!-- <div v-for="(gooditem,index2) in goodlist" :key="index2" > -->
                    
                    <div>
                    <!--  <van-circle v-model="currentRate" :rate="10" :speed="100" :text="text"  :stroke-width="60" /> -->
                    <!-- <van-circle v-model="currentRate" :currentRate="1" :rate="50" :speed="100" :text="text"  :stroke-width="60" /> --> 
                    </div>
                    <!-- </div> -->
            
    </div>
    
</template>

<script>
import '../assets/less/goodselect.less'
// import circle from '@/components/Circle.vue'


export default {
    data() {
        return {
        
        
        // num:10,

        textstring:'',
        goodlist:[],

        value1: 0,
        value2: 'a',
        option1: [
        { text: '全部商品', value: 0 },
        ],
        option2: [
        { text: '默认排序', value: 'a' },
        { text: '数量升序', value: 'b' },
        { text: '数量降序', value: 'c' },
        ],
        };


    },

    // components:{
    //     // circle
    // },

    created(){

        // this.num = gooditem.num;
        // console.log("num"+this.num);
        // this.all();

        // if(this.value2 == 'c'){
        //     console.log(9999);
        // }

        this.sortfun()
       
        

        

    },

    // computed: {
    //     text() {
    //          return this.r.toFixed(0) + '%';
    //     },
    // },

    methods:{
        
        sortfun(){
            // var sortbox = document.querySelector("#sortbox");
            // sortbox.addEventListener('click',function(){
                if(this.value2=='a'){
                this.all()
               

                }else if(this.value2=='b'){
                    this.upsort()
                
                }else{
                    this.downsort()
                
                }
            // });
            

        },
        onClickLeft(){
            this.$router.go(-1)
        },

        


        all() {    //查找good表全部数据
            this.axios.get('http://127.0.0.1/all').then(res=>{
                console.log(res.data,"good表全部数据");
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
    }


};
</script>

<style scoped>
    .goodbox{
        padding: 10px 56px;
        border-bottom: 1px solid #80808094
    }
    .goodselect .goodbox .textbox{
        margin-top: 23px;
    }

    .imgbox1{
        margin-left: -39px;
        margin-top: 4px;
        margin-right: 20px;
        
    }
    img{
        width: 85px;
        height: 85px;
    }
    
</style>