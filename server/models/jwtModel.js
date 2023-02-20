"use strict";
const mongoose = require('mongoose');

var schema = new mongoose.Schema({

    userId: {
        type: String,
        required: true,
    },
    jwtToken: {
        type: String,
        required: true,
    }
})

const jwtModel = mongoose.model('jwts', schema);

module.exports = jwtModel;