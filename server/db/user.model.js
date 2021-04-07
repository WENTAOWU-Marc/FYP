'use strict'
var mongoose = require('./config');

// 创建schema
const classSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    address: String,
    tel: String,
    latitude: String,
    longitude: String,
})
// 创建model
const classModel = mongoose.model('user', classSchema) // newClass为创建或选中的集合

module.exports = classModel