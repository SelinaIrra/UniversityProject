const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NEWS_COLLECTION_NAME = "news";

const newsScheme = new Schema({
    title: {
        type: Schema.Types.String,
        required: true
    },
    image: {
        type: Schema.Types.String
    },
    date: {
        type: Schema.Types.Date,
        default: Date.now
    },
    text: {
        type: Schema.Types.String,
        required: true
    },
    html: {
        type: Schema.Types.String,
        required: true
    },
});

const newsModel = mongoose.model(NEWS_COLLECTION_NAME, newsScheme);

module.exports = newsModel;
