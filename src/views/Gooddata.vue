<template>
    <div class="gooddata">
        <div class="goodtitle">
            报表
        </div>

        <div class="databox1">
            <div class="chutext">
                <span>出入库情况</span>
                <span class="mingxi" @click="TogoodInOut">明细</span>
            </div>
            <div class="box2" >
                <span class="moneybox">
                    <div class="text">出库总利润</div>
                    <span class="yuan">￥</span>
                    <span class="outmoneyText" :style="String(username).length <=6?'' : 'font-size:11px' " >{{Outmoney}}</span>
                </span>

                <span class="numbox">
                    <div class="text">出库总数</div>
                    <div class="num">{{Outnum}}</div>
                </span>
            </div>
            

            <div class="box3">
                <span class="moneybox">
                    <div class="text">入库总花费</div>
                    <div class="money">￥{{Inmoney}}</div>
                </span>

                <span class="numbox">
                    <div class="text">入库总数</div>
                    <div class="num">{{Innum}}</div>
                </span>
            </div>

                <!-- 扇形图 -->
              <span class="shanxingTitle" >出库数量排名前五的商品</span>
              <van-button plain type="info" @click="clickshowshanxing" class="shanxing" >扇形图</van-button>
              <div id="myChart" ></div>
            
            
            <van-button plain type="info" @click="zhexianall" class="zhexiang" >折线图</van-button>
            <!-- <van-button plain type="info" @click="zhexian2" class="zhexiang" :style="String(username).length <=6?'display:none' : '' ">折线图2</van-button> -->
            
            <div class="datapic" >
             
                <!-- 折线图 -->
               

                <div class="datapic2">
                    <div id="chartLineBox2" style="width: 90%;height: 70vh;"> </div>
                </div>

                 <div class="datapic2">
                    <div id="chartLineBox" style="width: 90%;height: 70vh;"> </div>
                </div>

                
                
            </div>

            
           
        </div>

          <!-- <button @click="Show">555</button> -->

    </div>
</template>

<script>
import '../assets/less/gooddata.less'




import * as echarts from 'echarts'


