"use strict";(self["webpackChunkmanagerproject"]=self["webpackChunkmanagerproject"]||[]).push([[462],{462:function(t,o,s){s.r(o),s.d(o,{default:function(){return r}});var e=function(){var t=this,o=t.$createElement,s=t._self._c||o;return s("div",[s("div",[s("van-nav-bar",{attrs:{title:"确认出货","left-text":"返回","left-arrow":""},on:{"click-left":t.onClickLeft}})],1),t._l(t.Alloutlist,(function(o,e){return s("div",{key:e},[s("van-card",{attrs:{num:o.outnum,price:o.goutprice,desc:"利润￥"+o.gprofit,title:o.gname,thumb:o.pic},scopedSlots:t._u([{key:"tags",fn:function(){return[s("span",{staticClass:"xiaoshou"},[t._v("￥"+t._s(o.sellmoney))])]},proxy:!0}],null,!0)})],1)})),s("van-submit-bar",{attrs:{price:100*t.Allsellmoney,"button-text":"保存出库"},on:{submit:t.addexgood}})],2)},l=[],i={data(){return{outlist:this.$route.query.outlist,goodname:"雪碧",Alloutlist:[],Allsellmoney:0,aa:5,username:window.sessionStorage.getItem("username"),goods:{gid:"",gname:"",gprofit:"",goutprice:"",outnum:"",sellmoney:"",oldnum:"",pic:""}}},created(){console.log("商品确认出库页面",this.outlist),this.getoutlistAll()},methods:{onClickLeft(){this.$router.go(-1)},getoutlistAll(){for(var t=0;t<this.outlist.length;t++){console.log(this.outlist[t][0],"id");var o=String((parseFloat(this.outlist[t][2])-parseFloat(this.outlist[t][1]))*parseInt(this.outlist[t][3])),s=String(parseFloat(this.outlist[t][2])*parseInt(this.outlist[t][3]));this.select(this.outlist[t][0],o,String(this.outlist[t][3]),s)}},select(t,o,s,e){this.axios.get("http://127.0.0.1/list/get",{params:{goodId:t}}).then((l=>{console.log("商品查找结果",l.data),0==String(l.data).length?this.$toast("该商品号不存在"):(this.goods.gid=t,console.log("商品名字",l.data[0].goodName),this.goods.gname=l.data[0].goodName,this.goods.gprofit=o,this.goods.outnum=s,this.goods.goutprice=l.data[0].outprice,this.goods.sellmoney=e,this.goods.oldnum=l.data[0].num,this.goods.pic=l.data[0].gpic,this.Alloutlist.push(this.goods),this.Allsellmoney+=parseFloat(this.goods.sellmoney),console.log("全部出库商品",this.Alloutlist),this.goods={},console.log("查找成功"))})).catch((t=>{this.$toast("该商品号不存在"),console.log("获取数据失败"+t)}))},daytime(){var t=new Date,o=t.getFullYear(),s=t.getMonth()+1,e=t.getDate(),l=o+"/"+s+"/"+e;return l},addexgood(){if(0==this.Alloutlist.length)this.$toast("请选择商品");else for(var t=0;t<this.Alloutlist.length;t++)this.updatagnum(this.Alloutlist[t].gid,this.Alloutlist[t].oldnum,this.Alloutlist[t].outnum,this.Alloutlist[t]);this.$router.push({name:"goodout"})},updatagnum(t,o,s,e){var l=o-s;if(!(l>=0))return this.$toast(t+"商品库存不足，请重新选择"),"no";this.axios.get("http://127.0.0.1/list/updatanum",{params:{goodId:t,num:l}}).then((t=>{console.log(t.data),console.log("修改商品库存成功"),this.axios.get("http://127.0.0.1/exgoods/add",{params:{goodId:e.gid,outnum:e.outnum,profit:e.gprofit,outtime:String(this.daytime()),username:this.username}}).then((t=>{this.$toast("添加出库表成功"),console.log("添加出库表成功")})).catch((t=>{this.$toast("添加出库失败"),console.log("获取数据失败"+t)}))})).catch((t=>{this.$toast("添加商品失败"),console.log("获取数据失败"+t)}))}}},a=i,n=s(1001),u=(0,n.Z)(a,e,l,!1,null,"e2a322f2",null),r=u.exports}}]);
//# sourceMappingURL=462.a98a171b.js.map