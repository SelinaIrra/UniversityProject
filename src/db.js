const mongoose = require('mongoose');
const CONFIG = require('./config').database;
require('./models/news');

const mongoDB = `mongodb://${CONFIG.host}:${CONFIG.port}/${CONFIG.database}`;

let db = null;

function get_connection() {
    if (!db) {
        console.log(`Connecting mongo on "${mongoDB}"`);

        mongoose.connect(mongoDB, {useNewUrlParser: true}).then(() => {
            console.log("Connected");
        }).catch((err) => {
            console.error("Failed to connect", err);
            process.exit(2);
        });

        db = mongoose.connection;
        mongoose.Promise = global.Promise;
    }
    return db;
}

module.exports = get_connection();