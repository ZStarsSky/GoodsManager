let db = require('../db/index')

// 入库存表

exports.add = (req, res) => {        //向addgoods表添加数据
    var sql = 'insert into addgoods (goodId,innum,spendmoney,intime,username) values (?,?,?,?,?)'
    db.query(sql, [req.query.goodId, req.query.innum, req.query.spendmoney, req.query.intime, req.query.username], (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}


exports.all = (req, res) => {        //获取addgoods表全部数据
    var sql = 'select * from addgoods'
    db.query(sql, (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}

exports.alladdnum = (req, res) => {        //获取addgoods表入库数据
    var sql = 'select innum from addgoods'
    db.query(sql, (err, data) => {
        // console.log(data);
        var alldata = data;
        var allin = 0
        for(var i=0;i<alldata.length;i++){
            allin = allin+alldata[i].innum
        }
        // console.log(allin);
        
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(String(allin))
    })
}


exports.selectspend = (req, res) => {        //获取addgoods表的出库时间和花费金额
    var sql = 'select spendmoney,intime,innum from addgoods'
    db.query(sql, (err, data) => {
        var Alllist = data;
        var moneylist=[];
        var intimelist =[];
        var innumlist=[];
        for(var i=0;i<Alllist.length;i++){
            if(intimelist.indexOf( Alllist[i].intime)==-1){
                intimelist.push(Alllist[i].intime);
                moneylist.push(parseFloat((Alllist[i].spendmoney*0.001).toFixed(1)));
                innumlist.push(Alllist[i].innum)
            }else{
                index = intimelist.indexOf( Alllist[i].intime)
                var money = parseFloat((Alllist[i].spendmoney*0.001).toFixed(1)) + moneylist[index]
                moneylist[index] = money

                innumlist[index] = innumlist[index] +Alllist[i].innum
            }
        }
        // console.log("入库钱",moneylist);
        // console.log("入库时间",intimelist);
        var allmoneytime = [moneylist,intimelist,innumlist]
        
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(allmoneytime)
    })
}





exports.allspend = (req, res) => {        //获取addgoods表全部花费金额
    var sql = 'SELECT SUM(spendmoney) AS spendall FROM addgoods'
    db.query(sql,(err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}



exports.Userselectaddlist = (req, res) => {        //根据经手人查找addgoods表
    var sql = 'SELECT * FROM addgoods where username=?'
    db.query(sql, [req.query.username],  (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}

exports.Timeselectaddlist = (req, res) => {        //根据时间查找addgoods表
    var sql = 'SELECT * FROM addgoods where intime=?'
    db.query(sql, [req.query.intime],  (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}