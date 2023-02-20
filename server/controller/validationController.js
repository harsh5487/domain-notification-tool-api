"use strict";
var validator = require('validator');

exports.checkValidation = (data) => {

    let errors = [];

    if (data) {

        for (var [key, value] of Object.entries(data)) {

            value = validator.trim(value);
            value = validator.escape(value);

            if (validator.isEmpty(value)) {
                errors.push('Invalid Input Data');
            }
        }

        if (errors.length) {
            return { success: false, msg: 'Fields are missing', data: data, errors: errors.join(',') };
        } else {
            return { success: true, msg: 'Fields are valid', data: data, errors: errors.join(',') };
        }
    } else {
        return res.status(400).send({ success: false, msg: 'Fields are missing', data: data, errors: 'Fields are missing' });
    }


}

exports.updateProfileValidation = (data) => {

    let errors = [];

    if (data) {

        for (var [key, value] of Object.entries(data)) {
            value = value[0]
            value = validator.trim(value);
            value = validator.escape(value);

            if (validator.isEmpty(value)) {
                errors.push('Invalid Input Data');
            }
        }

        if (errors.length) {
            return { success: false, msg: 'Fields are missing', data: data, errors: errors.join(',') };
        } else {
            return { success: true, msg: 'Fields are valid', data: data, errors: errors.join(',') };
        }
    } else {
        return res.status(400).send({ success: false, msg: 'Fields are missing', data: data, errors: 'Fields are missing' });
    }


}

exports.signupValidation = (data) => {
    let errors = [];

    if (data) {
        if (!data.email) {
            errors.push('Missing email field');
        }
        if (!data.name) {
            errors.push('Missing first_name field');
        }
        if (!data.password) {
            errors.push('Missing password field');
        }

        if (!data.rePassword) {
            errors.push('Missing confirm password field');
        }

        if (!data.phoneNo) {
            errors.push('Missing phone number field');
        }

        if (!data.whatsappNo) {
            errors.push('Missing whatsapp number field');
        }

        if (!data.countryCode) {
            errors.push('Missing country code field');
        }

        if (errors.length) {
            return { success: false, msg: 'Fields are missing', data: data, errors: errors.join(',') };
        } else {
            return { success: true, msg: 'Fields are valid', data: data, errors: errors.join(',') };
        }
    } else {
        return res.status(400).send({ success: false, msg: 'Fields are missing', data: data, errors: 'Fields are missing' });
    }
};