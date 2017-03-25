const sendmail = require('../lib/send_mail');
const template = require('../lib/templates');
const validation = require('../lib/validation');
const database = require('../services/database');
const bcrypt = require('bcrypt-nodejs');
const config = require('../config');
const modelForgot = require('../models/m_forgotpassword');

exports.forgot_password = function (req, res, next) {
    //console.log(modelForgot.createToken());
    let userEmail = req.body.email;
    let res_valid = new validation.validationModel(req.body, {
        email: [validation.validators.required, validation.validators.email]
    });

    database.query("select * from accounts where email='" + userEmail + "'", function (err, result) {
        var token;
        //สร้างโทเคน
        if (result.length != 0) {
            if (result[0].block_status == 0) {
                modelForgot.createToken(function (callback) {
                    token = callback;
                });
                console.log({ token: token });
                modelForgot.updateToken(userEmail, token, function (callback) { });
                var changepasswordUrl = config.domain + "/resetpass/" + token;
                modelForgot.send_mail(userEmail, changepasswordUrl, res_valid.valid, function (callback) {
                    res.status(callback.status).send(callback.message);
                });
            } else {
                res.status(500).send({ message: "your email has been blocked." });
            }
        } else {
            res.status(500).send({ message: "no email in database" });
        }
    });

}

exports.verify_token = function (req, res, next) {

    modelForgot.verify(req.body.token, function (callback) {
        res.status(callback.status).send(callback.message);
    });
}

exports.change_password_post = function (req, res, next) {
    var newpassword = req.body.new_password;
    var againnewpassword = req.body.again_new_password;
    modelForgot.updatePassword(req.body,function(callback){
        res.status(callback.status).send(callback.message);
    });
}