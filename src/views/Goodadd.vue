


<template>
    <!-- 增加商品 -->
    

    <div class="goodadd">

        <div>
            <van-nav-bar
            title="增加商品"
            left-text=""
            left-arrow
            @click-left="onClickLeft"
            />
        </div>

        <div>
            <van-tabs v-model="active">
                <van-tab title="增加新商品">
                    <div>
                        <van-cell left title="商品种类"   is-link :value="goodtype" @click="showPopup" arrow-direction="down"></van-cell>
                        <van-popup v-model="show" position="bottom" :style="{ height: '50%' }" >
                            <van-picker
                            title="商品种类"
                            show-toolbar
                            :columns="columns"
                            @confirm="onConfirm"
                            @cancel="onCancel"
                            />
                        </van-popup>

                        
                        <van-field v-model="addId" label="商品号" center placeholder="请输入商品号" class="inputbox"/>          
                        <van-field v-model="addname" label="商品名" placeholder="请输入商品名" class="inputbox"/>
                        <van-field v-model="addinprice" type="number" placeholder="请输入商品进价" label="商品进价" />
                        <van-field v-model="addoutprice" type="number" placeholder="请输入商品售价" label="商品售价" />
                        <van-field v-model="addnum" type="digit" placeholder="请输入商品数量" label="商品数量"  />
                        
                    

                        <!-- <input class="input_image left" type="file" @change="uploadImage($event)" accept="image/*" />
                        <img class="show_input_image left" :src="imgSrc" /> -->

                        <van-cell title="商品图片" >
                        <!-- 使用 title 插槽来自定义标题 -->
                            <template >
                                <!-- <van-uploader v-model="fileList" :after-read="afterRead" multiple :max-count="1"  /> -->
                                
                                <input class="input_image left" type="file" @change="uploadImage($event)" accept="image/*" />
                                <img class="show_input_image left" :src="imgSrc" />
                            </template>
                        </van-cell>
                        
                    </div>
                    <van-button type="primary" @click="addgoods" >增加{{addId}}商品数据</van-button>

                </van-tab>
            <van-tab title="增加已有商品数量">
                <div>
                    <van-cell left title="商品种类"   is-link :value="goodtype" @click="showPopup" arrow-direction="down"></van-cell>
                    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }" >
                        <van-picker
                        title="商品种类"
                        show-toolbar
                        :columns="columns"
                        @confirm="onConfirm"
                        @cancel="onCancel"
                        />
                    </van-popup>

                    
                    <van-field v-model="addId" label="商品号" center placeholder="请输入商品号" class="inputbox"/>          
                    <!-- <van-field v-model="addname" label="商品名" placeholder="请输入商品名" class="inputbox"/> -->
                    <!-- <van-field v-model="addinprice" type="number" placeholder="请输入商品进价" label="商品进价" /> -->
                    <!-- <van-field v-model="addoutprice" type="number" placeholder="请输入商品售价" label="商品售价" /> -->
                    <van-field v-model="addnum" type="digit" placeholder="请输入商品数量" label="商品数量"  />
                    
                

                    <!-- <input class="input_image left" type="file" @change="uploadImage($event)" accept="image/*" />
                    <img class="show_input_image left" :src="imgSrc" /> -->
                   
                    
                </div>
                <van-button type="primary" @click="addgoods2" >增加{{addId}}商品数据</van-button>
            </van-tab>
            
            </van-tabs>

        </div>


        <!-- <button @click="add">555</button> -->
        
        

        <!-- <button @click="addgoods('a1')">点击</button> -->
        

         
    </div>
</template>

<script>
import { Dialog } from 'vant';
import { Toast } from 'vant';
import '../assets/less/goodadd.less'

