const database = require('../services/database');
var sendMail = require('./../lib/send_mail');
var template = require('./../lib/templates');
const bcrypt = require('bcrypt-nodejs');
const config = require('../config');
const table = 'accounts';

class userSchema {
    constructor(schema = {}) {
        this.email = schema.email || '';
        this.password = schema.password || '';
        this.save = function(callback) {
            let user = this;
            this.preSave(err => {
                if (err) { return callback(err) }
                database.query(`call s_signup(?,?)`, [user.email, user.password], (err, result) => {
                    // gen token
                    require('crypto').randomBytes(60, function(err, buffer) {
                        var token = buffer.toString('hex');
                        // add db to token
                        database.query(`insert into tokens set email=?, token=? , type=?, status=?`, [user.email, token, 1, 0], (err, result) => {
                            // sendMail 
                            let temp = template.verifyemail(user.email, config.domain + '/account/verifyemail-check/' + token);
                            let mail = new sendMail(user.email, "Verify Email", temp);
                            mail.Send();
                        });
                    });

                    if (err) { return callback(err); }
                    callback(result.insertId != 0 ? null : 'insert data error', result[0][0]);
                });
            });
        };
    }

    // On Save Hook, encrypt password
    // Before saving a model, run this function
    preSave(next) {
        let user = this;
        // generate a salt then run callback
        bcrypt.genSalt(10, function(err, salt) {
            if (err) { return next(err); }

            // hash (encrypt) our password using the salt
            bcrypt.hash(user.password, salt, null, function(err, hash) {
                if (err) { return next(err); }

                // overwrite plain text password with encrypted password
                user.password = hash;
                next();
            });
        });
    }

    // find one data
    static findOne(obj = {}, callback) {
        let email = obj.email || '';
        database.query(`select * from ${table} where email=?`, [email], (err, rows) => {
            if (err) { return callback(err, null); }
            let user = rows[0] || null;
            if (user) {
                this.password = user.password;
                this.email = user.email;
                // compare passwords - is `password` equal to user.password?
                user.comparePassword = (candidatePassword, callback) => {
                    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
                        if (err) { return callback(err); }
                        callback(null, isMatch);
                    });
                }
            }
            callback(err, user);
        });
    }

    // find by id
    static findById(id = 0, callback) {
        // query table data
        database.query(`select * from ${table} where id=?`, [id], function(err, rows) {
            if (err) { return callback(err, null); }
            callback(null, rows[0] || null);
        });
    }
}

module.exports = userSchema;