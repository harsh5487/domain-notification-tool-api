"use strict";
// var Follower = require('../../model/followersModel');
const validation = require('../validation');
const sha256 = require('sha256');
const Validator = require('./validationController');
const multiparty = require('multiparty');
const handleJWT = require('./handleJWT');
// const paths = require('path');
// const movefile = require('mv');
const userDB = require('../models/userModel');
const jwtModel = require('../models/jwtModel');

exports.register = async(req, res) => {
    // console.log(req.body);

    try {
        let time = Date.now();
        let form = new multiparty.Form();
        //pasing form data
        form.parse(req, async function(err, fields, files) {
            // console.log(fields,"hello");

            // const data = (fields)
            let data = Validator.signupValidation(fields);
            if (data['success'] == true) {
                data = data['data'];
            } else {
                return res.status(201).send({ success: false, msg: "Missing field", data: {}, errors: '' });
            }
            // if()

            const name=data.name[0]
            const email=data.email[0]
            const password=data.password[0]
            const rePassword=data.rePassword[0]
            const phoneNo=data.phoneNo[0]
            const whatsappNo=data.whatsappNo[0]
            const countryCode=data.countryCode[0]
            if(!(validation.fullNameVerification(name)))res.status(500).send("Invalid Name");
            else if(!(validation.emailVerification(email)))res.status(500).send("Invalid Email");
            else if(!(validation.passWordVerification(password)))res.status(500).send("Invalid Password");
            else if(!(password===rePassword))res.status(500).send("Passwords do not match");
            else if(!(validation.phoneNumberValidator(countryCode,phoneNo)))res.status(500).send("Invalid Phone Number");
            else if(!(validation.phoneNumberValidator(countryCode,whatsappNo)))res.status(500).send("Invalid WhatsApp Number");
            else{
                if(data.emailVerified && data.emailVerified[0]==='true'){
                    const emailVerified=data.emailVerified[0]
                    userDB.find({ email: email }).countDocuments().then((NoOfRecords) => {
                        if (NoOfRecords == 0) 
                        {
                            //Checking Display name already taken or not
                            // Userdb.find({ displayName: DisplayName }).countDocuments().then((NoOfrecords) => {
                                // if (NoOfrecords == 0) {
    
                                    if (password == rePassword) {
                                        const password_hash = sha256(password);
                                        const creationTime = (new Date()).toLocaleString()
                                        //new user
                                        const NewUser = new userDB({
                                            name: name,
                                            email: email,
                                            password: password_hash,
                                            countryCode: countryCode,
                                            phoneNo: phoneNo,
                                            whatsappNo: whatsappNo,
                                            createdAt: creationTime,
                                            updatedAt: creationTime
                                        })
    
                                        // save user in the database
                                        NewUser.save(NewUser).then(data => {
                                            res.status(200).send({ success: true, msg: "User Created successfully", data: '', errors: '' });
                                        }).catch(err => {
                                            console.log(err)
                                            res.status(500).send({
                                                
                                                message: err.message || "Some error occurred while creating a create operation"
                                            });
                                        });
                                    } else {
                                        res.status(202).send({ success: false, msg: "Password and confirm password don't match", data: {}, errors: err });
                                    }
                            //     } else {
                            //         res.status(203).send({ success: false, msg: "Display name already exist", data: {}, errors: '' });
                            //     }
                            // });
                        } else {
                            res.status(206).send({ success: false, msg: "Email already exists", data: {}, errors: '' });
                        }
                    });
                }
                else{
                    res.status(206).send({ success: false, msg: "Email is not verified", data: {}, errors: '' });
                }
            }
            
            // validation.fullNameVerification(name)?validator=true:res.send(500,"Invalid Name")
            // validation.emailVerification(email)?validator=true:res.send(500,"Invalid Email")
            // validation.passWordVerification(password)?validator=true:res.send(500,"Invalid Name")
            // validation.phoneNumberValidator(phoneNo)?validator=true:res.send(500,"Invalid Name")
            // validation.phoneNumberValidator(whatsappNo)?validator=true:res.send(500,"Invalid Name")

            //handling profile image
            // if (files.dp_files !== undefined) {
            //     var oldpath_dp = files.dp_files[0].path; //postman
            //     //var oldpath_dp = files.uploadFile[0].path;//server
            //     if (files.dp_files[0].originalFilename == '') {
            //         files.dp_files[0].originalFilename = 'default_dp.jpg';
            //         var newpath_dp = paths.join(__dirname, '../../../assets/images/' + files.dp_files[0].originalFilename);
            //         var dp_image_name = files.dp_files[0].originalFilename;
            //     } else {
            //         var newpath_dp = paths.join(__dirname, '../../../assets/images/' + time + files.dp_files[0].originalFilename);
            //         var dp_image_name = time + files.dp_files[0].originalFilename;
            //         console.log(newpath_dp)
            //     }
            // } else {
            //     var dp_image_name = 'default_dp.jpg';
            // }

            // if (oldpath_dp != undefined) {
            //     //moving image on server
            //     movefile(oldpath_dp, newpath_dp, async function(err) {
            //         if (err) {;
            //             return res.status(501).send({ success: false, msg: "Error while uploading image", data: {}, errors: err });
            //         }
            //     });
            // }



            //validating form data

            // let Email = data.email[0];
            // let DisplayName = data.displayname[0];
            // // let password = data.password[0];
            // let re_password = data.re_password[0];
            // let bio = '';
            // let emailVerified = JSON.parse(fields.emailverified[0]);
            // let SocialMedia
            // let Notification
            // let Check = JSON.parse(fields.check[0]);
            // if (fields.bio) {
            //     bio = fields.bio[0];
            // }
            // if (fields.socialmedia != undefined) {
            //     SocialMedia = fields.socialmedia[0];
            // } else {
            //     SocialMedia = {}
            // }
            // if (fields.notification != undefined) {
            //     Notification = fields.notification[0];
            // } else {
            //     Notification = {}
            // }

            //checking email is verified
            // if (Check == true) {
            //     if (emailVerified == true) {
                    //Checking Email already exist or not
                   
            //     } 
            //     else {
            //         res.status(205).send({ success: false, msg: "Email is not verified", data: {}, errors: '' });
            //     }
            // } else {
            //     res.status(206).send({ success: false, msg: "Please agree to the terms and conditions", data: {}, errors: '' });
            // }

        })
    } catch (err) {
        console.error(err);
        res.status(500).send({ success: false, msg: "Error", data: {}, errors: err });
    }
}

