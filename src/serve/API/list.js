let db = require('../db/index')

exports.all = (req, res) => {        //获取goods表全部数据
    var sql = 'select * from goods'
    db.query(sql, (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}
exports.get = (req, res) => {        //通过id查询数据
    var sql = 'select * from goods where goodId = ?'  
    db.query(sql, [req.query.goodId], (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}

exports.getmoney = (req, res) => {        //通过id查询售价和进价数据
    var sql = 'select inprice,outprice from goods where goodId = ?'  
    db.query(sql, [req.query.goodId], (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}

exports.selectname = (req, res) => {        //通过id查询商品名
    var sql = 'select goodName from goods where goodId = ?'  
    db.query(sql, [req.query.goodId], (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        // console.log(res);
        res.send(data)
    })
}


exports.upnumsort = (req, res) => {        //获取goods表按照数量排好序的数据(升序)
    var sql = 'select * from goods order by num '
    db.query(sql, (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}


exports.downnumsort = (req, res) => {        //获取goods表按照数量排好序的数据(降序)
    var sql = 'select * from goods order by num  desc'
    db.query(sql, (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}

exports.upprice = (req, res) => {        //获取goods表按照价格排好序的数据(升序)
    var sql = 'select * from goods order by outprice '
    db.query(sql, (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}

exports.downprice = (req, res) => {        //获取goods表按照价格排好序的数据(降序)
    var sql = 'select * from goods order by outprice desc'
    db.query(sql, (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}


// 查找goods表
// exports.select = (req, res) =>{
//     var sql = 'select * from goods where goodId = ?'  
//     db.query(sql, [req.query.goodId], (err, data) => {
//         if(err) {
//             return res.send({
//                 status: 400,
//                 message: "查找商品失败"
//             })
//         }
//         if(String(res.data).length==0){
//             return res.send({
//                 status:300,
//                 message:'该商品不存在',
//                 kk:"hhh"
//                 // newdata:data,
//             })
//         }
//         res.send(data)
//     })
// }

exports.del = (req, res) => {        //通过id删除数据
    var sql = 'delete from goods where goodId = ?'
    db.query(sql, [req.query.goodId], (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}

exports.add = (req, res) => {        //向goods表添加数据
    var sql = 'insert into goods (goodId,goodName,inprice,outprice,num,gpic) values (?,?,?,?,?,?)'
    db.query(sql, [req.query.goodId, req.query.goodName, req.query.inprice, req.query.outprice, req.query.num, req.query.picture], (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}

exports.update = (req, res) => {        //通过id更新数据
    var sql = 'update goods set goodName = ?,outprice = ?,num =?,gpic=? where goodId = ?'
    db.query(sql, [req.query.goodName, req.query.outprice, req.query.num,req.query.gpic, req.query.goodId], (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}


exports.updatanum = (req, res) => {        //通过id更新商品数据
    var sql = 'update goods set num =? where goodId = ?'
    db.query(sql, [req.query.num, req.query.goodId], (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}