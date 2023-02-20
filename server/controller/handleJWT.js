const jwt = require('jsonwebtoken');
const jwtModel = require('../models/jwtModel');
exports.verifyToken = async (req, res, next) => {
    try {
        if ('token' in req.headers) {
            const access_token = req.headers['token'];
            if (access_token == null) {
                return res.status(203).send({ success: false, msg: 'Unauthorized', data: '', errors: '' });
            } else {
                try {
                    jwt.verify(access_token, process.env.JWT_SECRET_KEY, async (err, user) => {
                        if (err) {
                            return res.status(203).send({ success: false, msg: 'Your session has been expired! please login again', data: '', errors: err });
                        } else {
                            const userId = user.userId
                            const checkingLogs = await jwtModel.find({ userId: userId, token: access_token }).countDocuments();
                            if (checkingLogs == 1) {
                                req.user = user.userId
                                next();
                            } else {
                                return res.status(203).send({ success: false, msg: 'Your session has been expired! please login again', data: '', errors: "" });
                            }
                        }
                    });
                } catch (err) {
                    return res.status(203).send({ success: false, msg: 'Your session has been expired! please login again', data: '', errors: "" });
                }
            }
        } else {
            return res.status(203).send({ success: false, msg: 'Your session has been expired! please login again', data: '', errors: "" });
        }
    } catch (err) {
        res.status(203).send({ success: false, msg: 'Error', data: '', errors: err });
    }
}
exports.generateToken = async (userId) => {
    return new Promise(async (resolve, reject) => {
        const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        await jwtModel.deleteMany({ userId: userId });
        const newData = jwtModel({
            userId: userId,
            jwtToken: token
        })
        newData.save(newData).then((tokenSaved) => {
            if (tokenSaved) {
                resolve(token)
            } else {
                resolve(false)
            }
        })
    })
}