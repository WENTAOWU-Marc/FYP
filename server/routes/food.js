var express = require('express');
var router = express.Router();


var foodsSchema = require('../db/food.model')

/* GET users listing. */
router.get('/all', function (req, res, next) {
    var { restId } = req.query
    if (restId) {
        console.log('restId -> :', restId)
        foodsSchema.find(
            { restId },
            (err, doc) => {
                res.json({ code: 200, data: doc })
            })
    } else {
        foodsSchema.find(
            {},
            (err, doc) => {
                res.json({ code: 200, data: doc })
            })
    }
});

router.post('/add', function (req, res, next) {
    var { name, type, imgUrl, restId, price, } = req.body;

    var obj = new foodsSchema({
        name,
        type,
        imgUrl,
        restId,
        price,
    })

    foodsSchema.find({
        restId,
        name,
    }, (err, doc) => {
        if (doc.length) {
            return res.json({ code: 500, msg: 'Food already exists' })
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
    foodsSchema.findByIdAndUpdate(_id, { $set: { ...req.body } }, function (err, doc) {
        res.send({ code: 200, msg: 'ok' })
    })
});
router.get('/del', function (req, res, next) {
    var { _id } = req.query;

    foodsSchema.findByIdAndRemove(_id, function (err, doc) {
        return res.send({ code: 200, msg: 'success' })
    })
});



module.exports = router;