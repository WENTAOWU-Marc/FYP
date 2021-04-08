var express = require('express');
var router = express.Router();


var restsSchema = require('../db/restaurant.model')

/* GET users listing. */
router.get('/all', function (req, res, next) {
    var { _id } = req.query
    if (_id) {
        restsSchema.find(
            { _id },
            (err, doc) => {
                console.log('err -> :', err)
                res.json({ code: 200, data: doc })
            })
    } else {
        restsSchema.find(
            {},
            (err, doc) => {
                console.log('err -> :', err)
                res.json({ code: 200, data: doc })
            })
    }

});

router.post('/add', function (req, res, next) {
    var { name,
        imgUrl,
        address,
        tel,
        type,
        longitude,
        latitude, } = req.body;

    var obj = new restsSchema({
        name,
        imgUrl,
        address,
        tel,
        type,
        longitude,
        latitude,
    })

    restsSchema.find({
        name,
        tel,
    }, (err, doc) => {
        if (doc.length) {
            return res.json({ code: 500, msg: 'Restaurant already exists' })
        }
        obj.save()
        res.json({ code: 200, msg: 'success' })
    })
});

router.post('/update', function (req, res, next) {
    var { _id } = req.body;

    if (!_id) {
        return res.json({ code: 500, msg: '_id cannot be empty' })
    }
    restsSchema.findByIdAndUpdate(_id, { $set: { ...req.body } }, function (err, doc) {
        res.send({ code: 200, msg: 'ok' })
    })
});



module.exports = router;