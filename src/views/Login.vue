<template>
    <div class="login">
            
        <!-- 头部 -->
        <div class="nav-top">
        <div class="nav-left">
            <!-- <img src="../assets/logo.png" alt /> -->
            <!-- <span>Goods Manager System</span> -->
            <span>商 品 库 存 管 理 系 统</span>
        </div>
        
        </div>

        <!-- 图标 -->
        <!-- <div class="logo">
        <img
            src="https://inews.gtimg.com/newsapp_bt/0/13795847834/1000"
        />
        </div> -->

        <!-- 输入框 -->
        <div class="inp">
        <van-field v-model="userInfo.username" name="用户名" label="用户名" placeholder="用户名" class="nameIn"/>
        <van-field
            v-model="userInfo.password"
            :type="showPassword?'password':'text'"
            name="密码"
            label="密码"
            placeholder="密码"
            :right-icon="showPassword?'closed-eye':'eye-o'"
            @click-right-icon="showPassword=!showPassword"
            class="passwdIn"
        />
        <!-- 密码睁眼闭眼 （上面的 :right-icon和@click-right-icon）
        结合:type="showPassword?'password':'text'"来同时控制-->

        <!-- 忘记密码 -->
        <div class="wj" @click="changepassword">忘记密码</div>

        <!-- 登陆按钮 -->
        <div  class="loginbtn">
            <van-button  block type="info" native-type="submit" @click="login" color="rgb(53, 155, 177)">登陆</van-button>
        </div>
        <!-- 注册按钮 -->
        <div class="registerbtn">
            <van-button
            style="background:white;color:black;border:1px solid gray "
            color="rgb(53, 155, 177)"
            block
            type="info"
            native-type="submit"
            @click="showPopup"
            >注册</van-button>
        </div>
        </div>

        <!-- 注册弹出层 -->
        <van-popup v-model="show" position="bottom" closeable :style="{ height: '50%' }">
        <div class="register-box">
            <h1>注册</h1>
            <div class="register">
            <van-field v-model="registerInfo.username" name="用户名" label="用户名" placeholder="用户名" />
            <van-field
                v-model="registerInfo.password"
                :type="showPassword1?'password':'text'"
                name="密码"
                label="密码"
                placeholder="密码"
                :right-icon="showPassword1?'closed-eye':'eye-o'"
                @click-right-icon="showPassword1=!showPassword1"
            />

            
            <!-- 密码睁眼闭眼 （上面的 :right-icon和@click-right-icon）
            结合:type="showPassword?'password':'text'"来同时控制-->

            <div style="margin: 16px; margin-top:25px;">
                <van-button round block type="info" native-type="submit" @click="register">注册</van-button>
            </div>
            </div>
        </div>
        </van-popup>
    </div>
        

    
</template>

<script>
import '../assets/less/login.less'
import { validForm } from "../assets/validForm.js";





export default {
   
    data() {
        return {
        value: "",
        // 登陆信息
        userInfo: {
            username:"aa",
            password: "a4567"
        },

        // 注册的信息
        registerInfo: {
            username:"bb",
            password: "b123"
        },

        showPassword: true,
        showPassword1: true,

        // 显示注册
        show: false,

        };
    },

  created(){
    // this.sendEmit()

  },

  


  methods: {
 
    onSubmit(values) {
      console.log("submit", values);
    },
    // 显示注册的弹出层
    showPopup() {
      this.show = true;
    },

    // 修改密码
    changepassword(){
      this.$router.push({name:"changepassword"})
    },


    

    
    // 登陆
    login() {
      let o = {
        username: {
          value: this.userInfo.username,
          errorMsg: "用户名不能为空",
          reg:/^[^\s]*$/
        },
        password: {
          value: this.userInfo.password,
          errorMsg: "密码由数字字母下划线组合(4-16字符)",
          reg: /^[A-Za-z]\w{3,15}$/
        }
      };

      let isPass = validForm.valid(o);

      if (!isPass) {
        // 终止后面的操作
        return;
      }
      
      if(this.userInfo.username == '') {
        this.$toast('用户名不能为空');
      }else if(this.userInfo.password == '') {
        this.$toast('密码不能为空');
      }else{
        this.axios.get('http://127.0.0.1/login', {
          params: {
            name: this.userInfo.username,
            password: this.userInfo.password
          }
        }).then(res=>{
          console.log(res);
          
          // VueFunc.$emit("username",this.userInfo.username)
          if(res.data.status == 200) {
            window.sessionStorage.setItem("token", "loginok");
            // console.log("token",res.data.token);
            this.tohome(this.userInfo.username);
            
          
          }else{
            this.$toast('用户名或密码错误,登陆失败')
          }
        }).catch(err=>{
            console.log("登录失败" + err);
        })
      }
    },

    // 跳转到home页面，并传递参数
    tohome(username){
      console.log(username);
      window.sessionStorage.setItem('username',this.userInfo.username)
      // window.sessionStorage.getItem('数据名') sessionStorage
      
      
      this.$router.push({name:'Home',query:{username}})
      
      
    },

    

    // 注册
    register() {
      let o = {
        username: {
          value: this.registerInfo.username,
          errorMsg: "用户名不能为空",
          reg:/^[^\s]*$/
        },
        password: {
          value: this.registerInfo.password,
          errorMsg: "密码由字母数字下划线组合(4-16字符)",
          reg: /^[A-Za-z]\w{3,15}$/
        }
      };

      let isPass = validForm.valid(o);

      if (!isPass) {
        // 终止后面的操作
        return;
      }

      if(this.registerInfo.username == '') {
        this.$toast('用户名不能为空');
      }else if(this.registerInfo.password == '') {
        this.$toast('密码不能为空');
      }else{
        this.axios.post('http://127.0.0.1/register', {
          params: {
            name: this.registerInfo.username,
            password: this.registerInfo.password
          }
        }).then(res => {
          console.log(res);
          // console.log(res.data.message);
          if(res.data.status == 200) {
            this.$toast('注册成功');
            this.show=!this.show;
              
          }else if(res.data.status == 202) {
            this.$toast('用户名已存在,注册失败')
              
            this.registerInfo.username = '';
            this.registerInfo.password = '';
            console.log(res.data.message);
          
            
          }else{
            console.log(res.data.message);
          }
        }).catch(err => {
          console.log('操作失败' + err);
        })
      }
    }

  }
   


  
}
</script>

<style lang="css" scoped>
</style>