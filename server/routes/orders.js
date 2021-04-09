var express = require('express');
var router = express.Router();


var ordersSchema = require('../db/order.model')
var restsSchema = require('../db/restaurant.model')
var usersSchema = require('../db/user.model')

/* GET users listing. */
router.get('/all', async function (req, res, next) {
    var objArrr = []
    var { _id } = req.query
    var orderArr
    if (_id) {
        orderArr = await ordersSchema.find({ _id }, null, { lean: true })
    } else {
        orderArr = await ordersSchema.find({}, null, { lean: true })
    }
    orderArr.map(async it => {
        var neo = { ...it }
        var ress = await restsSchema.find({ _id: it.restId }, null, { lean: true })

        neo.restTel = ress[0].tel
        neo.restAddress = ress[0].address
        neo.restName = ress[0].name

        var users = await usersSchema.find({ _id: it.userId }, null, { lean: true })

        neo.userName = users[0].name
        neo.userAddress = users[0].address
        neo.userTel = users[0].tel

        objArrr.push(neo)
    })

    setTimeout(() => {
        res.json({ code: 200, data: objArrr })
    }, 800)
});

router.post('/add', function (req, res, next) {
    var { foods, restId, userId, status, totalPrice } = req.body;


    var obj = new ordersSchema({
        foods,
        restId,
        status,
        totalPrice,
        userId,
    })


    obj.save()
    res.json({ code: 200, msg: 'success' })

    // ordersSchema.find({
    //     userId,
    //     foodId,
    // }, (err, doc) => {
    //     if (doc.length) {
    //         return res.json({ code: 500, msg: 'Order already exists' })
    //     }

    // })
});

router.get('/update', function (req, res, next) {
    var { _id, status } = req.query;
    console.log('status -> :', status)
    console.log('_id -> :', _id)

    if (!_id) {
        return res.json({ code: 500, msg: '_id cannot be empty' })
    }
    ordersSchema.findByIdAndUpdate(_id, { $set: { status } }, function (err, doc) {
        res.send({ code: 200, msg: 'ok' })
    })
});



module.exports = router;