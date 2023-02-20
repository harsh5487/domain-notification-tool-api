"use strict";
const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    },
    whatsappNo: {
        type: Number,
        required: true
    },
    countryCode: {
        type: String,
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

const userDB = mongoose.model('users', schema);

module.exports = userDB;