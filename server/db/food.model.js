'use strict'
var mongoose = require('./config');

// 创建schema
const classSchema = new mongoose.Schema({
    name: String,
    type: String,
    imgUrl: String,
    restId: String,
    price: Number,
})
// 创建model
const classModel = mongoose.model('food', classSchema) // newClass为创建或选中的集合

module.exports = classModel