export default {
  
 
  data() {
    return {

      // 折线图
      Allspendtimelist:[],//入库

      Alloutlist:[],//出库


      addtimelist:[],//入库时间
      addspendlist:[],//入库利润
      Inmoney:0,//入库总利润
      Innum:'',//入库总数
      addnumlist:[],//入库的数量

      outprofitlist:[],//出库的利润
      Outmoney:0,//出库总利润
      Outnum:'',//出库总数
      outnumlist:[],//出库的数量


      // 扇形图
      poplist:[],
      numlist:[],
      idlist:[],
      namelist:[],
      name:'',
      NNamelist:[],
      index:0,

      Allpopgood:[],//排好序的扇形 图数据

      // gnamelist:[],
      
       echartsOption: {	// echarts选项，所有绘图数据和样式都在这里设置
                legend: {	//图表上方的图例
                  data: []
                },
                tooltip: {   //鼠标放到图上的数据展示样式
                    trigger: 'axis'
                },
                series: [{
                  name: '公司市值占比',
                  type: 'pie',
                  radius:'50%',
                 
                  center: ['50%', '50%'], 
                
                  data:[],
                 
                }],
       },

        username : window.sessionStorage.getItem('username'),
     

      

     
    }
  },

  created(){
    if(String(this.username).length <=6){
      // this.changetext()
    
       this.allspend()
      this.allprofit();
    
     
      
       
    }else{
      this.Outmoney='您没有权限查看'
      this.allspend();
     
    }
   
    //  这2个不能注释掉
    this.selectaddgood()//1
    this.selectexgood()//2
    // ——————————
    
    // this.selectOutnumgood()


    this.selectidnum();
    // this.selectOutnumgood('L8')

    

   

    

    
    
  },
  methods: {

    Show(){
       console.log("最受欢迎",this.Allpopgood);
    },

       allspend() {    //查找addgood表总花费数据
            this.axios.get('http://127.0.0.1/addgoods/allspend').then(res=>{
                console.log("入库花费总额",res.data[0].spendall);
                this.Inmoney = res.data[0].spendall;
                
            }).catch(err=>{
                console.log("获取数据失败" + err);
            })
        },

      allprofit() {    //查找exgood表总利润数据
            this.axios.get('http://127.0.0.1/exgoods/allprofit').then(res=>{
                console.log("出库利润总额",res.data[0].profitall);
                this.Outmoney = res.data[0].profitall;
                
            }).catch(err=>{
                console.log("获取数据失败" + err);
            })
      },
      // 查看商品库存明细
      TogoodInOut(){
        this.$router.push({name:'goodInOut'})

      }, 


    

   

    // ————扇形图数据————
    // 根据商品id查找name
      selectname(ggid){  
        this.axios.get('http://127.0.0.1/list/selectname',{       
            params: 
              {
                goodId:ggid
              },        
            }).then(res=>{
              // console.log("nnname",res.data);
              this.NNamelist[this.index]=res.data[0].goodName
              this.index++;
            }).catch(err=>{
                console.log("获取数据失败" + err);
            })       
      
      },

      // 将列表进行倒序排序
      sortlist(value){
        return function(a,b){
          return b[value] - a[value] //正序排序就是return a[num] - b[num]
        }
      },

     

      selectidnum(){
         this.axios.get('http://127.0.0.1/exgoods/allid',{              
            }).then(res=>{
                this.idlist=res.data;
                console.log("iiiddd",res.data);
                 for(var i=0;i<this.idlist.length;i++){
                    this.selectname(this.idlist[i].goodId);// 根据商品id查找name
                    this.selectOutnumgood(this.idlist[i].goodId)
                  }
                  console.log("名字", this.NNamelist);
              }).catch(err=>{
                
                console.log("获取数据失败" + err);
            })

      },

      selectOutnumgood(ggid) {   //获取exgoods表的出库商品id和出库数量
            this.axios.get('http://127.0.0.1/exgoods/selectoutGood',{   
               params: 
              {
                goodId:ggid
              },               
            }).then(res=>{
                // console.log("对应商品数量",res.data[0].goutnum);
                this.numlist.push(res.data[0].goutnum)
              }).catch(err=>{
                
                console.log("获取数据失败" + err);
            })
      },

     
    

    // 显示扇形图
      clickshowshanxing(){
        console.log("名字list",this.NNamelist);
        //  console.log("名字和num和id列表长度",this.NNamelist.length);
        for(var i=0;i<this.numlist.length;i++){
          this.Allpopgood.push({name:this.NNamelist[i],value:this.numlist[i],id:this.idlist[i]})
        }
        
        this.Allpopgood=this.Allpopgood.sort(this.sortlist("value"))// 将列表进行倒序排序

       

        this.echartsOption.series[0].data = this.Allpopgood.splice(0, 7)//输出数组的前5个数据

        var namelist = this.Allpopgood.splice(0, 7).name;//输出数组的前5个数据的商品名
        
        this.echartsOption.legend.data = namelist
        // console.log("999444出库欢迎商品",this.poplist);

        let myChart = echarts.init(document.getElementById('myChart'), 'light')	// 初始化echarts, theme为light
        myChart.setOption(this.echartsOption)	// echarts设置选项

      },

    // ——————————————

    


    // —————折线图的数据————
    selectaddgood() {    //查询花费和时间入库表操作
            this.axios.get('http://127.0.0.1/addgoods/selectspend',{               
            }).then(res=>{
                //  console.log("查询数据库入库表的时间和花费金额",res.data);
                 this.Allspendaddtimelist =Object.freeze(res.data);
                 console.log("入库表的时间和花费金额和数量",this.Allspendaddtimelist);
                 this.addtimelist = this.Allspendaddtimelist[1];
                 this.addspendlist = this.Allspendaddtimelist[0];
                 this.addnumlist = this.Allspendaddtimelist[2]

                //  入库总额
                // this.Inmoney=parseFloat(this.MoneyFun(this.addspendlist).toFixed(1))
          
                this.axios.get('http://127.0.0.1/addgoods/alladdnum',{               
                }).then(res=>{
                  this.Innum = res.data
                  console.log("入库总数",this.Innum);
                  // console.log("shushu",res);


                }).catch(err=>{
                
                console.log("获取数据失败" + err);
                })



                //  console.log("入库总额",this.Inmoney);
                //  console.log("入库时间",this.addtimelist);
                //  console.log("入库金额",this.addspendlist);
            }).catch(err=>{
                
                console.log("获取数据失败" + err);
            })
    },

    // 计算入出库总额
    MoneyFun(list){
      var allmoney=0.0
      for(var i=0;i<list.length;i++){
        allmoney =allmoney+ list[i];
      }
      return allmoney

    },

    selectexgood() {    //查询利润和时间出库表操作
            this.axios.get('http://127.0.0.1/exgoods/selectprofit',{               
            }).then(res=>{
                //  console.log("查询数据库入库表的时间和花费金额",res.data);
                 this.Alloutlist =Object.freeze(res.data);
                 console.log("出库表的时间和花费金额和数量",this.Alloutlist);
                //  this.addtimelist = this.Alloutlist[1];
                 this.outprofitlist = this.Alloutlist[0];
                //  console.log("出库时间",this.addtimelist);
                 console.log("出库金额",this.outprofitlist);

                 this.outnumlist=this.Alloutlist[2];

                //  出库总额
                // this.Outmoney = parseFloat(this.MoneyFun(this.outprofitlist).toFixed(1))
                // console.log("出库总额",this.Outmoney);

                 this.axios.get('http://127.0.0.1/exgoods/alloutnum',{               
                }).then(res=>{
                  this.Outnum = res.data
                  console.log("出库总数",this.Outnum);
                  // console.log("shushu",res);


                }).catch(err=>{
                
                console.log("获取数据失败" + err);
                })
            }).catch(err=>{
                
                console.log("获取数据失败" + err);
            })
    },

    // 两个折线图
    zhexianall(){
      if(this.username.length<=6){
      this.zhexian()
      this.zhexian2()
      }else{
        this.zhexian2()
      }

    },

    // 折线图
    zhexian(){
      this.chartLine = echarts.init(document.getElementById('chartLineBox'));
        // 指定图表的配置项和数据
        var option = {
            tooltip: {              //设置tip提示
                trigger: 'axis'
            },
            
            legend: {               //设置区分（哪条线属于什么）
                data:['出库利润金额','入库花费金额']
            },
            color: ['#8AE09F', '#FA6F53'],       //设置区分（每条线是什么颜色，和 legend 一一对应）
            xAxis: {                //设置x轴
                type: 'category',
                boundaryGap: false,     //坐标轴两边不留白
                // data: ["2019/1/1", "2019-2-1", '2019-3-1', '2019-4-1', '2019-5-1', '2019-6-1', '2019-7-1',],
                data:this.addtimelist,
                name: '时间',           //X轴 name
                nameTextStyle: {        //坐标轴名称的文字样式
                    color: '#FA6F53',
                    fontSize: 12,
                    padding: [10, 0, 0, -20],
                    // margin:[10,5,10,10]
                },
                axisLine: {             //坐标轴轴线相关设置。
                    lineStyle: {
                        color: '#FA6F53',
                    }
                }
            },
            yAxis: {
                name: '出入库金额 /千',
                nameTextStyle: {
                    color: '#FA6F53',
                    fontSize: 12,
                    padding: [10, 10, 5, 35]
                },
                axisLine: {
                    lineStyle: {
                        color: '#FA6F53',
                        margin:[10,5,10,10]
                    }
                },
                type: 'value'
            },
            series: [
              {
                name: '出库利润金额',
                // data:  [2, 0.5, 0.7, 0.8],
                data:this.outprofitlist,
                type: 'line',               // 类型为折线图
                lineStyle: {                // 线条样式 => 必须使用normal属性
                    normal: {
                        color: '#8AE09F',
                    }
                },
              },
              {
                name: '入库花费金额',
                // data: [2120, 3010, 11000, 8550],
                // data: [2.5, 3, 4, 7],
                data:this.addspendlist,
                type: 'line',
                lineStyle: {
                    normal: {
                        color: '#FA6F53',
                    }
                },
              }
          ]
        };
 
        // 使用刚指定的配置项和数据显示图表。
        this.chartLine.setOption(option);

        
    },

    zhexian2(){
      this.chartLine = echarts.init(document.getElementById('chartLineBox2'));
        // 指定图表的配置项和数据
        var option = {
            tooltip: {              //设置tip提示
                trigger: 'axis'
            },
            
            legend: {               //设置区分（哪条线属于什么）
                data:['出库数量','入库数量']
            },
            color: ['#8AE09F', '#FA6F53'],       //设置区分（每条线是什么颜色，和 legend 一一对应）
            xAxis: {                //设置x轴
                type: 'category',
                boundaryGap: false,     //坐标轴两边不留白
                // data: ["2019/1/1", "2019-2-1", '2019-3-1', '2019-4-1', '2019-5-1', '2019-6-1', '2019-7-1',],
                data:this.addtimelist,
                name: '时间',           //X轴 name
                nameTextStyle: {        //坐标轴名称的文字样式
                    color: '#FA6F53',
                    fontSize: 12,
                    padding: [10, 0, 0, -20],
                    // margin:[10,5,10,10]
                },
                axisLine: {             //坐标轴轴线相关设置。
                    lineStyle: {
                        color: '#FA6F53',
                    }
                }
            },
            yAxis: {
                name: '出入库数量',
                nameTextStyle: {
                    color: '#FA6F53',
                    fontSize: 12,
                    padding: [10, 10, 5, 35]
                },
                axisLine: {
                    lineStyle: {
                        color: '#FA6F53',
                        margin:[10,5,10,10]
                    }
                },
                type: 'value'
            },
            series: [
              {
                name: '出库数量',
                // data:  [2, 0.5, 0.7, 0.8],
                data:this.outnumlist,
                type: 'line',               // 类型为折线图
                lineStyle: {                // 线条样式 => 必须使用normal属性
                    normal: {
                        color: '#8AE09F',
                    }
                },
              },
              {
                name: '入库数量',
                // data: [2120, 3010, 11000, 8550],
                // data: [2.5, 3, 4, 7],
                data:this.addnumlist,
                type: 'line',
                lineStyle: {
                    normal: {
                        color: '#FA6F53',
                    }
                },
              }
          ]
        };
 
        // 使用刚指定的配置项和数据显示图表。
        this.chartLine.setOption(option);

        
    },


   



    
  },

  

  mounted(){
    // this.zhexian()
    // this.zhexian2()
    // console.log("此时的数",this.chartList);
    // this.selectOutnumgood()

    // 扇形图
    let myChart = echarts.init(document.getElementById('myChart'), 'light')	// 初始化echarts, theme为light
    
    

  },

}
</script>
