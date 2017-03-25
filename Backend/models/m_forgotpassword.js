const sendmail = require('./../lib/send_mail');
const username = 'smtpout@addlink.com';
const password = 'Addlink123!';
const validation = require('../lib/validation');
const database = require('../services/database');
const bcrypt = require('bcrypt-nodejs');

class Forgotpassword {
    static createToken(callback) {
        var token = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 32; i++)
            token += possible.charAt(Math.floor(Math.random() * possible.length));
        callback(token);
        //return token;
    }

    static updateToken(userEmail, token, callback) {
        database.query("select * from tokens where email=?", [userEmail], function (err, rows) {
            if (rows == undefined || rows.length == 0) {
                console.log('token 1:' + token);
                database.query("insert into tokens (email,token,type,status) values (?,?,0,0)", [userEmail, token], function (err, result) {
                    callback(0);
                });
            } else {
                console.log('token 2:' + token);
                database.query("update tokens set token=?,type =0,status = 0,add_dt = now() where email =?", [token, userEmail], function (err, result) {
                    callback(1);
                });
            }
        })
    }

    static send_mail(email, url, status, callback) {
        if (status === true) {
            let mail = new sendmail(email, "Hello from bitcoin", '<a href=' + url + '>Change password</a>');
            console.log("email is sended");
            mail.Send();
            callback({ status: 200, message: "success" });
            //res.status(200).send({ message: "success" });
        } else {
            callback({ status: 500, message: "Invalid email format" });
            //res.status(500).send({ message: "Invalid email format" });
        }
    }

    static verify(token, callback) {

        database.query(`call s_find_token(?, ?)`, [token, 0], (err, result) => {
            console.log(result);
            if (result.length > 0) {
                console.log("Check 1");
                if (result[0][0].result == 1) {
                    console.log("Check 2");
                    callback({ status: 200, message: "success" });
                    //res.status(200).send({ message: "success" });
                } else {
                    console.log("Check 3");
                    callback({ status: 500, message: "link is expired" });
                    //res.status(500).send({ message: "link is expired" });
                }
            } else {
                callback({ status: 500, message: "don't have token" });
                //res.status(500).send({ message: "don't have token" });
            }
        });
    }

    static updatePassword(data, callback) {
        
        database.query(`call s_find_token(?, ?)`, [data.token, 0], (err, result1) => {
            if (result1[0][0].result == 1) {
                if (data.new_password == data.again_new_password) {
                    let res_valid = new validation.validationModel(data ,{
                        new_password : [validation.validators.required, validation.validators.password],
                        again_new_password : [validation.validators.required, validation.validators.password]
                    });
                    if (res_valid.valid === true) {
                        database.query('select email from tokens where token =?', [data.token], (err, result2) => {
                            bcrypt.hash(data.new_password, null, null, function (err, hash) {
                                if (err) { return next(err); }
                                database.query('update accounts set password =? where email = ?', [hash, result2[0].email], (err, result3) => {
                                    database.query('delete from tokens where token =?', [data.token], (err, result3) => {
                                        console.log('delete success');
                                    });
                                    callback({ status: 200, message: "success reset pasword" });
                                });
                            });
                        });
                    }else{
                        callback({ status: 500, message: "wrong password format" });
                    }
                } else {
                    callback({ status: 500, message: "password not match" });
                }
            } else {
                callback({ status: 500, message: "link is expired" });
            }
        });
    }



}

module.exports = Forgotpassword;
