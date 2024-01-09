//引入模块
const express = require('express');
const cors = require('cors');
const db = require('./db');
const body_parser=require('body-parser')
const app = express();

//解决跨域
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "mytoken"); // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
  });
//处理参数
app.use(body_parser.json());
//获取post的参数
app.use(body_parser.urlencoded({ extended: false }));
//端口
app.listen(9090, function() {
  console.log('服务9090正在启动....');
});

//1.查询所有店面信息
app.get('/allstore',function(req,res){
  db.allstore((result)=>{
    // console.log(result);
    res.send({data:result})
  })
})
//2.查询所有商品食物
app.get('/allfoods',function(req,res){
  db.allfoods((result)=>{
    // console.log(res);
    res.send({data:result});
  })
})
//2.查询所有收获地址
app.get('/alladdress',function(req,res){
  db.alladdress((result)=>{
    // console.log(res);
    res.send({data:result});
  })
})
//根据id获取地址
app.get('/getidaddress',(req,res)=>{
  // console.log(req);
  db.getidaddress(req.query.id,function(datas){
    res.send({data:datas});
  })
})
// 3.新增地址
app.post('/add_address',function(req,res){
  db.add_address(req.body,function(datas){
    
    if (datas.affectedRows>0) {
      res.send({state:1})//添加成功
    }else{
      res.send({state:0})//添加失败
    }
  })
})
//4修改地址
app.post('/update_address',function(req,res){
  db.add_address(req.body,function(datas){
    if (datas.affectedRows>0) {
      res.send({state:1})//修改成功
    }else{
      res.send({state:0})//修改失败
    }
  })
})
// 5删除地址
app.get('/del_address',function(req,res){
  db.del_address(req.query.id,function(datas){
    if (datas.affectedRows>0) {
      res.send({state:1})//删除成功
    }else{
      res.send({state:0})//删除失败
    }
  })
})
//6.添加购物车
app.post('/add_car',function(req,res){
  db.add_car(req.body,function(datas){
    if (datas.affectedRows>0) {
      res.send({state:1})//添加成功
    }else{
      res.send({state:0})//添加失败
    }
  })
})
//7.删除单个食品
app.get('/del_food',function(req,res){
  db.del_food(req.query.id,function(data){
    if (data.affectedRows>0) {
      res.send({state:1})//删除成功
    }else{
      res.send({state:0})//删除失败
    }
  })
})
//7.1.清空购物车
app.get('/del_car',function(req,res){
  db.del_car(function(data){
    if (data.affectedRows>0) {
      res.send({state:1})//删除成功
    }else{
      res.send({state:0})//删除失败
    }
  })
})
//8.修改购物车
app.post('/update_car',function(req,res){
  db.update_car(req.body,function(datas){
    if (datas.affectedRows>0) {
      res.send({state:1})//修改成功
    }else{
      res.send({state:0})//修改失败
    }
  })
})
app.post('/update_car2', function (req, res) {
  console.log(req.body);
  db.update_car2(req.body, function (datas) {
    if (datas.affectedRows > 0) {
      res.send({ state: 1 })//修改成功
    } else {
      res.send({ state: 0 })//修改失败
    }
  })
})
//9.查询购物车信息
app.get('/allshopcar',function(req,res){
  db.allshopcar((result)=>{
    res.send({data:result});
  })
})
// 10.总价查询
app.get('/searchtotal', function (req, res) {
  db.searchtotal((result) => {
    res.send({ data: result });
  })
})
//11.订单页面，待支付商品查询
app.get('/payfood',function(req,res){
  db.payfood((datas)=>{
    res.send({data:datas});
  })
})
//12.添加订单
app.post('/add_order',function(req,res){
  db.addorder(req.body,(datas)=>{
    if (datas.affectedRows>0) {
      res.send({state:1})//添加成功
    }else{
      res.send({state:0})//添加失败
    }
  })
})
//13.添加订单购物详情
app.post('/add_orderfood',function(req,res){
  db.addordersell(req.body,(datas)=>{
    if (datas.affectedRows>0) {
      res.send({state:1})//添加成功
    }else{
      res.send({state:0})//添加失败
    }
  })
})
//14.查询所有订单信息
app.get('/allorder',function(req,res){
  db.allorder((datas)=>{
    res.send({data:datas});
  })
})
//14.查询所有订单购物详情
app.get('/allordersell',function(req,res){
  db.allorder1((datas)=>{
    res.send({data:datas});
  })
})
//15.删除订单
app.get('/del_order',function(req,res){
  db.delorder(req.query.dnum,(data)=>{
    if (data.affectedRows>0) {
      res.send({state:1})//删除成功
    }else{
      res.send({state:0})//删除失败
    }
  })
})
// 16.删除订单单购买食物信息
app.get('/del_orderfood',function(req,res){
  db.delorderfood(req.query.dnum,(data)=>{
    if (data.affectedRows>0) {
      res.send({state:1})//删除成功
    }else{
      res.send({state:0})//删除失败
    }
  })
})