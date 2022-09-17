let db = require('../db/index')

// 入库存表

exports.add = (req, res) => {        //向exgoods表添加数据
    var sql = 'insert into exgoods (goodId,outnum,profit,outtime,username) values (?,?,?,?,?)'
    db.query(sql, [req.query.goodId, req.query.outnum, req.query.profit, req.query.outtime, req.query.username], (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}


exports.all = (req, res) => {        //获取exgoods表全部数据
    var sql = 'select * from exgoods'
    db.query(sql, (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}

exports.alloutnum = (req, res) => {        //获取exgoods表全部数据
    var sql = 'select outnum from exgoods'
    db.query(sql, (err, data) => {
        var allout = 0
        for(var i=0;i<data.length;i++){
            allout += data[i].outnum
        }
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(String(allout))
    })
}


exports.selectprofit = (req, res) => {        //获取exgoods表的出库时间和利润
    var sql = 'select profit,outtime,outnum from exgoods'
    db.query(sql,(err, data) => {
        var Alllist = data;
        var profitlist=[];
        var outtimelist =[];
        var outnumlist=[];
        for(var i=0;i<Alllist.length;i++){
            if(outtimelist.indexOf( Alllist[i].outtime)==-1){
                outtimelist.push(Alllist[i].outtime);
                profitlist.push(parseFloat((Alllist[i].profit*0.001).toFixed(1)))
                outnumlist.push(Alllist[i].outnum)
            }else{
                index = outtimelist.indexOf( Alllist[i].outtime)
                var money = parseFloat((Alllist[i].profit*0.001).toFixed(1)) + profitlist[index]
                profitlist[index] = money
                outnumlist[index] = outnumlist[index] +Alllist[i].outnum
            }
        }
        // console.log("出库钱",profitlist);
        // console.log("出库时间",outtimelist);
        var allmoneytime = [profitlist,outtimelist,outnumlist]
        
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(allmoneytime)
    })
}


// exports.selectoutGood = (req, res) => {        //获取exgoods表的出库商品id和出库数量
//     var sql = 'select goodId,outnum from exgoods'
//     db.query(sql, (err, data) => {
//         var Gallist = data;
//         var gidlist=[];
//         var outnumlist =[];
//         for(var i=0;i<Gallist.length;i++){
//             if(gidlist.indexOf( Gallist[i].goodId)==-1){
//                 outnumlist.push(Gallist[i].outnum);
//                 gidlist.push(Gallist[i].goodId)
//             }else{
//                 index = gidlist.indexOf( Gallist[i].goodId)
//                 var num = Gallist[i].outnum + outnumlist[index]
//                 outnumlist[index] = num
//             }
//         }
//         // console.log("出库id",gidlist);
//         // console.log("出库商品数量",outnumlist);
//         var Galllist = [gidlist,outnumlist]
        
//         if(err) {
//             return res.send('错误：' + err.message)
//         }
//         res.send(Galllist)
//     })
// }

exports.selectoutGood = (req, res) => {        //获取exgoods表的出库商品id和出库数量!!!!!!!
        var sql = 'SELECT SUM(outnum) AS goutnum FROM exgoods where goodId = ?'
        db.query(sql, [req.query.goodId],(err, data) => {
            if(err) {
                return res.send('错误：' + err.message)
            }
            res.send(data)
        })
    
}

exports.allid = (req, res) => {        //获取exgoods表全部id不重复
    var sql = 'select goodId from exgoods group by goodId' 
    db.query(sql, (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}






exports.allprofit = (req, res) => {        //获取exgoods表利润总额全部数据
    var sql = 'SELECT SUM(profit) AS profitall FROM exgoods;'
    db.query(sql, (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}


exports.Userselectexlist = (req, res) => {        //根据经手人查找exgoods表
    var sql = 'SELECT * FROM exgoods where username=?'
    db.query(sql, [req.query.username],  (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}

exports.Timeselectexlist = (req, res) => {        //根据时间查找exgoods表
    var sql = 'SELECT * FROM exgoods where outtime=?'
    db.query(sql, [req.query.outtime],  (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}
