"use strict";(self["webpackChunkmanagerproject"]=self["webpackChunkmanagerproject"]||[]).push([[392],{1392:function(t,e,s){s.r(e),s.d(e,{default:function(){return c}});var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"mydata"},[s("div",{staticClass:"topbox"},[s("van-nav-bar",{attrs:{title:"个人资料","left-text":"返回","left-arrow":""},on:{"click-left":t.onClickLeft}})],1),s("div",{staticClass:"mydatabox"},[s("van-cell-group",[s("van-cell",{attrs:{title:"头像",center:""}},[[s("van-uploader",{attrs:{"after-read":t.afterRead,multiple:"","max-count":1},model:{value:t.fileList,callback:function(e){t.fileList=e},expression:"fileList"}},[s("img",{attrs:{src:t.IMG2,alt:"",width:"60px",height:"60px"}})])]],2),s("van-cell",{attrs:{title:"用户名",value:t.username}})],1)],1)])},a=[],n={data:function(){return{fileList:[{url:"https://img01.yzcdn.cn/vant/cat.jpeg",status:"done"}],username:window.sessionStorage.getItem("username"),img1:"",IMG2:String(window.sessionStorage.getItem("img"))}},created:function(){4!=this.IMG2.length?this.fileList[0].url=this.IMG2:this.IMG2="https://img01.yzcdn.cn/vant/cat.jpeg"},methods:{onClickLeft:function(){this.tomy(this.img1)},afterRead:function(t){t.status="uploading",t.message="上传中...",this.img1=this.fileList[0].content,window.sessionStorage.setItem("img",this.img1),setTimeout((function(){t.status="done",t.message="上传成功"}),1e3)},tomy:function(t){console.log(t),this.$router.push({name:"My",query:{img:t}})}}},l=n,o=s(1001),r=(0,o.Z)(l,i,a,!1,null,"992fec6c",null),c=r.exports}}]);
//# sourceMappingURL=392-legacy.489f0a40.js.map