var express = require('express');
var router = express.Router();


var ordersSchema = require('../db/order.model')

/* GET users listing. */
router.get('/all', function (req, res, next) {
    var { userId } = req.query
    ordersSchema.find(
        { userId },
        (err, doc) => {
            res.json({ code: 200, data: doc })
        })
});

router.post('/add', function (req, res, next) {
    var { name, foodId, restId, userId, status, number, } = req.body;

    var obj = new ordersSchema({
        restId,
        foodId,
        name,
        userId,
        status,
        number
    })

    ordersSchema.find({
        userId,
        foodId,
    }, (err, doc) => {
        if (doc.length) {
            return res.json({ code: 500, msg: 'Order already exists' })
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
    ordersSchema.findByIdAndUpdate(_id, { $set: { ...req.body } }, function (err, doc) {
        res.send({ code: 200, msg: 'ok' })
    })
});



module.exports = router;