exports.login = async(req, res) => {
    try {
        let data = Validator.checkValidation(req.body);
        if (data['success'] === true) {
            data = data['data'];
        } else {
            res.status(201).send({ success: false, msg: "Missing field", data: {}, errors: '' });
        }
        // let data = req.body
        const email = data.email;
        const password = data.password;

        //checking whether user exist or not
        await userDB.findOne({ email: email }).then(async(userData) => {
            if (userData) {
                let password_hash = sha256(password);
                if (userData.password == password_hash) {
                    const token = await handleJWT.generateToken(userData._id)
                    if(token !== false){
                        res.status(200).send({ success: true, msg: "Logged in successfully", data: {userId: userData._id, jwtToken: token}, errors: '' });
                    }
                } else {
                    res.status(202).send({ success: false, msg: "Invalid Password", data: '', errors: '' });
                }
            } else {
                res.status(203).send({ success: false, msg: "You don't have an account with us! Please Register", data: '', errors: '' });
            }

        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ success: false, msg: "Error", data: {}, errors: err });
    }

}

exports.forgetPassword = async(req, res) => {
    try {

        let data = Validator.checkValidation(req.body);
        if (data['success'] === true) {
            data = data['data'];
        } else {
            return res.status(201).send({ success: false, msg: "Missing field", data: {}, errors: '' });
        }
        // const data = req.body;
        let email = data.email;

        let otpVerified = data.otpVerified
        let password = data.password;
        let rePassword = data.rePassword;

        //Checking whether email is verified for OTP
        if (otpVerified === "true") {
            if (password === rePassword) {
                let password_hash = sha256(password);

                //checking whether user exist or not
                await userDB.findOneAndUpdate({ email: email }, { $set: { password: password_hash } }).then((checkUser) => {
                    if (checkUser != null) {
                        return res.status(200).send({ success: true, msg: "Password changed successfully", data: '', errors: '' });
                    } else {
                        return res.status(202).send({ success: false, msg: "User not found", data: '', errors: '' });
                    }
                });
            } else {
                return res.status(203).send({ success: false, msg: "Password and Confirm Password doesn't match", data: {}, errors: '' });
            }
        } else {
            return res.status(206).send({ success: false, msg: "Email is not Verified", data: {}, errors: '' });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).send({ success: false, msg: "Error", data: {}, errors: err });
    }

}