export default {
    data(){
        return{
            columns: ['饮料', '零食', '家电', '数码', '服装','美妆'],
            idListtype : ['Y','L','J','S','F','M' ],
            // 饮料', '零食', '家电', '数码', '服装','美妆 对应 y,l,j,s,f,m


            imgSrc:'',

            addId:'',
            addname:'',
            addinprice:'',
            addoutprice:'',
            addpicture:'',
            addnum:'',

            show: false,

            goodtype:'饮料',

            username: window.sessionStorage.getItem('username'),

            fileList: [
                // {
                // url: 'https://img01.yzcdn.cn/vant/tree.jpg',
                // status: 'done',
                // // message: '上传完成',
                // },
            ],
            active:0

        };
    },
   
    
 
    created() {
        
        
    },

    methods:{
        // 上传图片
        uploadImage(e) {
            //上传图片并预览
            let file = e.target.files[0]; //获取第一个文件
            let img = new FileReader();
            img.readAsDataURL(file);
            // console.log("img:",img)
            img.onload = ({ target }) => {
                this.imgSrc = target.result; //将img转化为二进制数据,用来显示在页面中
                // this.addpicture = this.imgSrc;
                // console.log("图片target:",target);
                this.addpicture=target.result
                console.log("图片长度",this.addpicture.length);
              
            };
        },
       
        all() {    //查找good表全部数据
            this.axios.get('http://127.0.0.1/all').then(res=>{
                console.log(res.data);
                this.info = res.data
            }).catch(err=>{
                console.log("获取数据失败" + err);
            })
        },

        add() {   //商品表添加操作
            this.axios.get('http://127.0.0.1/list/add',{
                params: {
                //这个req的params的goodid要与list.js中的query的数据一致，不然会报错 
                goodId: this.addId,
                goodName: this.addname,
                inprice: this.addinprice,
                outprice: this.addoutprice,
                num:this.addnum,
                picture: this.addpicture
                
                }
            }).then(res=>{
                // console.log("图片",this.addpicture);
                // console.log(res.data);
                this.$toast("添加商品成功")
                this.all()
                // this.zengjiaaddgoods(this.addinprice);//增加记录到入库表
            }).catch(err=>{
                this.$toast("添加商品失败")
                console.log("获取数据失败" + err);
            })
        },


        zengjiaaddgoods(gprice){ //入库表添加操作
            this.axios.get('http://127.0.0.1/addgoods/add',{
                params: {
                goodId: this.addId,
                innum:this.addnum,
                spendmoney:parseInt(this.addnum) * parseFloat(gprice),
                intime:String(this.daytime()),
                username:this.username,
                }
                }).then(res=>{
                    // console.log("入库花费",String(parseInt(this.addnum) * parseFloat(gprice)));
                    // console.log("入库时间",String(this.daytime()));
                    //  console.log("入库表res:",res);
                    // this.$toast("添加入库表成功")
                    console.log("添加入库表成功");
                    // this.all()

                }).catch(err=>{
                this.$toast("添加入库失败")
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


        // 修改对应商品的数量
        updatagnum(newnum){
            this.axios.get('http://127.0.0.1/list/updatanum',{
                params: {
                    goodId: this.addId,
                    num:newnum,
                }
                }).then(res=>{
                console.log(res.data);
                this.$toast("添加商品库存成功")
                this.all()
                // this.zengjiaaddgoods();//增加记录到入库表
            }).catch(err=>{
                this.$toast("添加商品失败")
                console.log("获取数据失败" + err);
            })


        },

        // 当商品存在时
        fangfa1(newnum,inprice){
            this.axios.get('http://127.0.0.1/list/updatanum',{
                params: {
                    goodId: this.addId,
                    num:newnum,
                }
                }).then(res=>{
                console.log(res.data);
                this.$toast("添加商品库存成功")
                this.all()
                this.zengjiaaddgoods(inprice);//增加记录到入库表
            }).catch(err=>{
                this.$toast("添加商品失败")
                console.log("获取数据失败" + err);
            })
        },

        // 商品不存在时
        fangfa2(){
            this.axios.get('http://127.0.0.1/list/add',{
                params: {
                //这个req的params的goodid要与list.js中的query的数据一致，不然会报错 
                goodId: this.addId,
                goodName: this.addname,
                inprice: this.addinprice,
                outprice: this.addoutprice,
                num:this.addnum,
                picture: this.addpicture
                
                }
            }).then(res=>{
                console.log(res.data);
                this.$toast("添加商品成功")
                this.all()
                this.zengjiaaddgoods(this.addinprice);//增加记录到入库表
            }).catch(err=>{
                this.$toast("添加商品失败")
                console.log("获取数据失败" + err);
            })

        },
        
        // 增加入库表和商品表，商品不存在时
        addgoods(){
            Dialog.confirm({
                title: '提示',
                message: '是否确定增加？',
                })
                .then(() => {
                    var re =  /^[A-Z0-9]+$/g; 
                    
                    // var re = /^A-Z\+?[1-9][0-9]*$/;
                    // var num = this.addname.replace(/[^0-9]/ig,"");  
                    // var zimu = this.addname.replace(/[^A-Z]+/ig,""); 
                    // console.log(zimu,Number(num));
                    
                    //  console.log(11);
                //    this.addname = val.replace(/[^\w]/g,'')
                //    console.log(11);
                //    console.log(this.addname,444);
                // this.addname.replace(/[^\d]/g,'')
            //      console.log(this.addId.match(/\d+/g),11 )
            //      console.log(this.addId.match(/a-zA-Z+/g),22);
            //     // value.replace(/[^a-zA-Z]/g,'')
            //    if(!re.test(this.addId)){
            //         this.$toast("请输入字母加数字")
            //     }
            //         else

                    if(this.addId == ''){
                        this.$toast("商品号不能为空")
                    }else if(this.addname == ''){
                        this.$toast("商品名不能为空")
                    }else if(this.addinprice == ''){
                        this.$toast("商品进价不能为空")
                    }else if(this.addoutprice == ''){
                        this.$toast("商品售价不能为空")
                    }else if(this.addnum == ''){
                        this.$toast("商品数量不能为空")
                    }
                    else{
                        this.axios.get('http://127.0.0.1/list/get',{
                            params: {
                            goodId: this.addId,
                            }
                        }).then(res=>{
                            console.log("res:",res);
                            console.log(String(res.data).length);
                            var len = String(res.data).length;
                            if(len==0){//如果该商品不存在，则直接添加进表,用方法2
                                this.fangfa2();//增加到商品表
                            }else{
                                // 如果存在，则更改相应商品表的数量，调用方法1
                                this.$toast("该商品已存在，请使用右边的增加方法")
                                // console.log("num",res.data[0].num);
                                // var oldnum = parseInt(res.data[0].num)
                                // var newnum =0;
                                // newnum=oldnum+parseInt(this.addnum);
                                // var price = res.data[0].inprice;

                                // this.fangfa1(newnum,price)
                                // this.updatagnum(newnum,"newnum");
                            }
                            console.log("查找成功");
                            
                        }).catch(err=>{
                            this.$toast("添加商品失败")
                            console.log("获取数据失败" + err);
                        })
                    }
                }).catch(() => {
                    // on cancel
                });

        },


        // 增加入库表和商品表，商品存在时
        addgoods2(){
            Dialog.confirm({
                title: '提示',
                message: '是否确定增加？',
                })
                .then(() => {
                    if(this.addId == ''){
                        this.$toast("商品号不能为空")
                    }else if(this.addnum == ''){
                        this.$toast("商品数量不能为空")
                    }else{
                        this.axios.get('http://127.0.0.1/list/get',{
                            params: {
                            goodId: this.addId,
                            }
                        }).then(res=>{
                            console.log("res:",res);
                            var len = String(res.data).length;
                            if(len==0){//如果该商品不存在，则直接添加进表,用方法2
                                this.$toast("该商品不存在，请使用左边的增加方法")
                            }else{
                                    // 如果存在，则更改相应商品表的数量，调用方法1
                                    console.log("num",res.data[0].num);
                                    var oldnum = parseInt(res.data[0].num)
                                    var newnum =0;
                                    newnum=oldnum+parseInt(this.addnum);
                                    var price = res.data[0].inprice;

                                    this.fangfa1(newnum,price)
                                
                                console.log("查找成功");
                            }
                            
                        }).catch(err=>{
                            this.$toast("添加商品失败")
                            console.log("获取数据失败" + err);
                        })
                    }
                }).catch(() => {
                    // on cancel
                });
                

        },


        







        // 组件添加图片时加载
         afterRead(file) {
            file.status = 'uploading';
            file.message = '上传中...';

            setTimeout(() => {
                file.status = 'done';
                file.message = '上传成功';
            }, 1000);
        },

        // 弹出提示框提示是否添加
        tishi(){
            Dialog.confirm({
                title: '提示',
                message: '是否添加商品数据',
                })
                .then(() => {
                    // on confirm
                })
                .catch(() => {
                    // on cancel
            });
        },

        // 弹出商品类型
        onConfirm(value, index) {
            this.goodtype =value;
            this.show =!this.show
            this.addId = this.idListtype[index];
        },
        onCancel() {
            this.show =!this.show
            // Toast('取消');
        },

        // 商品类型的弹出层
        showPopup() {
            this.show = true;
        },

        // 导航栏返回上一页
        onClickLeft(){
             this.$router.push({name:'Home'})
        }



    },

    

    



}


</script>

<style scoped>
 


</style>