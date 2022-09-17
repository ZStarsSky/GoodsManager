<template>
    <div class="changepassword">
        <div>
            <van-nav-bar
                title="修改密码"
                left-arrow
                @click-left="onClickLeft"
                
            />
        </div>
        <div class="box">
            <van-field v-model="userInfo.username" name="用户名" label="用户名" placeholder="用户名" class="nameIn" :style="who"/>
            <van-field
                    v-model="userInfo.newpassword"
                    :type="showPassword1?'password':'text'"
                    label="新的密码"
                    placeholder="输入新的密码"
                    :right-icon="showPassword1?'closed-eye':'eye-o'"
                    @click-right-icon="showPassword1=!showPassword1"
                    class="passwdIn"
                />
            <van-field
                    v-model="userInfo.copypassword"
                    :type="showPassword?'password':'text'"
                
                    label="再次输入密码"
                    placeholder="再一次输入新的密码"
                    :right-icon="showPassword?'closed-eye':'eye-o'"
                    @click-right-icon="showPassword=!showPassword"
                    class="passwdIn"
                />

            <div :style="fromto=='fromMy'?'display:none':''">
                <van-button  block type="info" native-type="submit" @click="changepasswd" color="rgb(53, 155, 177)" >确认修改</van-button>
            </div>
            <div :style="fromto!='fromMy'?'display:none':''">
                <van-button  block type="info" native-type="submit" @click="changepasswd2" color="rgb(53, 155, 177)" >提交修改</van-button>
            </div>
        </div>

         
    </div>
</template>

<script>
export default {
    data() {
        return {
            showPassword1: true,
            showPassword: true,
            userInfo: {
                username:"",
                newpassword: "",
                copypassword: "",
            },

            fromto:this.$route.query.FromMy,
            who:'',

            User: window.sessionStorage.getItem('username')
        }
    },

    created(){
        // console.log(this.fromto);
        if(this.fromto=="fromMy"){
            // console.log(44);
            this.who ='display:none'
        }
    
    },


    methods: {
        changepasswd(){
            if(this.userInfo.username == '') {
                this.$toast('用户名不能为空');
            }else if(this.userInfo.newpassword == '') {
                this.$toast('密码不能为空');
            }else if(this.userInfo.copypassword == '') {
                this.$toast('密码不能为空');
            }else if(this.userInfo.copypassword != this.userInfo.newpassword ) {
                this.$toast('两次输入的密码不正确，请重新输入');
            }else{
                this.axios.get('http://127.0.0.1/exist',{
                    params: {
                    username: this.userInfo.username,
                }
                }).then(res => {
                    if (res.data[0].username == this.userInfo.username){

                        this.axios.get('http://127.0.0.1/changepwd', {
                        params: {
                            username: this.userInfo.username,
                            password: this.userInfo.newpassword
                        }
                        }).then(res => {
                            console.log(res.status);
                            this.$toast('密码修改成功')
                            this.$router.push({name:"login"})
                        }).catch(err => {
                        console.log('修改密码失败' + err);
                        })
                    }
                
                }).catch(err => {
                    this.$toast("该用户名不存在")
                    console.log('修改密码失败' + err);
                })

                
            }
            
        },

        changepasswd2(){
            if(this.userInfo.newpassword == '') {
                this.$toast('密码不能为空');
            }else if(this.userInfo.copypassword == '') {
                this.$toast('密码不能为空');
            }else if(this.userInfo.copypassword != this.userInfo.newpassword ) {
                this.$toast('两次输入的密码不正确，请重新输入');
            }else{
                    this.axios.get('http://127.0.0.1/changepwd', {
                    params: {
                        username: this.User,
                        password: this.userInfo.newpassword
                    }
                    }).then(res => {
                        console.log(res.status);
                        this.$toast('密码修改成功')
                        this.$router.push({name:"My"})
                    }).catch(err => {
                    console.log('修改密码失败' + err);
                    })
            }
            
        },

        onClickLeft(){
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
    .box{
        height: 380px;
        width: 364px;
        background-color: rgba(255, 255, 255, 0.8);
        /* margin-top: 10px; */
        /* padding-top: 28px; */
        margin-left: 5px;
        border-radius: 10px;
    }
    .nameIn , .passwdIn{
        height: 52px;
        width: 350px;
        background-color: rgba(255, 255, 255, 0.7);
       
        /* margin-top: 10px; */
        margin: 15px 8px;
        /* padding-top: 5px; */
        

    }

   
</style>