exports.updateProfile = async(req, res) => {
    try {
        let form = new multiparty.Form();

        form.parse(req, async function(err, fields, files) {

            // Validating data
            let data = Validator.updateProfileValidation(fields);
            if (data['success'] == true) {
                data = data['data'];
            } else {
                return res.status(201).send({ success: false, msg: "Missing field", data: {}, errors: '' });
            }
            let name = null; let password = null; let rePassword = null; let email = null; let phoneNo= null; let whatsappNo = null;
            let userId = fields.userId[0];

            if (userId == null || userId == '' || userId == undefined) {
                return res.status(207).send({ success: false, msg: "Please log In", data: {}, errors: '' });
            }
            //checking data which is entered by user to update 
            if (fields.name !== undefined) {
                name = fields.name[0];
            }
            if (fields.password !== undefined) {
                password = fields.password[0];
            }
            if (fields.rePassword !== undefined) {
                rePassword = fields.rePassword[0];
            }
            if (password !== rePassword) {
                return res.status(500).send({ success: false, msg: "Passwords don't match", data: {}, errors: '' });
            }
            if (password === rePassword && password !== null && password !== undefined && password !== '' && rePassword !== null && rePassword !== undefined && rePassword !== '') {
                password = sha256(password);
            }
            if (fields.email !== undefined) {
                email = fields.email[0];
            }
            if (fields.phoneNo !== undefined) {
                phoneNo = fields.phoneNo[0];
            }
            if (fields.whatsappNo !== undefined) {
                whatsappNo = fields.whatsappNo[0];
            }

            //handling profile image
            // if (files.dp_files !== undefined) {
            //     var oldpath_dp = files.dp_files[0].path; //postman
            //     //var oldpath_dp = files.uploadFile[0].path;//server
            //     if (files.dp_files[0].originalFilename == '') {
            //         files.dp_files[0].originalFilename = 'default_dp.jpg';
            //         var newpath_dp = paths.join(__dirname, '../../../assets/images/' + files.dp_files[0].originalFilename);
            //         var dp_image_name = files.dp_files[0].originalFilename;
            //     } else {
            //         var newpath_dp = paths.join(__dirname, '../../../assets/images/' + time + files.dp_files[0].originalFilename);
            //         var dp_image_name = time + files.dp_files[0].originalFilename;
            //     }
            // } else {
            //     var dp_image_name = 'default_dp.jpg';
            // }

            //fetching user data from userId
            await userDB.findOne({ _id: userId }).then(async(userData) => {
                if (userData) {

                    if (name === null) {
                        name = userData.name;
                    }
                    if (password === null) {
                        password = userData.password;
                    }
                    if (email === null) {
                        email = userData.email;
                    }
                    if (phoneNo === null) {
                        phoneNo = userData.phoneNo;
                    }
                    if (whatsappNo === null) {
                        whatsappNo = userData.whatsappNo;
                    }
                    //checking profile image is changed or not
                    // if (dp_image_name === 'default_dp.jpg') {
                    //     dp_image_name = userData.profileImage;
                    // }

                    // if (oldpath_dp !== undefined) {
                    //     movefile(oldpath_dp, newpath_dp, async function(err) {
                    //         if (err) {
                    //             return res.status(204).send({ success: false, msg: "ERROR", data: {}, errors: err });
                    //         }
                    //     })
                    // }
                    //updating data
                    let updateTime = (new Date()).toLocaleString()
                    await userDB.findOneAndUpdate({ _id: userId }, { $set: { name: name, password: password, email: email, phoneNo: phoneNo, whatsappNo: whatsappNo, updatedAt: updateTime } }, { upsert: false }).then((updatedRecord) => {
                        if (updatedRecord) {
                            return res.status(200).send({ success: true, msg: "Profile updated successfully", data: {}, errors: err });
                        } else {
                            return res.status(205).send({ success: false, msg: "ERROR", data: {}, errors: err });
                        }
                    })
                } else {
                    return res.status(206).send({ success: false, msg: "User not found", data: {}, errors: err });
                }
            });
        })
    } catch (err) {
        console.error(err);
        res.status(500).send({ success: false, msg: "Error", data: {}, errors: err });
    }
}

exports.logout = async(req, res) => {
    try {
        let data = Validator.checkValidation(req.query);
        if (data['success'] === true) {
            data = data['data'];
        } else {
            res.status(201).send({ success: false, msg: "Missing field", data: {}, errors: '' });
        }
        if(data){
            await jwtModel.deleteMany({ userId: data.userId }); 
            res.status(200).send({ success: true, msg: "Sucessfully logged out", data: {}, errors: '' });
        } else {
            return res.status(203).send({ success: false, msg: "Something went wrong ! Please try again later", data: '', errors: '' });
        }
    } catch (error) {
        res.status(500).send({ success: false, msg: "Error", data: {}, errors: error });
    }
}