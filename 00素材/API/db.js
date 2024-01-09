//导入第三方模块，mysql的第三方模块
const mysql = require('mysql');

//创建一个连接数据库的桥梁
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'wx27'
});

//打开桥梁
connection.connect();

//1.查询所有门店信息
module.exports.allstore=function(callback){
  let sql=`select * from store`;
  connection.query(sql,(err,data)=>{
    callback(data);
  })
}
//2.查询所有商品食物
module.exports.allfoods=function(callback){
  let sql=`select * from foods`;
  connection.query(sql,(err,data)=>{
    callback(data);
  })
}
//3.查询所有收获地址
module.exports.alladdress=function(callback){
  let sql=`select * from place`;
  connection.query(sql,(err,data)=>{
    callback(data);
  })
}
//根据id获取地址
module.exports.getidaddress=function(id,callback){
  let sql=`select * from place where id='${id}'`;
  connection.query(sql,(err,data)=>{
    callback(data);
  })
}
//4.新增地址,修改地址
module.exports.add_address=function(body,callback){
  // body是形参，是前端新增传入的信息
  let sql='';
  if (body.id) {//id为真，是修改
    sql=`update place set people='${body.people}',sex='${body.sex}',phone='${body.phone}',address='${body.address}',doornum='${body.doornum}',tips='${body.tips}' where id='${body.id}'`
  }else{//没有id为新增
    sql=`insert into place values(null,'${body.people}','${body.sex}','${body.phone}','${body.address}','${body.doornum}','${body.tips}')`
  }
  connection.query(sql,(err,data)=>{
    console.log(sql);
    callback(data)
  })
}
// 5.根据id，删除地址
module.exports.del_address=function(id,callback){
  let sql=`delete from place where id=${id}`
  connection.query(sql,(err,data)=>{
    callback(data)
  })
}
//6.添加购物车,修改购物车
// module.exports.add_car=function(body,callback){
//     var sql=`insert into shopcar values(null,'${body.pid}','${body.weight}','${body.price}','${body.fnum}','${body.state}','123','${}',)`;
//   connection.query(sql,(err,datas)=>{
//     callback(datas);
//   })
// }
//6.添加购物车,修改购物车
module.exports.add_car = function (body, callback) {
  var sql = `insert into shopcar values(null,'${body.pid}','${body.weight}','${body.price}','${body.fnum}','${body.state}','123','${body.storename}','${body.totalprice}')`;
  connection.query(sql, (err, datas) => {
    callback(datas);
  })
}

//7.删除购物车
module.exports.del_food=function(id,callback){
  let sql=`delete from shopcar where id=${id}`;
  connection.query(sql,(err,data)=>{
    callback(data)
  })
}
//7.1清空购物车
module.exports.del_car=function(callback){
  let sql=`delete from shopcar where uid=123`;
  connection.query(sql,(err,data)=>{
    callback(data)
  })
}
//8.修改购物车信息
module.exports.update_car=function(body,callback){
  var sql=`update shopcar set chose=${body.chose} where id=${body.id}`
  connection.query(sql,function(err,data){
    callback(data);
  })
}
module.exports.update_car2 = function (body, callback) {
  var sql = `update shopcar set fnum='${body.fnum}',totalprice='${body.sum}' where id='${body.id}'`;
  connection.query(sql, function (err, data) {
    callback(data);
  })
}
//9.查询所有购物车信息
module.exports.allshopcar=function(callback){
  let sql=`select a.*,b.foodname,b.pic from shopcar a join foods b on a.pid=b.id`;
  connection.query(sql,(err,data)=>{
    callback(data);
  })
}
// 10.总价查询
module.exports.searchtotal = function(callback){
  var sql = `select totalprice from shopcar where chose='0'`;
  connection.query(sql,(err,data)=>{
    console.log(data);
    callback(data);
  })
}
//11.订单页面，待支付商品查询
module.exports.payfood=function(callback){
  var sql=`select a.*,b.foodname,b.pic from shopcar a join foods b on a.pid=b.id where a.chose='0' and a.totalprice <> 0`;
  connection.query(sql,(err,data)=>{
    callback(data);
  })
}
//12.添加订单
module.exports.addorder=function(body,callback){
  var sql=`insert into dingdan values('${body.ordernum}','${body.selltime}','${body.total}','${body.beizhu}','0','${body.storename}','${body.aid}','${body.gettime}')`;
  connection.query(sql,(err,data)=>{
    callback(data);
  })
}
//13.添加订单购买详情
module.exports.addordersell=function(body,callback){
  var sql=`insert into shopcar1 values('${body.ordernum}','${body.pid}','${body.weight}','${body.price}','${body.fnum}','${body.storename}','${body.totalprice}','${body.foodname}','${body.pic}')`;
  connection.query(sql,(err,data)=>{
    callback(data);
  })
}
//14.查询所有订单信息，门店信息，地址信息，
module.exports.allorder=function(callback){
  var sql=`select * from dingdan a,place b,store c where a.aid=b.id and a.storename=c.name `;
  connection.query(sql,(err,data)=>{
    callback(data);
  })
}
//14.1查询订单购买详情
module.exports.allorder1=function(callback){
  var sql=`select a.*,b.foodname,b.pic from shopcar1 a join foods b on a.pid=b.id `;
  connection.query(sql,(err,data)=>{
    callback(data);
  })
}
//15.删除订单
module.exports.delorder=function(dnum,callback){
  let sql=`delete from dingdan where ordernum='${dnum}'`;
  console.log(sql);
  connection.query(sql,(err,data)=>{
    callback(data)
  })
}
//16.删除订单购物信息
module.exports.delorderfood=function(dnum,callback){
  let sql=`delete from shopcar1 where ordernum='${dnum}'`;
  connection.query(sql,(err,data)=>{
    callback(data)
  })
}
