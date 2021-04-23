var mongoose = require('mongoose'),
    db = mongoose.connection,
    DB_URL = 'mongodb+srv://WWT:990522@cluster0.ujvrm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.set('useFindAndModify', false)

mongoose.Promise = global.Promise;

//连接
mongoose.connect(DB_URL,{useNewUrlParser:true,useUnifiedTopology: true});

//连接成功
db.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL);
});

//连接异常
db.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});

//连接断开
db.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

module.exports = mongoose