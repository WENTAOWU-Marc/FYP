'use strict'
var mongoose = require('./config');

// create schema
const classSchema = new mongoose.Schema({
    restId: String,
    foodId: String,
    userId: String,
    name: String,
    status: Number,
    number: Number,
})

// create model
const classModel = mongoose.model('order', classSchema) // newClass为创建或选中的集合

module.exports = classModel