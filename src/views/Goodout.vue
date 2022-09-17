<template>
<!-- 查询 -->
    <div class="goodselect">
        <div>
            <van-nav-bar
            title="商品出库"
            left-arrow
            @click-left="onClickLeft"
            class="bar"
            />
        </div>
        
        <!-- <van-search v-model="value" placeholder="商品号/名称"  class="research" @click="selctalltype" /> -->

        <div>
            <van-search v-model="value" placeholder="商品号/名称"  class="research" @search="chazhao(value,$event)"/>
            <van-button type="primary" class="chazhaobtn" @click="chazhao(value,$event)">查找</van-button>
        </div>

        <!-- <button @click="selectIdnum('Y1')">hhhhh</button> -->

        <div >
           

            <van-tree-select height="175vw" :items="items" :main-active-index.sync="active" class="nametree">
            <template #content >

                <div v-for="(item,index1) in Alltype" :key="index1">

                    <div v-if="active === index1"  >
                        
                            <div  v-for="(gooditem,index2) in item" :key="index2" class="fbox" >

                                <van-swipe-cell >

                                    <div class="goodbox" :style="gooditem.goodId.indexOf(selectokshow)>=0 && selectokshow!=''|| gooditem.goodName.indexOf(selectokshow)>=0  && selectokshow!='' ? 'background:pink':''">

                                        <p style="display:none" class="iidd">{{gooditem.goodId}}</p>

                                        <div class="imgbox">
                                            <img :src="gooditem.gpic" alt="" >
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

                                    

                                   
                                            <!-- <input @click="g(gooditem.outdata)" v-model="gooditem.outdata"/>{{gooditem.outdata}} -->
                                    <div class="showbtn"  @click="clickshow(gooditem.outdata,$event)">
                                        
                                        <van-button plain hairline type="primary"  class="selectbtn">选择</van-button>
                                    </div>

                                    <!-- 步进器，增加数量和减少数量按钮 -->
                                    <div class="outcbtn" @click="clicknum(gooditem.nownum,$event)" >
                                        <van-stepper v-model="gooditem.nownum" />
                                        <!-- <van-stepper v-model="gooditem.nownum" theme="round" button-size="22" disable-input /> -->
                                    </div>

                                    <!-- <input type="text" v-model="gooditem.nownum"> -->
                                   
                                </van-swipe-cell>

                            </div>               
                    </div>

                </div>

            </template>

            </van-tree-select>


            
        </div>

        

        <div>
            <van-goods-action>
            <!-- <van-goods-action-icon icon="send-gift-o" text="商品" @click="onClickIcon" />
            
            <div>总数：<span class="numtext">3</span></div>
             -->
            
            <van-goods-action-button
                type="danger"
                text="选好了"
                @click="shuchu"
            />
            </van-goods-action>
        </div>

        <!-- <button @click="">444</button> -->

       

    </div>
</template>


<script>
import '../assets/less/goodselect.less'
import { Dialog } from 'vant';



