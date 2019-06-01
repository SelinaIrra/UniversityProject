const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TICKETS_COLLECTION_NAME = "tickets";

const ticketsScheme = new Schema({
    fio: {
        type: Schema.Types.String,
        required: true
    },
    school: {
        type: Schema.Types.String,
        required: true
    },
    class: {
        type: Schema.Types.String,
        required: true
    },
    faculty: {
        type: Schema.Types.String,
        required: true
    },
    phone: {
        type: Schema.Types.String,
        required: true
    },
});

const ticketsModel = mongoose.model(TICKETS_COLLECTION_NAME, ticketsScheme);

module.exports = ticketsModel;
