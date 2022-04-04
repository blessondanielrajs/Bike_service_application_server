const express = require('express');
const router = express.Router();
const mongo = require('../../mongo');

router.post('/customer_booking', async (req, res) => {//query to customer booking
    console.log(req.body);
    let new_id = 10001;
    let db1 = mongo.get().collection("booking_table")
    let max = await db1.find({ "customer_id": req.body._id }).sort({ _id: -1 }).limit(1).toArray()
    if (max.length !== 0)
        new_id = parseInt(max[0]._id) + 1;
    let json = {
        "_id": new_id,
        "customer_id": 100,
        "customer_name": req.body.customer_name,
        "customer_ph_no": req.body.customer_ph_no,
        "customer_email": req.body.customer_email,
        "customer_place": req.body.customer_place,
        "vechicle_name": req.body.vechicle_name,
        "vechicle_model": req.body.vechicle_model,
        "vechicle_number": req.body.vechicle_number,
        services: req.body.services,
        BookDate: req.body.BookDate,
        "status": 1
    }
    let insert = await db1.insert(json);

    if (insert.acknowledged) {
        res.json({ status: 1 });

    }
    else {
        res.json({ status: 0 });
    }

});
router.post('/booking', async (req, res) => {//query to display booking

    let db1 = mongo.get().collection("booking_table")
    let data = await db1.find().toArray()

    res.json({ data: data })

});

router.post('/delivery', async (req, res) => {
    let db1 = mongo.get().collection("booking_table")
   // db1.remove({"_id": req.body._id._id})

   let json = {

        "status": parseInt(2),
    }
    const query = { "_id": req.body._id._id };
    const update = { $set: json };
    const options = { upsert: true };
    let insert = await db1.updateOne(query, update, options);
    let data = await db1.find().toArray()
    if (insert.acknowledged) {
        const send = require('gmail-send')({//email.send when delivery time
            user: 'blessondanielraj.s@gmail.com',
            pass: 'Da12IeL3',
            to: req.body._id.customer_email,
            subject: "Delivery Report",
        });
        send({
            text: req.body._id.vechicle_number + " Successfull Delivery A vechicle",

        }, (error, result, fullResult) => {
            if (error) console.error(error);

        })
        res.json({ status: 1, "data": data });
    }
    else {
        res.json({ status: 0 });
    }
});

router.post('/delete', async (req, res) => {//delete booking details
    let db1 = mongo.get().collection("booking_table")
    
    let del = db1.deleteOne({"_id": req.body._id._id})
console.log(del);
   
    let data = await db1.find().toArray()
    res.json({ status: 1, "data": data });
});
module.exports = router;