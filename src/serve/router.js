let express = require('express')
let router = express.Router()
let user = require('./API/user')
let goods = require('./API/list')

let addgoods = require('./API/addgood')

let exgoods = require('./API/exgood')

// router.get('/user', user.get)

router.get('/all', goods.all)
router.get('/list/get', goods.get)//商品表的查找
router.get('/list/add', goods.add)
router.get('/list/update', goods.update)
router.get('/list/del', goods.del)
router.get('/list/getmoney', goods.getmoney)//通过id查询售价和进价数据

router.get('/list/updatanum',goods.updatanum) //商品表更改数量

router.get('/list/selectname',goods.selectname)

router.get('/list/upnumsort',goods.upnumsort)//数量升序

router.get('/list/downnumsort',goods.downnumsort)//数量降序

router.get('/list/upprice',goods.upprice);//价格升序

router.get('/list/downprice',goods.downprice)//价格降序

// 商品表的查找
// router.get('/select',goods.select)

// 登陆和注册
let login = require('./API/login')
router.get('/login', login.login)//登陆
router.post('/register', login.register)//注册
router.get('/changepwd',login.changepwd)//修改密码
router.get('/exist',login.exist);//查找该用户名是否存在
router.get('/allstaff',login.allstaff) //获取user表中的全部员工信息
router.get('/delstaff',login.delstaff)//删除员工信息


// 入库表
router.get('/addgoods/add',addgoods.add)//增加数据
router.get('/addgoods/all',addgoods.all)//查找全部数据
router.get('/addgoods/selectspend',addgoods.selectspend)//查找出库时间和花费金额
router.get('/addgoods/alladdnum',addgoods.alladdnum)//全部入库数
router.get('/addgoods/allspend',addgoods.allspend);  //获取addgoods表全部花费金额
router.get('/addgoods/Userselectaddlist',addgoods.Userselectaddlist)  //根据经手人查找addgoods表
router.get('/addgoods/Timeselectaddlist',addgoods.Timeselectaddlist)  //根据时间查找addgoods表


// 出库表
router.get('/exgoods/add',exgoods.add)//增加数据
router.get('/exgoods/all',exgoods.all)//查找全部数据
router.get('/exgoods/selectprofit',exgoods.selectprofit)//获取exgoods表的出库时间和利润
router.get('/exgoods/selectoutGood',exgoods.selectoutGood)//获取exgoods表的出库商品id和出库数量
router.get('/exgoods/alloutnum',exgoods.alloutnum)//全部出库数
router.get('/exgoods/allprofit',exgoods.allprofit) //获取exgoods表利润总额全部数据
router.get('/exgoods/allid',exgoods.allid)//获取exgoods表全部id不重复
router.get('/exgoods/Userselectexlist',exgoods.Userselectexlist)  //根据经手人查找exgoods表
router.get('/exgoods/Timeselectexlist',exgoods.Timeselectexlist)  //根据时间查找exgoods表


module.exports = router