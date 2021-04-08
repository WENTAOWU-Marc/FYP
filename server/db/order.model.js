'use strict'
var mongoose = require('./config');

var moment = require('moment')

// create schema
const classSchema = new mongoose.Schema({
    foods: Array,
    restId: String,
    status: Number,
    totalPrice: Number,
    userId: String,

    createTime: { type: String, default: moment().format("YYYY-MM-DD HH:MM:ss") }
})
// create model
const classModel = mongoose.model('order', classSchema) // newClass为创建或选中的集合

module.exports = classModel