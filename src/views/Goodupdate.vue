<template>
    <div class="goodupdate">

        <div>
            <van-nav-bar
            title="修改商品"
            left-arrow
            @click-left="onClickLeft"
            class="bar"
            />
        </div>

        <div>        
            <van-field v-model="updategood.gid" label="商品号"  readonly @click="nochange"/>
            <van-field v-model="updategood.gname" label="商品名" placeholder="请输入修改商品名" />
            <!-- <van-field v-model="updateinprice" type="number" label="商品进价" /> -->
            <van-field v-model="updategood.goutprice" type="number" label="商品售价" placeholder="请输入修改商品售价" />
            <van-field v-model="updategood.gnum" type="digit" label="商品数量" placeholder="请输入修改商品数量"  />
            <van-cell title="商品图片" >
                <template >
                    <input class="input_image left" type="file" @change="uploadImage($event)" accept="image/*" />
                    <img class="show_input_image left" :src="imgSrc" />
                </template>
            </van-cell>
            <van-button type="primary" @click="update">修改{{updategood.gid}}商品数据</van-button>
        </div>
    </div>
</template>

<script>
import { Dialog } from 'vant';
export default {
    data(){
        return{
            updategood:{},
            imgSrc:this.$route.query.changegood.gpic,
        }
    },

    created(){
        // this.all();
        this.updategood=this.$route.query.changegood
        console.log("修改商品页面的商品",this.updategood);
    

    },


    methods: {
        // 上传图片
        uploadImage(e) {
            //上传图片并预览
            let file = e.target.files[0]; //获取第一个文件
            let img = new FileReader();
            img.readAsDataURL(file);
            console.log("img:",img)
            img.onload = ({ target }) => {
                this.imgSrc = target.result; //将img转化为二进制数据,用来显示在页面中
            };
        },

        // 提示商品号不能修改
        nochange(){
            this.$toast("商品号不能修改")
        },
        // 返回上一页
         onClickLeft() {
             this.$router.go(-1)
        },

        all() {    //查找good表全部数据
            this.axios.get('http://127.0.0.1/all').then(res=>{
                console.log(res.data);
            }).catch(err=>{
                console.log("获取数据失败" + err);
            })
        },
        

        update() {     //修改操作
            Dialog.confirm({
                title: '提示',
                message: '是否确定修改？',
                })
                .then(() => {
                    // on confirm
                    if(this.updategood.gname==''){
                        this.$toast("商品名不能为空")
                    }else if(this.updategood.goutprice==''){
                        this.$toast("商品售价不能为空")
                    }else if(this.updategood.gnum==''){
                        this.$toast("商品数量不能为空")
                    }else{
                        this.axios.get('http://127.0.0.1/list/update',{
                            params: {
                            goodId: this.updategood.gid,
                            goodName: this.updategood.gname,
                            outprice:this.updategood.goutprice,
                            num:this.updategood.gnum,
                            gpic:this.imgSrc,
                            
                            }
                        }).then(res=>{
                            // console.log(res.data);
                            console.log("修改商品成功");
                            this.$toast("修改商品成功")
                            this.all()
                            this.$router.push({name:'goodselect'})
                        }).catch(err=>{
                            this.$toast("修改商品失败")
                            console.log("获取数据失败" + err);
                        })
                    }
                })
                .catch(() => {
                    // on cancel
                });
        }
    }
}
</script>

<style scoped>
    .input_image {
        position: relative;
        width: 171px;
        height: 148px;
        /* background-color: blue; */
        z-index: 999;
        /* opacity: 0; */
        top: 120px;
        left: 6px;
    }
    .show_input_image {
            position: absolute;
            left: 7px;
            width: 108px;
            height: 106px;
            margin-top: 5px;
            top: 3px;
    }

    .van-button--primary{
        background: #27cab5;
    }

    .van-cell__title,.van-cell__value{
          text-align: left;
          color: #646566;
      }
</style>