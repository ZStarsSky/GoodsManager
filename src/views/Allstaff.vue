<template>
    <div class="allstaff">
        <div class="topbox">
            <van-nav-bar
            title="员工信息"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            
            />
        </div>

        <div>
             <van-tabs v-model="active">
                <van-tab title="查看员工信息" @click="all">
                    <div class="allbox">
                        <div v-for="(item,index) in allstafflist" :key="index" class="staffbox" :style="del==item.username?'display:none':''">
                            <span class="text">员工用户名</span>
                            <span class="name">{{item.username}}</span>
                            <span class="delimg" @click="delstaff(item.username)"><img src="../assets/icon/删除.png" alt="" width="20px" height="20px"></span>
                        </div>

                    </div>

                </van-tab>


                <van-tab title="增加员工信息">
                    <van-field v-model="addusername" label="用户名" center placeholder="请输入长度大于6位用户名" class="inputbox"/>          
                    <van-field v-model="addpwd" label="密码" placeholder="请输入密码" class="inputbox" type="password"/>

                     <van-button type="primary" @click="addstaff" >确认添加</van-button>
                </van-tab>
             </van-tabs>
        </div>

        

    </div>
</template>

<script>
import '../assets/less/allstaff.less'
import { validForm } from "../assets/validForm.js";
import { Dialog } from 'vant';
export default {
    data(){
        return{
            allstafflist:[],
            del:'',
            active:0,
            addusername:'',
            addpwd:''

        
        }
    },


    created(){
        this.all()
    
    },

    methods:{
         onClickLeft(){
            this.$router.go(-1)
        },

         all() {    //查找全部员工全部数据
            this.axios.get('http://127.0.0.1/allstaff').then(res=>{
                console.log(res.data);
                this.allstafflist = res.data;
            }).catch(err=>{
                console.log("获取数据失败" + err);
            })
        },

        // 删除员工数据
        delstaff(name){
            
              Dialog.confirm({
                title: '提示',
                message: '是否确定删除？',
                })
                .then(() => {
                    // on confirm
                    this.axios.get('http://127.0.0.1/delstaff',{
                        params: {
                            username: name
                        },
                    }).then(res=>{
                        this.del = name;
                        console.log(name);
                        this.$toast(name+"已删除成功")

                    }).catch(err=>{
                        
                        console.log("获取数据失败" + err);
                    })
                })
                .catch(() => {
                    // on cancel
                });
        },

        // 增加员工信息
        addstaff(){
             let o = {
                username: {
                value: this.addusername,
                errorMsg: "用户名不能为空",
                reg:/^[^\s]*$/
                // 输入空格提示不能为空
                },
                password: {
                value: this.addpwd,
                errorMsg: "密码由字母数字下划线组合(4-16字符)",
                reg: /^[A-Za-z]\w{3,15}$/
                }
            };

            let isPass = validForm.valid(o);

            if (!isPass) {
                // 终止后面的操作
                return;
            }
            if(this.addusername == '') {
                this.$toast('用户名不能为空');
            }else if(this.addpwd == '') {
                this.$toast('密码不能为空');
            }else if(this.addusername.length<=6){
                this.$toast("用户名长度要大于6")
            }
            else{
                this.axios.post('http://127.0.0.1/register',{
                    params: {
                    //这个req的params的goodid要与list.js中的query的数据一致，不然会报错 
                        name:this.addusername,
                        password:this.addpwd,
                    }
                }).then(res=>{
                    if(res.data.status == 200) {
                        this.$toast('增加成功');
                       
                        
                    }else if(res.data.status == 202) {
                        this.$toast('用户名已存在,增加失败')
                        
                        this.addusername = '';
                        this.addpwd= '';
                        console.log(res.data.message);
                    
                        
                    }else{
                        console.log(res.data.message);
                    }
                }).catch(err=>{
                    this.$toast("添加失败")
                    console.log("获取数据失败" + err);
                })
            }
        }
            
    }
}
</script>

