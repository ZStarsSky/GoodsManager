
<template>
    <div>
        <div>
            <van-nav-bar
            title="确认出货"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            
            />
        </div>

        <div v-for="(item,index) in Alloutlist" :key="index">
            <van-card
            :num="item.outnum"
            :price="item.goutprice"
            :desc="'利润￥'+item.gprofit"
            :title="item.gname"
            :thumb="item.pic"
            
            >
            <!-- thumb="https://img01.yzcdn.cn/vant/ipad.jpeg" -->

            <template #tags>
                <span class="xiaoshou">￥{{item.sellmoney}}</span>
                
            </template>

            </van-card>
        </div>

        <!-- <button @click="getoutlistAll">444</button> -->
        <!-- <button @click="addexgood">555</button> -->
        <van-submit-bar :price="Allsellmoney*100"  button-text="保存出库" @submit="addexgood" />

        
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            outlist:this.$route.query.outlist,
            goodname:'雪碧',

            Alloutlist:[],//全部出库商品

            Allsellmoney:0,

            aa:5,
            
            username: window.sessionStorage.getItem('username'),


            goods:{
                gid:'',
                gname:'',
                gprofit:'',
                goutprice:'',
                
                // outtime:String(this.daytime()),
                outnum:'',
                
                sellmoney:'',
                oldnum:'',
                pic:'',
            }
        };
            
    },
    created(){
        console.log("商品确认出库页面",this.outlist);
        // console.log("username",this.username, window.sessionStorage.getItem('username'));
        // this.getoutlistAll();
        this.getoutlistAll()
    

    },


    methods: {
        onClickLeft(){
            this.$router.go(-1)
        },

        // 转化成出库数据
        getoutlistAll(){
            for(var i=0;i<this.outlist.length;i++){
                console.log(this.outlist[i][0],"id");
                var gprofit=String((parseFloat(this.outlist[i][2])-parseFloat(this.outlist[i][1]))*parseInt(this.outlist[i][3]))
                // console.log("利润",gprofit);
                var sellallmoney = String(parseFloat(this.outlist[i][2])*parseInt(this.outlist[i][3]))
                this.select(this.outlist[i][0],gprofit,String(this.outlist[i][3]),sellallmoney);
            }
            
        },


        select(outid,profit,outnum,sellallmoney) {    //查询操作
            this.axios.get('http://127.0.0.1/list/get',{
                params: {
                    goodId: outid
                },
                
            }).then(res=>{
                 console.log("商品查找结果",res.data);
                //  console.log("查询结果length",String(res.data).length);
                 if(String(res.data).length==0){
                     this.$toast("该商品号不存在")
                 }else{

                    this.goods.gid=outid;

                     console.log("商品名字",res.data[0].goodName);
                     this.goods.gname=res.data[0].goodName;
                    //  this.goods.outtime=String(this.daytime());
                     this.goods.gprofit=profit;
                     this.goods.outnum=outnum;
                     this.goods.goutprice=res.data[0].outprice;
                     this.goods.sellmoney = sellallmoney;
                     this.goods.oldnum = res.data[0].num;
                     this.goods.pic = res.data[0].gpic;

                    this.Alloutlist.push(this.goods);

                    this.Allsellmoney += parseFloat(this.goods.sellmoney);//计算出库总金额

                    console.log("全部出库商品",this.Alloutlist);
                    //  this.$toast("查询商品成功")
                    this.goods={}
                    // this.goods.username=this.username
                     console.log("查找成功");
                 }
            }).catch(err=>{
                this.$toast("该商品号不存在")
                console.log("获取数据失败" + err);
            })
        },




        // 获取当前时间
         daytime(){
            var today=new Date();
            var year = today.getFullYear()//年,月，日，时，分，秒
            var month = today.getMonth()+1 
            var day = today.getDate()   
            // var hour=today.getHours();  
            // var min=today.getMinutes();
            // var sec= today.getSeconds();

            var s = year+'/'+month+'/'+day;

            return s

            // console.log(s)
        },

        //将所有出库商品出库
        addexgood(){
            if(this.Alloutlist.length==0){
                this.$toast("请选择商品")   
            }else{
                for(var i=0;i<this.Alloutlist.length;i++){
                    // console.log("3333",this.Alloutlist[i]);
                    // this.zengjiaEXgoods(this.Alloutlist[i])!!!
                    this.updatagnum(this.Alloutlist[i].gid,this.Alloutlist[i].oldnum,this.Alloutlist[i].outnum,this.Alloutlist[i]);
                    
                
                }

                
            }
            this.$router.push({name:'goodout'})

        },

       

        // 修改对应商品的数量
        updatagnum(outid,oldnum,newnum,goodobject){
            var lastnum = oldnum - newnum;
            if(lastnum>=0){
                this.axios.get('http://127.0.0.1/list/updatanum',{
                    params: {
                        goodId: outid,
                        num:lastnum,
                    }
                    }).then(res=>{
                    console.log(res.data);
                    console.log("修改商品库存成功");
                    

                    this.axios.get('http://127.0.0.1/exgoods/add',{
                        params: {
                            goodId: goodobject.gid,
                            outnum:goodobject.outnum,
                            profit:goodobject.gprofit,
                            outtime:String(this.daytime()),
                            username:this.username,
                        }
                        }).then(res=>{
                        
                            //  console.log("出库表res:",res);
                            this.$toast("添加出库表成功")
                            console.log("添加出库表成功");
                            // this.all()

                        }).catch(err=>{
                        this.$toast("添加出库失败")
                        console.log("获取数据失败" + err);
                    })

                }).catch(err=>{
                    this.$toast("添加商品失败")
                    console.log("获取数据失败" + err);
                })
            }else{
                this.$toast(outid+"商品库存不足，请重新选择")
                return 'no';
            }


        },

    


       

    },


    


}
</script>


<style scoped>
    .van-card__title{
        margin-left: 27px;
    }
    .van-card__desc, .van-card__title{
        text-align: left;
    }

    .van-card__bottom{
        text-align: left;
        margin-left: 27px;
    }

    .xiaoshou{
        margin-right: -172px;
        font-size: 18px;
        text-align: left;
    }

    .van-card__desc{
        margin-left: 26px;
        margin-top: 8p;
    }

    .van-submit-bar__bar{
        background: #1d05051a;
        
    }
    .van-submit-bar__button--danger{
        background: linear-gradient(to right,#17de67,#29b98ad4);

    }

    .van-submit-bar__price{
        color: #0a11ee;
    }
</style>