<template>
    <div class="goodinout">
         <div>
            <van-nav-bar
            title="商品出入库详情"
            left-arrow
            @click-left="onClickLeft"
            class="bar"
            />
        </div>

        <div>
            <van-tabs v-model="active">
                <van-tab title="出库详情">
                    <van-search v-model="valueout" placeholder="请输入经手人或者时间"  @search="selectout"/>
                    <div class="allbox" >
                        <div class="box" v-for="(item,index) in outlist" :key="index">
                            <div> 
                                <span class="gtext">商品id</span>
                                <div class="ctext">{{item.goodId}}</div>
                            </div>
                            <div> 
                                <span class="gtext">商品数量</span>
                                <div class="ctext">{{item.outnum}}</div>
                            </div>
                            <div class="profit" :style="String(username).length >6?'display:none' : '' " > 
                                <span class="gtext">商品利润</span>
                                <div class="ctext"><span class="logo">￥</span> {{item.profit}}</div>
                            </div>
                            <div> 
                                <span class="gtext">商品时间</span>
                                <div class="ctext">{{item.outtime}}</div>
                            </div>
                            <div> 
                                <span class="gtext">经手人</span>
                                <div class="ctext">{{item.username}}</div>
                            </div>
                        </div>
                    </div>
                </van-tab>

                <van-tab title="入库详情">
                    <van-search v-model="valueadd" placeholder="请输入经手人或者时间"  @search="selectadd"/>
                    <div class="allbox" >
                        <div class="box" v-for="(item,index) in addlist" :key="index">
                            <div> 
                                <span class="gtext">商品id</span>
                                <div class="ctext">{{item.goodId}}</div>
                            </div>
                            <div> 
                                <span class="gtext">商品数量</span>
                                <div class="ctext">{{item.innum}}</div>
                            </div>
                            <div> 
                                <span class="gtext">商品花费</span>
                                <div class="ctext"><span class="logo">￥</span> {{item.spendmoney}}</div>
                            </div>
                            <div> 
                                <span class="gtext">商品时间</span>
                                <div class="ctext">{{item.intime}}</div>
                            </div>
                            <div> 
                                <span class="gtext">经手人</span>
                                <div class="ctext">{{item.username}}</div>
                            </div>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>

        
        
    </div>
</template>

<script>
import '../assets/less/goodinout.less'
export default {
     data(){
        return{
            active:0,
            outlist:[],
            addlist:[],
            username : window.sessionStorage.getItem('username'),
            valueadd:'',
            valueout:'',
        }
     },


    created(){
        this.allout()
        this.allin()

    },


    methods:{
         // 返回上一页
         onClickLeft() {
             this.$router.go(-1)
        },

        allout(){
            //查找good表全部数据
                this.axios.get('http://127.0.0.1/exgoods/all').then(res=>{
                    this.outlist = res.data
                    // console.log(res.data);
                    
                }).catch(err=>{
                    console.log("获取数据失败" + err);
                })
        },
        allin(){
            //查找good表全部数据
                this.axios.get('http://127.0.0.1/addgoods/all').then(res=>{
                    this.addlist = res.data
                    // console.log(res.data);
                    
                }).catch(err=>{
                    console.log("获取数据失败" + err);
                })
        },


        //

        selectout(){
            this.axios.get('http://127.0.0.1/exgoods/Userselectexlist',{
                  params: {
                        username: this.valueout
                        },
             }).then(res=>{
                   console.log(res.data);
                    if(res.data.length >0){
                        this.outlist = res.data;
                    }else{
                         this.axios.get('http://127.0.0.1/exgoods/Timeselectexlist',{
                            params: {
                                    outtime: this.valueout
                                    },
                        }).then(res=>{
                            console.log(res.data);
                            if(res.data.length>0){
                                this.outlist = res.data
                            }else{
                                this.$toast("查找失败，该搜索结果不存在")
                            }
                        }).catch(err=>{
                            console.log("获取数据失败" + err);
                        })

                    }
            
             }).catch(err=>{
                    console.log("获取数据失败" + err);
            })

        },

        selectadd(){
            
             this.axios.get('http://127.0.0.1/addgoods/Userselectaddlist',{
                  params: {
                        username: this.valueadd
                        },
             }).then(res=>{
                   console.log(res.data);
                    if(res.data.length >0){
                        this.addlist = res.data;
                    }else{
                         this.axios.get('http://127.0.0.1/addgoods/Timeselectaddlist',{
                            params: {
                                    intime: this.valueadd
                                    },
                        }).then(res=>{
                            console.log(res.data);
                            if(res.data.length>0){
                                this.addlist = res.data
                            }else{
                                this.$toast("查找失败，该搜索结果不存在")
                            }
                        }).catch(err=>{
                            console.log("获取数据失败" + err);
                        })

                    }
            
             }).catch(err=>{
                    console.log("获取数据失败" + err);
            })
        },

       
    }
    
}
</script>