<template>
<!-- 查询 -->
    <div class="goodselect">
        <!-- <div>
            <van-nav-bar
            title="商品列表"
            left-arrow
            @click-left="onClickLeft"
            class="bar"
            />
        </div>
         -->
    <div class="goodtitle">
        商品
    </div>

    <div class="databox1">
        <div class="chutext">
            <span>商品列表</span>
            <span class="mingxi" @click="Togoodnum">库存视图</span>
        </div>
    
        <div>
            <van-search v-model="value" placeholder="商品号/名称"  class="research"  @search="chazhao(value,$event)"/>
            <van-button type="primary" class="chazhaobtn" @click="chazhao(value,$event)">查找</van-button>
        </div>

        <div >
           

            <van-tree-select height="175vw" :items="items" :main-active-index.sync="active" class="nametree">
            <template #content >

                <div v-for="(item,index1) in Alltype" :key="index1">

                    <div v-if="active === index1" id="smallgoodbox" >
                        
                            <div  v-for="(gooditem,index2) in item" :key="index2" class="fbox" >

                                <van-swipe-cell >

                                    <div class="goodbox" @click="changegoods($event)" ref="Agoodbox" :style="gooditem.goodId.indexOf(selectokshow)>=0 && selectokshow!=''|| gooditem.goodName.indexOf(selectokshow)>=0  && selectokshow!='' ? 'background:pink':''">

                                        <p style="display:none" class="iidd" id="gid">{{gooditem.goodId}}</p>

                                        <div class="imgbox">
                                            <img :src="gooditem.gpic" alt="" id="img">
                                            <!-- <img src="../assets/picture/可乐.jpg" alt="" > -->
                                        </div>
                                        
                                        <div class="textbox">
                                            <div class="goodname">{{gooditem.goodName}}</div>
                                            <div>
                                                <span class="text">库存量</span>
                                                <span class="num">{{gooditem.num}}</span>
                                            </div>
                                            <div>
                                                <span class="text">售价</span>
                                                <span class="price">￥{{gooditem.outprice}}</span>
                                            </div>
                                        </div>

                                        
                                       

                                    </div>

                                    
                                    <!-- <div class="cbtn">
                                        <van-stepper v-model="gooditem.nownum" theme="round" button-size="22" disable-input />
                                    </div> -->

                                     

                                    <template #right>
                                        <van-button square text="删除" type="danger" class="delete1" @click="delclick($event)"/>
                                    </template>
                                </van-swipe-cell>

                            </div>



                            

                            
                    </div>


                   

                </div>

               

            </template>

            </van-tree-select>


            
        </div>
    </div>

       

    </div>
</template>


<script>
import '../assets/less/goodselect.less'
import { color } from 'echarts';
import axios from "axios"
import { Dialog } from 'vant';