export default {
    data(){
        return{
            value:'',
            activeKey:0,
            active: 0,
            items: [{ text: '饮料' }, { text: '零食' },{ text: '家电' },{ text: '数码' },{ text: '服装' },{ text: '美妆' }],

            // a:1,
           
            name: '',
          
            Allgoodlist: [],
            // 饮料', '零食', '家电', '数码', '服装','美妆 的列表
            yinliaolist:[],
            lingshilist:[],
            jiadianlist:[],
            shumalist:[],
            fuzhuanglist:[],
            meizhuanglist:[],

            Alltype:[],//分类好的列表的组合

            
            selectid:'',
            selectimg:'',

            showdata:0,

            outlist:[],

            outnumlist:[],

            Alloutlist:[],

            allclicknum:0,

            selectokshow:'',
          
            

           


        };
    },

    created(){
        // this.all();
        this.selctalltype();
       
        
    

    },


    methods: {
      

        chazhao(ggid,e){// 输入id查找

            var a=0;
          
            for(var i=0;i<this.Alltype.length;i++){
                for(var j=0;j<this.Alltype[i].length;j++){
                    // console.log(this.Alltype[i][j].goodId);
                    if(this.Alltype[i][j].goodId.indexOf(ggid)>=0 || this.Alltype[i][j].goodName.indexOf(ggid)>=0){
                        this.active=i;
                        // oneboxlist[i].style.display=""
                        a=1
                        this.selectokshow=ggid //用来显示已查找到的商品

                        console.log(this.selectokshow);
                        break;
                    }
                }
            }
           
           if(a==0){
                this.$toast("该商品不存在")
           }
        },

        // 将出库id与相应的出库数量提取出来放到outnumlist列表中
        shuchu(){
            // console.log("22列表",this.Alltype);
            for(var k=0;k<this.outlist.length;k++){
                this.selectIdnum(this.outlist[k]);
                
            }
            console.log("id和num的list",this.outnumlist);
            for(var i=0;i<this.outnumlist.length;i++){
                this.getmoney(this.outnumlist[i][0],this.outnumlist[i][1])
                // this.getmoney(this.outnumlist[i][0]);
            }

            console.log("出库的商品列表:id,进价，售价，出库数量",this.Alloutlist);
            Dialog.confirm({
                title: '提示',
                message: '是否确定出库？',
                })
                .then(() => {
                    this.toGoodoutRight(this.Alloutlist);
                })
                .catch(() => {
                    console.log("取消出库");
                });

            

        },

        // 跳转到出库确认页
        toGoodoutRight(outlist){
            console.log("跳转和出库列表",outlist);
            this.$router.push({name:'goodoutRight',query:{outlist}})
        
        },

        // 检查列表中该商品id是否存在
        checklistid(list,id){
            for(var i=0;i< list.length;i++){
                if(list[i].indexOf(String(id))==-1){
                    return -1
                }else{
                    return i
                }
            }
        },

         // 查找整个Alltype列表，通过gid得到需要出库的数量的list（包含出库id和出库数量）
        selectIdnum(gid){
            console.log(gid);
            for(var i=0;i<this.Alltype.length;i++){
             
                for(var j=0;j<this.Alltype[i].length;j++){
                    // console.log("444",this.checklistid(this.outnumlist,gid));
                    if(this.Alltype[i][j].goodId == gid && this.outnumlist.length==0){
                        this.outnumlist.push([this.Alltype[i][j].goodId,this.Alltype[i][j].nownum])      
                    }
                    else if(this.Alltype[i][j].goodId == gid && this.checklistid(this.outnumlist,gid)==-1){
                        this.outnumlist.push([this.Alltype[i][j].goodId,this.Alltype[i][j].nownum])      
                    }
                    // else if(this.Alltype[i][j].goodId == gid && this.checklistid(this.outnumlist,gid)!=-1){
                    //     // this.outnumlist.push([this.Alltype[i][j].goodId,this.Alltype[i][j].nownum]) 
                    //     console.log("****",this.checklistid(this.outnumlist,gid));
                    //     console.log("---",this.outnumlist[this.checklistid(this.outnumlist,gid)][1]);
                    //     console.log("nownum",this.Alltype[i][j].nownum);
                    //     this.outnumlist[this.checklistid(this.outnumlist,gid)][1]=String(this.Alltype[i][j].nownum)
                    // }
                        
                }
                   
                
                

            }
           
        },

        // 商品id查找对应的售价和进价
        getmoney(moneyid,outnum){
             this.axios.get('http://127.0.0.1/list/getmoney',{
                params: {
                goodId: moneyid
                },
                
            }).then(res=>{
                
               
                var inmoney=res.data[0].inprice;
                var outmoney=res.data[0].outprice;
                 console.log("商品id和售价和进价",moneyid,inmoney,outmoney);

                if(this.Alloutlist.length ==0){
                     this.Alloutlist.push([moneyid,inmoney,outmoney,outnum])
                }
                else{
                  var ccheck = this.checklistid(this.Alloutlist,moneyid)
                  if(ccheck == -1){
                        this.Alloutlist.push([moneyid,inmoney,outmoney,outnum])
                    }
                    
                }

                

                
                
            }).catch(err=>{
                console.log("获取数据失败" + err);
            })
        },

       

        // 点击按钮增加出库的数量
        clicknum(gnum,e){
            gnum = gnum +1

            // this.allclicknum = this.allclicknum+1
            // console.log("点击次数",e.currentTarget.firstElementChild.firstElementChild.nextElementSibling);
            // console.log("商品id",e.currentTarget.parentElement.firstElementChild.firstElementChild.innerHTML);

        },

        // 点击展示增加数量按钮
        clickshow(outyes,e){
            // 修改样式
            // outyes = outyes+1;
            e.currentTarget.nextElementSibling.className = 'showw';
            e.currentTarget.className='noshoww'
            // console.log(e.currentTarget.nextElementSibling);
            // console.log(e.currentTarget);

            
            var outid = e.currentTarget.parentElement.firstElementChild.firstElementChild.innerHTML;
            // console.log("即将出库商品id",outid);
            this.outlist.push(outid);

            console.log("即将出库商品id列表",this.outlist);        

        },

        

       
        
        onClickIcon() {
            this.$toast('点击图标');
        },
        onClickButton() {
            this.$toast('点击按钮');
        },

        // 返回上一页
         onClickLeft() {
             this.$router.push({name:'Home'})
        },

        selctalltype(){//将good表商品分类
            this.axios.get('http://127.0.0.1/all').then(res=>{
                // console.log("全部res",res.data);
                this.Allgoodlist = res.data
                // console.log("全部商品list",this.Allgoodlist);
                for(var i=0;i<this.Allgoodlist.length;i++){
                    this.Allgoodlist[i]['nownum'] = 1;//判断出库数量
                    this.Allgoodlist[i]['outdata'] = 0;//判断是否出库
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

                console.log("出库页面：分类好的全部商品",this.Alltype);
            }).catch(err=>{
                console.log("获取数据失败" + err);
            })
        
        
        
        },

        



      



        

  

        
  
    }
    
}
</script>


<style scoped>
    /* .goodselect  */
    .van-button{
        height: 43px;
    }

    .van-goods-action-button--danger{
        background: linear-gradient(to right,#46dac6b8,#16a95e);
    }

    .box{
        width: 114px;
        text-align: left;
        margin-left: 50px;
        font-size: 15px;
    }

    .moneytext,.numtext{
        /* font-size: 18px; */
        font-weight: bold;
    }

    .showbtn{
        position: absolute;
        top:106px;
        left: 130px;
        
    }

    .selectbtn{
        height: 26px;
    }

    .showw{
        display: block;
    }

    .noshoww{
        display: none;
    }


     .van-button{
        height: 33px;
    }

    .van-search{
        margin-right: 74px;
    }

    .chazhaobtn{
        position: absolute;
        top: 58px;
        right: 10px;
    }

    .chazhaostyle{
        background: rgb(8, 146, 174);
    }

    .goodselect{
        background: white;
        height: 810px;
    }

    
</style>