const express = require("express");//To mange request and rouths
const morgan = require("morgan");//HTTP request middleware logger for Node. js
const bodyParser = require("body-parser");//process data sent through an HTTP request body
var cors = require("cors");
const app = express();
const Routes = require("./routes/index");//routes to query
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
