'use strict'
var mongoose = require('./config');

// create schema
const classSchema = new mongoose.Schema({
    name: String,
    imgUrl: String,
    address: String,
    tel: String,
    type: String,
    longitude: String,
    latitude: String,
})
// create model
const classModel = mongoose.model('rest', classSchema) // newClass为创建或选中的集合

module.exports = classModel