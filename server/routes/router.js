const express = require("express");
const route = express.Router();
const User = require("../controller/userController")
const storeData = require("../controller/storeData")
const homeRoute = require('./homeRoute')
const emailOtp = require('../controller/emailOtpController');
const { verifyToken } = require("../controller/handleJWT");
const fetchData = require("../controller/fetchData");

// route.get("/", );
route.get("/", homeRoute.home);

route.post("/register", User.register);
route.post("/login", User.login);
route.post("/updateProfile", verifyToken, User.updateProfile);
route.post("/forgetPassword", User.forgetPassword);
route.get("/logout", User.logout);

route.post("/saveDomainData", storeData.saveDomainData);

route.post("/registerEmailVerify", emailOtp.registerEmailVerification);
route.post("/forgetPasswordVerify", emailOtp.forgetPasswordVerification);
route.get("/otpVerify", emailOtp.otpVerify);
route.get("/tokenVerify", verifyToken);

route.get("/getUserData", fetchData.getUserData);
route.get("/getDomainData", fetchData.getDomainData);

route.get("/deleteDomainData", storeData.deleteDomainData);
route.get("/fetchDomainData", storeData.fetchDomainData);

route.use((req, res, next) => {
    res.status(401).send({ success: false, msg: "Route not found", data: {}, errors: '' });
});

module.exports = route;