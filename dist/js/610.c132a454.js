"use strict";(self["webpackChunkmanagerproject"]=self["webpackChunkmanagerproject"]||[]).push([[610],{9610:function(t,s,i){i.r(s),i.d(s,{default:function(){return u}});var l=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"goodselect"},[i("div",[i("van-nav-bar",{staticClass:"bar",attrs:{title:"商品出库","left-arrow":""},on:{"click-left":t.onClickLeft}})],1),i("div",[i("van-search",{staticClass:"research",attrs:{placeholder:"商品号/名称"},on:{search:function(s){return t.chazhao(t.value,s)}},model:{value:t.value,callback:function(s){t.value=s},expression:"value"}}),i("van-button",{staticClass:"chazhaobtn",attrs:{type:"primary"},on:{click:function(s){return t.chazhao(t.value,s)}}},[t._v("查找")])],1),i("div",[i("van-tree-select",{staticClass:"nametree",attrs:{height:"175vw",items:t.items,"main-active-index":t.active},on:{"update:mainActiveIndex":function(s){t.active=s},"update:main-active-index":function(s){t.active=s}},scopedSlots:t._u([{key:"content",fn:function(){return t._l(t.Alltype,(function(s,l){return i("div",{key:l},[t.active===l?i("div",t._l(s,(function(s,l){return i("div",{key:l,staticClass:"fbox"},[i("van-swipe-cell",[i("div",{staticClass:"goodbox",style:s.goodId.indexOf(t.selectokshow)>=0&&""!=t.selectokshow||s.goodName.indexOf(t.selectokshow)>=0&&""!=t.selectokshow?"background:pink":""},[i("p",{staticClass:"iidd",staticStyle:{display:"none"}},[t._v(t._s(s.goodId))]),i("div",{staticClass:"imgbox"},[i("img",{attrs:{src:s.gpic,alt:""}})]),i("div",{staticClass:"textbox"},[i("div",{staticClass:"goodname"},[t._v(t._s(s.goodName))]),i("div",[i("span",{staticClass:"text"},[t._v("库存量")]),i("span",{staticClass:"num"},[t._v(t._s(s.num))])]),i("div",[i("span",{staticClass:"text"},[t._v("售价")]),i("span",{staticClass:"price"},[t._v("￥"+t._s(s.outprice))])])])]),i("div",{staticClass:"showbtn",on:{click:function(i){return t.clickshow(s.outdata,i)}}},[i("van-button",{staticClass:"selectbtn",attrs:{plain:"",hairline:"",type:"primary"}},[t._v("选择")])],1),i("div",{staticClass:"outcbtn",on:{click:function(i){return t.clicknum(s.nownum,i)}}},[i("van-stepper",{model:{value:s.nownum,callback:function(i){t.$set(s,"nownum",i)},expression:"gooditem.nownum"}})],1)])],1)})),0):t._e()])}))},proxy:!0}])})],1),i("div",[i("van-goods-action",[i("van-goods-action-button",{attrs:{type:"danger",text:"选好了"},on:{click:t.shuchu}})],1)],1)])},o=[],e=i(9515),a={data(){return{value:"",activeKey:0,active:0,items:[{text:"饮料"},{text:"零食"},{text:"家电"},{text:"数码"},{text:"服装"},{text:"美妆"}],name:"",Allgoodlist:[],yinliaolist:[],lingshilist:[],jiadianlist:[],shumalist:[],fuzhuanglist:[],meizhuanglist:[],Alltype:[],selectid:"",selectimg:"",showdata:0,outlist:[],outnumlist:[],Alloutlist:[],allclicknum:0,selectokshow:""}},created(){this.selctalltype()},methods:{chazhao(t,s){for(var i=0,l=0;l<this.Alltype.length;l++)for(var o=0;o<this.Alltype[l].length;o++)if(this.Alltype[l][o].goodId.indexOf(t)>=0||this.Alltype[l][o].goodName.indexOf(t)>=0){this.active=l,i=1,this.selectokshow=t,console.log(this.selectokshow);break}0==i&&this.$toast("该商品不存在")},shuchu(){for(var t=0;t<this.outlist.length;t++)this.selectIdnum(this.outlist[t]);console.log("id和num的list",this.outnumlist);for(var s=0;s<this.outnumlist.length;s++)this.getmoney(this.outnumlist[s][0],this.outnumlist[s][1]);console.log("出库的商品列表:id,进价，售价，出库数量",this.Alloutlist),e.Z.confirm({title:"提示",message:"是否确定出库？"}).then((()=>{this.toGoodoutRight(this.Alloutlist)})).catch((()=>{console.log("取消出库")}))},toGoodoutRight(t){console.log("跳转和出库列表",t),this.$router.push({name:"goodoutRight",query:{outlist:t}})},checklistid(t,s){for(var i=0;i<t.length;i++)return-1==t[i].indexOf(String(s))?-1:i},selectIdnum(t){console.log(t);for(var s=0;s<this.Alltype.length;s++)for(var i=0;i<this.Alltype[s].length;i++)(this.Alltype[s][i].goodId==t&&0==this.outnumlist.length||this.Alltype[s][i].goodId==t&&-1==this.checklistid(this.outnumlist,t))&&this.outnumlist.push([this.Alltype[s][i].goodId,this.Alltype[s][i].nownum])},getmoney(t,s){this.axios.get("http://127.0.0.1/list/getmoney",{params:{goodId:t}}).then((i=>{var l=i.data[0].inprice,o=i.data[0].outprice;if(console.log("商品id和售价和进价",t,l,o),0==this.Alloutlist.length)this.Alloutlist.push([t,l,o,s]);else{var e=this.checklistid(this.Alloutlist,t);-1==e&&this.Alloutlist.push([t,l,o,s])}})).catch((t=>{console.log("获取数据失败"+t)}))},clicknum(t,s){1},clickshow(t,s){s.currentTarget.nextElementSibling.className="showw",s.currentTarget.className="noshoww";var i=s.currentTarget.parentElement.firstElementChild.firstElementChild.innerHTML;this.outlist.push(i),console.log("即将出库商品id列表",this.outlist)},onClickIcon(){this.$toast("点击图标")},onClickButton(){this.$toast("点击按钮")},onClickLeft(){this.$router.push({name:"Home"})},selctalltype(){this.axios.get("http://127.0.0.1/all").then((t=>{this.Allgoodlist=t.data;for(var s=0;s<this.Allgoodlist.length;s++)this.Allgoodlist[s]["nownum"]=1,this.Allgoodlist[s]["outdata"]=0;for(s=0;s<this.Allgoodlist.length;s++)"Y"==this.Allgoodlist[s].goodId.charAt(0)?this.yinliaolist.push(this.Allgoodlist[s]):"L"==this.Allgoodlist[s].goodId.charAt(0)?this.lingshilist.push(this.Allgoodlist[s]):"J"==this.Allgoodlist[s].goodId.charAt(0)?this.jiadianlist.push(this.Allgoodlist[s]):"S"==this.Allgoodlist[s].goodId.charAt(0)?this.shumalist.push(this.Allgoodlist[s]):"F"==this.Allgoodlist[s].goodId.charAt(0)?this.fuzhuanglist.push(this.Allgoodlist[s]):"M"==this.Allgoodlist[s].goodId.charAt(0)&&this.meizhuanglist.push(this.Allgoodlist[s]);this.Alltype.push(this.yinliaolist),this.Alltype.push(this.lingshilist),this.Alltype.push(this.jiadianlist),this.Alltype.push(this.shumalist),this.Alltype.push(this.fuzhuanglist),this.Alltype.push(this.meizhuanglist),console.log("出库页面：分类好的全部商品",this.Alltype)})).catch((t=>{console.log("获取数据失败"+t)}))}}},n=a,h=i(1001),c=(0,h.Z)(n,l,o,!1,null,"e19030ac",null),u=c.exports}}]);
//# sourceMappingURL=610.c132a454.js.map