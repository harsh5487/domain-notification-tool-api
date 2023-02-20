"use strict";
const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    alertId: {
        type: String,
        required: true,
    },
    alertName: {
        type: String,
        required: true
    }
})

const alertsDB = mongoose.model('alerts', schema);

module.exports = alertsDB;