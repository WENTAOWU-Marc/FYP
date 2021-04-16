var express = require('express');
var router = express.Router();


var usersSchema = require('./../db/user.model')

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/reg', function (req, res, next) {
    var { name, email, password, tel, address, longitude, latitude, } = req.body;
    var user = new usersSchema({
        name,
        email,
        password,
        tel,
        address,
        longitude,
        latitude
    })
    usersSchema.find({
        email,
        password,
    }, (err, doc) => {
        if (doc.length) {
            return res.json({ code: 500, msg: 'User already exists' })
        }
        user.save()
        res.json({ code: 200, msg: 'success' })
    })
});

router.post('/update', function (req, res, next) {
    var { _id } = req.body;

    if (!_id) {
        return res.json({ code: 500, msg: '_id cannot be empty' })
    }
    usersSchema.findByIdAndUpdate(_id, { $set: { ...req.body } }, function (err, doc) {
        res.send({ code: 200, msg: 'ok' })
    })
});

router.post('/login', function (req, res, next) {
    var { email, password, } = req.body;
    usersSchema.find({
        email,
        password,
    }, (err, doc) => {
        if (!doc.length) {
            return res.json({ code: 500, msg: 'User does not exist, please register' })
        }
        res.json({ code: 200, data: doc[0] })
    })
});

router.get('/:id',function (req, res, next){
    var { _id } = req.query
    if (_id) {
        usersSchema.find(
            { _id },
            (err, doc) => {
                console.log('err -> :', err)
                var raw = doc[0].latitude + " " + doc[0].longitude
                var split = raw.split(" ")
                res.json({ code: 200, data: split })
            })
    } else {
        usersSchema.find(
            {},
            (err, doc) => {
                console.log('err -> :', err)
                var raw = doc[0].latitude + " " + doc[0].longitude
                var split = raw.split(" ")
                res.json({ code: 200, data: split })
            })
    }

});

module.exports = router;