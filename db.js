//import mongoose from 'mongoose'
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

db.on('error', function (error) {
  console.log('MongoDB数据库连接失败：' + error);
});

db.on('open', function () {
  console.log('-------MongoDB数据库连接成功！----------');
})

var loginSchema = new mongoose.Schema({
  username: String,
  password: String
});

var login = db.model('login', loginSchema, 'login');
var user1 = new login({username: 'Lear', password: 'test'});
user1.save(function (err) {
  if (err) {
    return handleError(err);
  }
});
