const express = require('express');
const router = express.Router();
const mongo = require('../../mongo');

router.post('/', async (req, res) => {
    let USERNAME = req.body.USERNAME;
    let PASSWORD = req.body.PASSWORD;

    console.log(USERNAME + " " + PASSWORD);
    let db1 = mongo.get().collection("user_table")
    let loginUser = await db1.find({ "username": USERNAME, "password": PASSWORD }).toArray()
        .catch(err => res.json({ "Status": -1, msg: "Login Error.t Contact Admin!!" }));
    console.log(loginUser)
    if (loginUser.length > 0) {
        res.json({ "Status": 1, user_details: loginUser[0] });
    }
    else {
        res.json({ "Status": 0 });
    }


});

router.post('/registation', async (req, res) => {

    let new_id = 101;
    let db1 = mongo.get().collection("user_table")
    let max = await db1.find({ "role": "customer" }).sort({ _id: -1 }).limit(1).toArray()
    if (max.length !== 0)
        new_id = parseInt(max[0]._id) + 1;

    let json = {
        "_id": new_id,
        "name": req.body.name,
        "ph_no": req.body.ph_no,
        "role": "customer",
        "email": req.body.email,
        "password": req.body.password,
        "place": req.body.place,
       
    }

    let insert = await db1.insert(json);

    if (insert.acknowledged) {
        res.json({ status: 1 });

    }
    else {
        res.json({ status: 0 });
    }
});






module.exports = router;
