const MongoClient = require('mongodb').MongoClient;

const bike_service_db = "mongodb://127.0.0.1:27017/bike_service_db";
var mongodb;

async function connect(callback) {
    await MongoClient.connect(bike_service_db, { useUnifiedTopology: true }, async function (err, client) {
        mongodb = await client.db();
        if (mongodb)
            callback();
        else
            console.log("MongoDB Not Connected !");
    });
}

function get() {
    return mongodb;
}

function close() {
    mongodb.close();

}

module.exports = {
    connect,
    get, close
};
