"use strict";
const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    planId: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentDetails: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: Number,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
    updatedAt: {
        type: String,
        required: true
    }
})

const paymentsDB = mongoose.model('payments', schema);

module.exports = paymentsDB;