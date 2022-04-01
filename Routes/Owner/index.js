const express = require('express');
const router = express.Router();
const mongo = require('../../mongo');

router.post('/customer_booking', async (req, res) => {
    console.log("1qwe");
    let new_id = 1001;
    let db1 = mongo.get().collection("booking_table")
    let max = await db1.find({ "customer_id": req.body.customer_id }).sort({ _id: -1 }).limit(1).toArray()
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
        BookDate: req.body.BookDate

    }
    let insert = await db1.insert(json);

    if (insert.acknowledged) {
        res.json({ status: 1 });

    }
    else {
        res.json({ status: 0 });
    }

});
router.post('/booking', async (req, res) => {
  
    let db1 = mongo.get().collection("booking_table")
    let data = await db1.find().toArray()
   
    res.json({ data: data })

});

module.exports = router;