<template>
<!-- 我的页面 -->
    <div class="my">
        <div class="mytitle">
            我的
        </div>

        
        <div class="mybox2">
            <van-cell-group>

            <van-cell value="">
                <template #title>
                    <div class="userbox">
                        <div class="imgbox">
                            <van-image
                            round
                            fit="cover"
                            width="5.5rem"
                            height="5.5rem"
                            :src="img1"
                            />
                        </div>

                        <div class="namebox">
                            <div class="name">{{username}}</div>
                            <div class="job">
                                <span>职位:</span>
                                <span >{{job}}</span>
                                
                            </div>
                            
                        </div>
                    </div>
                </template>
            </van-cell>

            <van-cell title="个人资料" is-link  @click="tomydata"/>
            <van-cell title="修改密码"  is-link @click="tochangepassword" />
            <van-cell title="员工信息"  is-link @click="tostaff" :style="username.length<=6 ?'':'display:none'"/>
            <van-cell title="退出系统"  is-link @click="tologin"/>
            
            </van-cell-group>


            <!-- <button @click="click1">555</button> -->
            

            
            
        </div>

        

      

    </div>
</template>

<script>
import '../assets/less/my.less'

import { Dialog } from 'vant';


export default {
    data(){
        return{
            username: window.sessionStorage.getItem('username'),
            img1:'',
            job:'',
        }
    },

    created(){
       
        this.changeimg();
        this.username = window.sessionStorage.getItem('username')
        console.log("username",this.username);

     
        if(this.username.length<=6){
            
            this.job = '老板'
          
        }else{
             this.job = '员工'
            // jobtext.text('员工')
        }
        
        // this.mounted();
    },

    //  mounted(){
    //         var _this = this;
    //         vueEvents.$on('username1',function(name){
    //             _this.username=name
    //             console.log(_this.username,"5555");
    //         })
            
    //     },

    

    methods:{

        tostaff(){//跳转员工信息页面
            this.$router.push({name:'allstaff'})
            
        },

        // click1(){
        //     console.log("888");
        //      VueFunc.$on("username",function(data){
        //     console.log("登陆名字",data);
        //     })
        // },
       
       tologin(){
            Dialog.confirm({
            title: '提示',
            message: '是否确定退出系统？',
            })
            .then(() => {
                window.sessionStorage.removeItem('token');
                window.sessionStorage.removeItem('username');
                window.sessionStorage.removeItem('img');
                this.$router.push({name:'login'})
            })
            .catch(() => {
                    // on cancel
            });

       },
        

        // 接收修改后的图片
        changeimg(){
            // console.log(this.$route.query.img,"img");
            // var s=String(this.$route.query.img);
            var img=String(window.sessionStorage.getItem("img"))
            // console.log("ssss",s);
            console.log("img长度",img.length);

            if (img.length ==4){
                this.img1 = 'https://img01.yzcdn.cn/vant/cat.jpeg'
            }else{
                this.img1 =img;
            }

        },

        tomydata(){
            // console.log(img);
            var img = this.img1;
            this.$router.push({name:'mydata',query:{img}})
      
        },

        // 修改密码
        tochangepassword(){
            var FromMy = "fromMy"
            this.$router.push({name:'changepassword',query:{FromMy}})
        }
    }
    
}
</script>