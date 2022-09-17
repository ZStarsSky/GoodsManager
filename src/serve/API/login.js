let db = require('../db/index')

// 登陆
exports.login = (req, res) => {
  var sql = 'select * from user where username = ? and password = ?'
  db.query(sql, [req.query.name, req.query.password], (err, data) => {
      if(err) {
          return res.send({
            status: 400,
            message: "登录失败"
          })
      }
      
      if(data.length > 0) {
        res.send({
          status: 200,
          message: "登录成功"
        })
      }else{
        res.send({
          status: 202,
          message: '用户名或密码错误'
        })
      }
  })
}

// 注册
exports.register = (req, res) => {
  const sql1 = 'select * from user where username = ?'
  const sql2 = 'insert into user (username, password) value (?, ?)'
  db.query(sql1, [req.body.params.name], (err, data) => {
    if(err) {
      return res.send({
        status: 400,
        message: "操作失败"
      })
    }
    if(data.length > 0) {
      return res.send({
        status: 202,
        message: '用户名已存在'
      })
    }else{
      db.query(sql2, [req.body.params.name, req.body.params.password], (err, data) => {
        if(err) {
            return res.send({
              status: 400,
              message: "注册失败"
            })
        }
        res.send({
          status: 200,
          message: "注册成功"
        })
      })
    }
  })
}

// 查找该用户名是否存在
exports.exist = (req, res) => {
  const sql = 'select * from user where username = ?'
  db.query(sql, [req.query.username], (err, data) => {
    if(err) {
        return res.send('错误：' + err.message)
    }
    res.send(data)
  })
}


// 修改密码
exports.changepwd = (req, res) => {
  
  const sql = 'update user set password = ? where username = ?'

 
      db.query(sql,[req.query.password,req.query.username], (err,data) => {
        if(err) {
          return res.send({
            status: 400,
            message: "修改密码失败"
          })
        }
        res.send({
          status: 200,
          message: "修改成功"
        })
      })
    
  
}


exports.allstaff = (req, res) => {        //获取user表中的全部员工信息
  var sql = 'select username from user  where length(username)>6;'
  db.query(sql, (err, data) => {
      if(err) {
          return res.send('错误：' + err.message)
      }
      res.send(data)
  })
}

exports.delstaff = (req, res) => {        //获取user表中的全部员工信息
  var sql = 'delete from user  where username = ?'
  db.query(sql,[req.query.username], (err, data) => {
      if(err) {
          return res.send('错误：' + err.message)
      }
      res.send(data)
  })
}