export default {
    data(){
        return{
            value:'',
            activeKey:0,
            active: 0,
            items: [{ text: '饮料' }, { text: '零食' },{ text: '家电' },{ text: '数码' },{ text: '服装' },{ text: '美妆' }],


            delid: '',
            name: '',

            selectokshow:'',


            
            Allgoodlist: [],
            // 饮料', '零食', '家电', '数码', '服装','美妆 的列表
            yinliaolist:[],
            lingshilist:[],
            jiadianlist:[],
            shumalist:[],
            fuzhuanglist:[],
            meizhuanglist:[],

            Alltype:[],//分类好的列表的组合

            changegood:{
                gid:'',
                gname:'',
                gnum:'',
                goutprice:'',
                gpic:''

            },
            
            selectid:'',
            selectimg:'',

            time : 1000
            
        };
    },

    created(){
        // this.all();
        this.selctalltype();
    

    },


    methods: {

        Togoodnum(){
            this.$router.push({name:'goodnum'})
        },      
        
        chazhao(ggid,e){// 输入id或者name查找

            var a=0;
            // var oneboxlist = document.querySelectorAll("#smallgoodbox");//对应类型商品盒子
            // console.log("对应类型商品盒子",oneboxlist);
            
          // var allgoodpage =e.currentTarget.parentElement.nextElementSibling.firstElementChild
            // console.log("右边商品",allgoodpage.firstElementChild.nextElementSibling);

            if(ggid.trim().length<=0){
                this.$toast("请重新输入")
            }else{

                for(var i=0;i<this.Alltype.length;i++){
                    for(var j=0;j<this.Alltype[i].length;j++){
                        // console.log(this.Alltype[i][j].goodId);
                        if(this.Alltype[i][j].goodId.indexOf(ggid)>=0 || this.Alltype[i][j].goodName.indexOf(ggid)>=0){
                            this.active=i;
                            // oneboxlist[i].style.display=""
                            a=1
                            this.selectokshow=ggid //用来显示已查找到的商品
                            break;
                        }
                    }
                }
            
                if(a==0){
                        this.$toast("该商品不存在")
                }
            }
           
        },

        

       

        // 修改商品
        changegoods(e){
            // console.log("修改商品",e.currentTarget);
            this.changegood.gid=e.currentTarget.firstElementChild.innerHTML;
            // console.log("gid",this.changegood.gid);
            this.changegood.gname=e.currentTarget.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.innerHTML;
            // console.log("gname",this.changegood.gname);
            this.changegood.gnum=e.currentTarget.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.innerHTML;
            // console.log("gnum",this.changegood.gnum);
            this.changegood.goutprice=e.currentTarget.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.innerHTML;
            // console.log("gnum",this.changegood.goutprice);

            this.changegood.gpic = e.currentTarget.firstElementChild.nextElementSibling.firstElementChild.src
            console.log("修改的商品",this.changegood);

            // var img  = document.querySelectorAll("#img").src
            // console.log("img",img);
            // console.log("IMG",e.currentTarget.firstElementChild.nextElementSibling.firstElementChild.src);

            this.toGoodupdata(this.changegood);// 跳转到修改商品
        },

        // 跳转到修改商品
        toGoodupdata(changegood){
            // console.log(changegood);
            this.$router.push({name:'goodupdate',query:{changegood}})
        
        },


        // 删除商品
        delclick(e){
            // console.log("eee",e.currentTarget.parentNode.parentNode);
            console.log("ccc",e.currentTarget.parentElement.parentElement.firstElementChild);
            var changestyle = e.currentTarget.parentElement.parentElement.firstElementChild;
            
            console.log("准备删除的id",e.currentTarget.parentElement.parentElement.firstElementChild.firstElementChild.innerHTML);
            var gid = e.currentTarget.parentElement.parentElement.firstElementChild.firstElementChild.innerHTML;

            this.del(gid,changestyle);

        },
        // 删除商品也删除该页面中商品
        Funchangestyle(whodiv){
            whodiv.style.display="none"
        },

        

        
        

        // 返回上一页
         onClickLeft() {
             
             this.$router.go(-1)
        },

        selctalltype(){//将good表商品分类
            this.axios.get('http://127.0.0.1/all').then(res=>{
                // console.log("全部res",res.data);
                this.Allgoodlist = res.data
                // console.log("全部商品list",this.Allgoodlist);
                for(var i=0;i<this.Allgoodlist.length;i++){
                    this.Allgoodlist[i]['nownum'] = 1;
                    // this.Allgoodlist[i]['outdata'] = 0;//判断是否出库
                    //对象增加属性用来出库
                }

                for(var i=0;i<this.Allgoodlist.length;i++){
                    // console.log(this.Allgoodlist[i].goodId.charAt(0));
                    if (this.Allgoodlist[i].goodId.charAt(0)=='Y'){
                        this.yinliaolist.push(this.Allgoodlist[i])
                    }else if(this.Allgoodlist[i].goodId.charAt(0)=='L'){
                        this.lingshilist.push(this.Allgoodlist[i])
                    }else if(this.Allgoodlist[i].goodId.charAt(0)=='J'){
                        this.jiadianlist.push(this.Allgoodlist[i])
                    }else if(this.Allgoodlist[i].goodId.charAt(0)=='S'){
                        this.shumalist.push(this.Allgoodlist[i])
                    }else if(this.Allgoodlist[i].goodId.charAt(0)=='F'){
                        this.fuzhuanglist.push(this.Allgoodlist[i])
                    }else if(this.Allgoodlist[i].goodId.charAt(0)=='M'){
                        this.meizhuanglist.push(this.Allgoodlist[i])
                    }
                }

                this.Alltype.push(this.yinliaolist);
                this.Alltype.push(this.lingshilist);
                this.Alltype.push(this.jiadianlist);
                this.Alltype.push(this.shumalist);
                this.Alltype.push(this.fuzhuanglist);
                this.Alltype.push(this.meizhuanglist);

                console.log("分类好的全部商品",this.Alltype);


                // console.log("饮料的列表",this.yinliaolist);
                // console.log("零食的列表",this.lingshilist);
                // console.log("家电的列表",this.jiadianlist);
                // console.log("数码的列表",this.shumalist);
                // console.log("服装的列表",this.fuzhuanglist);
                // console.log("美妆的列表",this.meizhuanglist);
            }).catch(err=>{
                console.log("获取数据失败" + err);
            })
        
        
        
        },

        all() {    //查找good表全部数据
            this.axios.get('http://127.0.0.1/all').then(res=>{
                console.log(res.data);
                this.info = res.data
            }).catch(err=>{
                console.log("获取数据失败" + err);
            })
        },

        del(delid,changestyle) {    //删除操作
                Dialog.confirm({
                title: '提示',
                message: '是否确定删除？',
                })
                .then(() => {
                    // on confirm
                    this.axios.get('http://127.0.0.1/list/get',{
                        params: {
                        goodId: delid
                        },
                    }).then(res=>{
                            console.log("删除goodid",res.data[0].goodId); // 这句不能删除
                            this.axios.get('http://127.0.0.1/list/del',{
                                params: {
                                //这个req的params的goodid要与list.js中的query的数据一致，不然会报错 
                                goodId: delid
                                }
                            }).then(res=>{
                                this.$toast("删除商品成功")
                                this.Funchangestyle(changestyle)
                                console.log(res.data);
                            
                                // this.selctalltype()
                            }).catch(err=>{
                                console.log("操作失败" + err);
                            })

                        }).catch(err=>{
                            this.$toast("删除失败，该商品号不存在")
                            console.log("获取数据失败" + err);
                        })
                })
                .catch(() => {
                    // on cancel
                });
                
        },



        select() {    //查询操作
            this.axios.get('http://127.0.0.1/list/get',{
                // responseType: 'arraybuffer',
                params: {
                goodId: this.selectid
                },
                
            }).then(res=>{
                 console.log(res.data,"res data -selectend");
                 console.log("查询结果length",String(res.data).length);
                 if(String(res.data).length==0){
                     this.$toast("该商品号不存在")
                    //  console.log("bu");
                 }else{
                     this.$toast("查询商品成功")
                 }
                // console.log("goodid",res.data[0].goodId);
               
               
                // console.log(res.data[0].picture,"picture");
                // this.info = res.data
                

                // return res.data

                
                // let strss = "data:image/png;base64," + this.arrayBufferToBase64(res.data[0].picture.data);
                // let image1path = strss.replace(/[\r\n]/g,"")
                

                // this.selectimg = image1path

                // let blob11 = this.arrayBufferToBase64(res.data[0].picture.data); //获取第一个文件
                // console.log(blob11,"blob11");

                // let blobbb = new Blob([res.data[0].picture.data]); //获取第一个文件
                // console.log("blob",blobbb);
                // // var blob=res.data[0].picture.data;
                // this.blobToDataURI(blobbb,function(result){    //blob格式再转换为base64格式
                //     console.log("selectimg",result);
                //     this.selectimg = result;
                    
                
                // })
                
                // let blobbb = new Blob([res.data[0].picture.data]); //获取第一个文件
                // console.log("blob",blobbb);
                // let url = window.URL.createObjectURL(blob);
                // this.blobTobase(blob).then(res => {
                //     this.selectimg=res
                // })
                // this.selectimg=url
                // console.log(this.selectimg,"selectimg");
                
                // this.$toast("查询商品成功")
            }).catch(err=>{
                this.$toast("该商品号不存在")
                console.log("获取数据失败" + err);
            })
        },


       


       

       
        
  
    }
    
}
</script>

<style scoped>
    .van-button{
        height: 33px;
    }

    .van-search{
        margin-right: 74px;
    }

    .chazhaobtn{
        position: absolute;
        top: 96px;
        right: 24px;
    }

    .chazhaostyle{
        background: rgb(8, 146, 174);
    }

    .delete1{
        height: 140px;
    }

    
</style>