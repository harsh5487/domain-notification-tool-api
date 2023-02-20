const domainDB = require("../models/domainModel");
const userDB = require("../models/userModel");
const Validator = require('./validationController');

exports.getUserData = async (req, res) => {
    try {
        let data = Validator.checkValidation(req.query);
        if (data['success'] === true) {
            data = data['data'];
        } else {
            res.status(201).send({ success: false, msg: "Missing field", data: {}, errors: '' });
        }
        if(data){
            const userData = await userDB.findOne({_id: data.userId});
            if(userData){
                res.status(200).send({ success: true, msg: "Data fetched successfully", data: userData});
            }
            else{
                res.status(203).send({ success: false, msg: "There was some error in fetching data", data: {}, errors: error });
            }
        }else {
            res.status(203).send({ success: false, msg: "Something went wrong ! Please try again later", data: '', errors: '' });
        }
    } catch (error) {
        res.status(500).send({ success: false, msg: "Error", data: {}, errors: error });
    }
}

exports.getDomainData = async (req, res) => {
    try {
        let data = Validator.checkValidation(req.query);
        if (data['success'] === true) {
            data = data['data'];
        } else {
            res.status(201).send({ success: false, msg: "Missing field", data: {}, errors: '' });
        }
        if(data){
            const domainData = await domainDB.find({userId: data.userId});
            console.log(domainData);
            if(domainData!==null){
                res.status(200).send({ success: true, msg: "Data fetched successfully", data: domainData});
            }
            else{
                res.status(203).send({ success: false, msg: "There was some error in fetching data", data: {}, errors: error });
            }
        }else {
            res.status(203).send({ success: false, msg: "Something went wrong ! Please try again later", data: '', errors: '' });
        }
    } catch (error) {
        res.status(500).send({ success: false, msg: "Error", data: {}, errors: error });
    }
}