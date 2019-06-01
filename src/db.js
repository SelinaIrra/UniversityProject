const mongoose = require('mongoose');
const CONFIG = require('./config').database;
require('./models/news');

const mongoDB = `mongodb://${CONFIG.host}:${CONFIG.port}/${CONFIG.database}`;

let db = null;

async function get_connection() {
    if (!db) {
        console.log(`Connecting mongo on "${mongoDB}"`);

        try {
            await mongoose.connect(mongoDB, {useNewUrlParser: true});
            console.log("MongoDB connected");
            db = mongoose.connection;
        } catch (err) {
            console.error("Failed to connect to mongo", err);
            process.exit(2);
        }
    }
    return db;
}

module.exports = get_connection().catch((err) => {
    console.error("Failed to connect to mongo", err);
    process.exit(2);
});