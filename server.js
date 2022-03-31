const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
const Routes = require("./routes/index");

const mongo = require("./mongo");
mongo.connect(function (err, client) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Database Bike_service_application_db connected!");
    }
});

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/bike_service", Routes);


const port = 7000;
app.listen(port, () => console.log(`Server started on port ${port}`));
