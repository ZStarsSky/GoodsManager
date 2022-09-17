<template>
    <div class="mydata">
        <div class="topbox">
            <van-nav-bar
            title="个人资料"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            
            />


            
        </div>

        


        <div class="mydatabox">
            <van-cell-group>

            <van-cell title="头像" center>
            <!-- 使用 title 插槽来自定义标题 -->
                <template >
                     
                    <van-uploader v-model="fileList" :after-read="afterRead" multiple :max-count="1"  >
                        <img :src="IMG2" alt="" width="60px" height="60px">
                    </van-uploader>
                    <!-- <img :src="IMG2" alt=""> -->
                </template>
            </van-cell>

            <van-cell title="用户名" :value="username" />
            
            </van-cell-group>
        </div>
       

        
    </div>
</template>

<script>
import { Dialog } from 'vant';
export default {
    data(){
        return{
            fileList: [
                {
                url: 'https://img01.yzcdn.cn/vant/cat.jpeg',
                // url:this.IMG2,
                status: 'done',
                // message: '上传完成',
                },
                
            ],

            username: window.sessionStorage.getItem('username'),

            // img1:this.$route.query.img,
            img1:'',
            IMG2:String(window.sessionStorage.getItem('img')),

        }
    },


    created(){
        
        // console.log("iiimmg",this.IMG2);
       
        if(this.IMG2.length!=4){
            this.fileList[0].url = this.IMG2;
        }else{
            this.IMG2='https://img01.yzcdn.cn/vant/cat.jpeg'
        }
    },

    methods:{
        onClickLeft(){
            // this.$router.go(-1)
            this.tomy(this.img1);
        },

        // 组件添加图片时加载
        afterRead(file) {
            file.status = 'uploading';
            file.message = '上传中...';
            // console.log(this.fileList[0].content);
            this.img1=this.fileList[0].content;
            window.sessionStorage.setItem('img',this.img1)
            
            


            setTimeout(() => {
                file.status = 'done';
                file.message = '上传成功';
            }, 1000);
        },

        tomy(img){
            console.log(img);
            this.$router.push({name:'My',query:{img}})
      
        },

        
    }
}
</script>

<style scoped>

        .van-uploader__preview{
            display: none;
        }

        .mydata{
            /* background: #5ebdb182; */
            /* height: 180px; */
            background: #f6f6f6;
            height: 672px;
        }

        .topbox{
            background: #5ebdb182;
            height: 180px;
        }

        .mydatabox{
           
            width: 94%;
            /* background: rgba(255, 255, 255, .6); */
            /* margin:55px auto; */
            position: absolute;
            top:107px;
            left: 11px;
            
        }
        .van-image__img{
            border-radius: 50%;
        }

        .van-cell__title{
            text-align: left;
        }

        .van-cell,.van-cell-group{
            border-radius: 10px;
            background: white;
        }
    
</style>