"use strict";(self["webpackChunkmanagerproject"]=self["webpackChunkmanagerproject"]||[]).push([[63],{63:function(t,o,e){e.r(o),e.d(o,{default:function(){return r}});var a=function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"goodsort"},[e("van-nav-bar",{attrs:{title:"商品排序","left-text":"返回","left-arrow":""},on:{"click-left":t.onClickLeft}}),e("van-dropdown-menu",[e("van-dropdown-item",{attrs:{options:t.option1},model:{value:t.value1,callback:function(o){t.value1=o},expression:"value1"}}),e("van-dropdown-item",{attrs:{options:t.option2},nativeOn:{click:function(o){return t.sortpricefun.apply(null,arguments)}},model:{value:t.value2,callback:function(o){t.value2=o},expression:"value2"}})],1),t._l(t.goodlist,(function(t,o){return e("div",{key:o,staticClass:"goodbox"},[e("van-card",{attrs:{price:t.outprice,num:t.num,title:t.goodName,thumb:t.gpic}})],1)}))],2)},l=[],s={data(){return{value1:0,value2:"a",option1:[{text:"全部商品",value:0}],option2:[{text:"默认排序",value:"a"},{text:"价格升序",value:"b"},{text:"价格降序",value:"c"},{text:"数量升序",value:"d"},{text:"数量降序",value:"e"}],goodlist:[]}},created(){this.sortpricefun()},methods:{onClickLeft(){this.$router.go(-1)},sortpricefun(){"a"==this.value2?this.all():"b"==this.value2?this.upPricesort():"c"==this.value2?this.downPricesort():"d"==this.value2?this.upsort():this.downsort()},all(){this.axios.get("http://127.0.0.1/all").then((t=>{console.log(t.data,"good表全部数据"),this.goodlist=t.data})).catch((t=>{console.log("获取数据失败"+t)}))},upPricesort(){this.axios.get("http://127.0.0.1/list/upprice").then((t=>{console.log(t.data,"good表按照价格升序"),this.goodlist=t.data})).catch((t=>{console.log("获取数据失败"+t)}))},downPricesort(){this.axios.get("http://127.0.0.1/list/downprice").then((t=>{console.log(t.data,"good表按照价格降序"),this.goodlist=t.data})).catch((t=>{console.log("获取数据失败"+t)}))},upsort(){this.axios.get("http://127.0.0.1/list/upnumsort").then((t=>{console.log(t.data,"good表按照数量升序"),this.goodlist=t.data})).catch((t=>{console.log("获取数据失败"+t)}))},downsort(){this.axios.get("http://127.0.0.1/list/downnumsort").then((t=>{console.log(t.data,"good表按照数量降序"),this.goodlist=t.data})).catch((t=>{console.log("获取数据失败"+t)}))}}},i=s,n=e(1001),c=(0,n.Z)(i,a,l,!1,null,null,null),r=c.exports}}]);
//# sourceMappingURL=63.dfb29d49.js.map