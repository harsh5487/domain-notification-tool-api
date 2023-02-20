const dataModel = require('../models/domainModel')
const multiparty = require('multiparty');
const Validator = require('./validationController');

exports.saveDomainData = async(req, res) => {

    try {
        let form = new multiparty.Form();
        form.parse(req, async function(err, fields, files) {
            let userId = fields.userId[0];
            let planId = fields.planId[0];
            let domain = fields.domain[0];
            let address = fields.address[0];
            let expiryDate = fields.expiryDate[0];
                                        const newDomainData = new dataModel({
                                            userId: userId,
                                            planId: planId,
                                            domain: domain,
                                            address: address,
                                            expiryDate: expiryDate,
                                            createdAt: (new Date()).toLocaleString(),
                                            updatedAt: (new Date()).toLocaleString()
                                        })
                                        newDomainData.save(newDomainData).then(data => {
                                            res.status(200).send({ success: true, msg: "Data saved sucessfully", data: '', errors: '' });
                                        }).catch(err => {
                                            console.log(err)
                                            res.status(500).send({
                                                message: err.message || "Some error occurred while creating a create operation"
                                            });
                                        });       
        })
    } catch (err) {
        console.error(err);
        res.status(500).send({ success: false, msg: "Error", data: {}, errors: err });
    }
}

exports.fetchDomainData = async(req, res) => {
    try {
        let data = Validator.checkValidation(req.query);
        if (data['success'] === true) {
            data = data['data'];
        } else {
            res.status(201).send({ success: false, msg: "Missing field", data: {}, errors: '' });
        }
        if(data){
            const domainData = await dataModel.findOne({domain: data.domain});
            if(domainData!==null){
                res.status(200).send({ success: true, msg: "Sucessfully fetched data", data: domainData, errors: '' });
            }
        } else {
            return res.status(203).send({ success: false, msg: "Something went wrong ! Please try again later", data: '', errors: '' });
        }
    } catch (error) {
        res.status(500).send({ success: false, msg: "Error", data: {}, errors: error });
    }
}

exports.deleteDomainData = async(req, res) => {
    try {
        let data = Validator.checkValidation(req.query);
        if (data['success'] === true) {
            data = data['data'];
        } else {
            res.status(201).send({ success: false, msg: "Missing field", data: {}, errors: '' });
        }
        if(data){
            await domainDB.deleteMany({ domain: data.domain }); 
            res.status(200).send({ success: true, msg: "Sucessfully deleted data", data: {}, errors: '' });
        } else {
            return res.status(203).send({ success: false, msg: "Something went wrong ! Please try again later", data: '', errors: '' });
        }
    } catch (error) {
        res.status(500).send({ success: false, msg: "Error", data: {}, errors: error });
    }
}

// exports.updateDomainData = async(req, res) => {
//     try {
//         let form = new multiparty.Form();

//         form.parse(req, async function(err, fields, files) {

//             // Validating data
//             let data = Validator.updateProfileValidation(fields);
//             if (data['success'] == true) {
//                 data = data['data'];
//             } else {
//                 return res.status(201).send({ success: false, msg: "Missing field", data: {}, errors: '' });
//             }
//             let name = null; let password = null; let rePassword = null; let email = null; let phoneNo= null; let whatsappNo = null;
//             let userId = fields.userId[0];

//             if (userId == null || userId == '' || userId == undefined) {
//                 return res.status(207).send({ success: false, msg: "Please log In", data: {}, errors: '' });
//             }
//             //checking data which is entered by user to update 
//             if (fields.name !== undefined) {
//                 name = fields.name[0];
//             }
//             if (fields.password !== undefined) {
//                 password = fields.password[0];
//             }
//             if (fields.rePassword !== undefined) {
//                 rePassword = fields.rePassword[0];
//             }
//             if (password !== rePassword) {
//                 return res.status(500).send({ success: false, msg: "Passwords don't match", data: {}, errors: '' });
//             }
//             if (password === rePassword && password !== null && password !== undefined && password !== '' && rePassword !== null && rePassword !== undefined && rePassword !== '') {
//                 password = sha256(password);
//             }
//             if (fields.email !== undefined) {
//                 email = fields.email[0];
//             }
//             if (fields.phoneNo !== undefined) {
//                 phoneNo = fields.phoneNo[0];
//             }
//             if (fields.whatsappNo !== undefined) {
//                 whatsappNo = fields.whatsappNo[0];
//             }

//             //handling profile image
//             // if (files.dp_files !== undefined) {
//             //     var oldpath_dp = files.dp_files[0].path; //postman
//             //     //var oldpath_dp = files.uploadFile[0].path;//server
//             //     if (files.dp_files[0].originalFilename == '') {
//             //         files.dp_files[0].originalFilename = 'default_dp.jpg';
//             //         var newpath_dp = paths.join(__dirname, '../../../assets/images/' + files.dp_files[0].originalFilename);
//             //         var dp_image_name = files.dp_files[0].originalFilename;
//             //     } else {
//             //         var newpath_dp = paths.join(__dirname, '../../../assets/images/' + time + files.dp_files[0].originalFilename);
//             //         var dp_image_name = time + files.dp_files[0].originalFilename;
//             //     }
//             // } else {
//             //     var dp_image_name = 'default_dp.jpg';
//             // }

//             //fetching user data from userId
//             await userDB.findOne({ _id: userId }).then(async(userData) => {
//                 if (userData) {

//                     if (name === null) {
//                         name = userData.name;
//                     }
//                     if (password === null) {
//                         password = userData.password;
//                     }
//                     if (email === null) {
//                         email = userData.email;
//                     }
//                     if (phoneNo === null) {
//                         phoneNo = userData.phoneNo;
//                     }
//                     if (whatsappNo === null) {
//                         whatsappNo = userData.whatsappNo;
//                     }
//                     //checking profile image is changed or not
//                     // if (dp_image_name === 'default_dp.jpg') {
//                     //     dp_image_name = userData.profileImage;
//                     // }

//                     // if (oldpath_dp !== undefined) {
//                     //     movefile(oldpath_dp, newpath_dp, async function(err) {
//                     //         if (err) {
//                     //             return res.status(204).send({ success: false, msg: "ERROR", data: {}, errors: err });
//                     //         }
//                     //     })
//                     // }
//                     //updating data
//                     // let updatetime = new Date()
//                     await userDB.findOneAndUpdate({ _id: userId }, { $set: { name: name, password: password, email: email, phoneNo: phoneNo, whatsappNo: whatsappNo } }, { upsert: false }).then((updatedRecord) => {
//                         if (updatedRecord) {
//                             return res.status(200).send({ success: true, msg: "Profile updated successfully", data: {}, errors: err });
//                         } else {
//                             return res.status(205).send({ success: false, msg: "ERROR", data: {}, errors: err });
//                         }
//                     })
//                 } else {
//                     return res.status(206).send({ success: false, msg: "User not found", data: {}, errors: err });
//                 }
//             });
//         })
//     } catch (err) {
//         console.error(err);
//         res.status(500).send({ success: false, msg: "Error", data: {}, errors: err });
//     }
// }