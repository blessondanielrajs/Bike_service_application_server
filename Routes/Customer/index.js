const express = require('express');
const router = express.Router();
const mongo = require('../../mongo');

router.post('/booking', async (req, res) => {
    console.log(req.body)
    let new_id = 1001;
    let db1 = mongo.get().collection("booking_table")
    let max = await db1.find({ "customer_id": req.body.customer_id }).sort({ _id: -1 }).limit(1).toArray()
    if (max.length !== 0)
        new_id = parseInt(max[0]._id) + 1;
    let json = {
        "_id": new_id,
        "customer_id": req.body.customer_id,
        "customer_name": req.body.customer_name,
        "customer_ph_no": req.body.customer_ph_no,
        "customer_email": req.body.customer_email,
        "customer_place": req.body.customer_place,
        "vechicle_name": req.body.vechicle_name,
        "vechicle_model": req.body.vechicle_model,
        "vechicle_number": req.body.vechicle_number,
        "services": req.body.services,
        "BookDate": req.body.BookDate,
        "status":1

    }
    let insert = await db1.insertOne(json);

    if (insert.acknowledged) {
        const send = require('gmail-send')({
            user: 'blessondanielraj.s@gmail.com',
            pass: 'Da12IeL3',
            to: 'urldan324@gmail.com',
            subject: "Booking Details",
        });
        send({
            text: req.body.customer_name + " was booking service",

        }, (error, result, fullResult) => {
            if (error) console.error(error);

        })


        res.json({ status: 1 });


    }
    else {
        res.json({ status: 0 });
    }

});

router.post('/history', async (req, res) => {
    console.log(req.body)
  
    let db1 = mongo.get().collection("booking_table")
    let data = await db1.find({"customer_id":req.body._id}).toArray()

    res.json({ data: data })

});








module.exports = router;