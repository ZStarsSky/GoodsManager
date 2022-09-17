
// let db = require('../../assets/serve//db/index')
// class Good{
	

// 	constructor(gid,gname,ginprice,gsellprice,gnum,picture){
// 		this.gid=gid;
// 		this.gname=gname;
// 		this.ginprice=ginprice;
// 		this.gsellprice=gsellprice;
// 		this.gnum = gnum;
// 		this.picture = picture;
// 	}
	
// 	// 查找全部商品
// 	selectall(){
// 		var newdata ={}
// 		var sql = 'select * from goods where goodId = ?' 
// 		db.query(sql, (err, data) => {
// 			if(err) {
// 				console.log("错误"+err.message);
// 				// return res.send('错误：' + err.message)
// 			}
// 			newdata = data
// 		}) 

// 	}
// }