"use strict";(self["webpackChunkmanagerproject"]=self["webpackChunkmanagerproject"]||[]).push([[256],{6256:function(s,o,e){e.r(o),e.d(o,{default:function(){return h}});var t=function(){var s=this,o=s.$createElement,e=s._self._c||o;return e("div",{staticClass:"changepassword"},[e("div",[e("van-nav-bar",{attrs:{title:"修改密码","left-arrow":""},on:{"click-left":s.onClickLeft}})],1),e("div",{staticClass:"box"},[e("van-field",{staticClass:"nameIn",style:s.who,attrs:{name:"用户名",label:"用户名",placeholder:"用户名"},model:{value:s.userInfo.username,callback:function(o){s.$set(s.userInfo,"username",o)},expression:"userInfo.username"}}),e("van-field",{staticClass:"passwdIn",attrs:{type:s.showPassword1?"password":"text",label:"新的密码",placeholder:"输入新的密码","right-icon":s.showPassword1?"closed-eye":"eye-o"},on:{"click-right-icon":function(o){s.showPassword1=!s.showPassword1}},model:{value:s.userInfo.newpassword,callback:function(o){s.$set(s.userInfo,"newpassword",o)},expression:"userInfo.newpassword"}}),e("van-field",{staticClass:"passwdIn",attrs:{type:s.showPassword?"password":"text",label:"再次输入密码",placeholder:"再一次输入新的密码","right-icon":s.showPassword?"closed-eye":"eye-o"},on:{"click-right-icon":function(o){s.showPassword=!s.showPassword}},model:{value:s.userInfo.copypassword,callback:function(o){s.$set(s.userInfo,"copypassword",o)},expression:"userInfo.copypassword"}}),e("div",{style:"fromMy"==s.fromto?"display:none":""},[e("van-button",{attrs:{block:"",type:"info","native-type":"submit",color:"rgb(53, 155, 177)"},on:{click:s.changepasswd}},[s._v("确认修改")])],1),e("div",{style:"fromMy"!=s.fromto?"display:none":""},[e("van-button",{attrs:{block:"",type:"info","native-type":"submit",color:"rgb(53, 155, 177)"},on:{click:s.changepasswd2}},[s._v("提交修改")])],1)],1)])},a=[],r={data(){return{showPassword1:!0,showPassword:!0,userInfo:{username:"",newpassword:"",copypassword:""},fromto:this.$route.query.FromMy,who:"",User:window.sessionStorage.getItem("username")}},created(){"fromMy"==this.fromto&&(this.who="display:none")},methods:{changepasswd(){""==this.userInfo.username?this.$toast("用户名不能为空"):""==this.userInfo.newpassword||""==this.userInfo.copypassword?this.$toast("密码不能为空"):this.userInfo.copypassword!=this.userInfo.newpassword?this.$toast("两次输入的密码不正确，请重新输入"):this.axios.get("http://127.0.0.1/exist",{params:{username:this.userInfo.username}}).then((s=>{s.data[0].username==this.userInfo.username&&this.axios.get("http://127.0.0.1/changepwd",{params:{username:this.userInfo.username,password:this.userInfo.newpassword}}).then((s=>{console.log(s.status),this.$toast("密码修改成功"),this.$router.push({name:"login"})})).catch((s=>{console.log("修改密码失败"+s)}))})).catch((s=>{this.$toast("该用户名不存在"),console.log("修改密码失败"+s)}))},changepasswd2(){""==this.userInfo.newpassword||""==this.userInfo.copypassword?this.$toast("密码不能为空"):this.userInfo.copypassword!=this.userInfo.newpassword?this.$toast("两次输入的密码不正确，请重新输入"):this.axios.get("http://127.0.0.1/changepwd",{params:{username:this.User,password:this.userInfo.newpassword}}).then((s=>{console.log(s.status),this.$toast("密码修改成功"),this.$router.push({name:"My"})})).catch((s=>{console.log("修改密码失败"+s)}))},onClickLeft(){this.$router.go(-1)}}},n=r,i=e(1001),c=(0,i.Z)(n,t,a,!1,null,"5c253c8d",null),h=c.exports}}]);
//# sourceMappingURL=256.cea8df64.js.map