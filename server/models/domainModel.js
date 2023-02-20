"use strict";
const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    planId: {
        type: String,
        required: true,
    },
    domain: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    expiryDate: {
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

const domainDB = mongoose.model('domains', schema);

module.exports = domainDB;