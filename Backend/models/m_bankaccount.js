var sendMail = require('./../lib/send_mail');
var template = require('./../lib/templates');
const database = require('../services/database');
const bcrypt = require('bcrypt-nodejs');
const table = 'bank_account';



class bankAccount {
    // insert by Bank
    static insertBank(req, callback) {


        let acc_id = req.user.id;
        let banks_type_id = req.body.banks_type_id;
        let ba_no = req.body.ba_no;
        let ba_name = req.body.ba_name;

        database.query(`select * from banks_type where banks_type_id =? `, [banks_type_id], function (err, rows1) {

            if (rows1[0] != undefined) {

                database.query(`select * from ${table} where ba_no =? and acc_id=?`, [ba_no, acc_id], function (err, rows) {

                    // console.log(rows[0]);
                    if (rows[0] == undefined || rows[0] == null || rows[0] == '') {

                        database.query(`insert into ${table} set acc_id=?, banks_type_id=?,ba_no=?, ba_name=?`, [acc_id, banks_type_id, ba_no, ba_name], (err, result) => {
                            // if (err) { return callback(err) }
                            // callback(result.insertId != 0 ? null : 'insert data error');
                            // database.query(`select * from ${table} where acc_id =?`, [acc_id], function (err, rows) {
                            //     if (err) { return callback(err, null); }
                            //     callback(null, rows[0] || null);
                            // });

                            database.query(`call s_view_banks(?)`, [acc_id], function (err, rows) {
                                if (err) { return callback(err, null); }
                                callback(null, rows[0] || null);
                            });

                        });

                    } else {
                        callback(null);
                    }

                });

            } else {
                callback(null);
            }
        });

        
    }

    // query by acc_id
    static bankaccount(req, callback) {
        let acc_id = req.user.id;
        // query table data
        database.query(`call s_view_banks(?)`, [acc_id], function (err, rows) {
            if (err) { return callback(err, null); }
            callback(null, rows[0] || null);
        });
    }


    // delect by Bank_id
    static delectByBank_id(req, callback) {
        // console.log(req.body);


        let ba_id = req.body.ba_id;
        // query table data
        database.query(`update ${table} set status = '2' where ba_id =?`, [ba_id], function (err, rows) {
            if (err) { return callback(err, 'no'); }
            callback('yes');

        });

    }

    static Bank(req, callback) {
        database.query(`select * from banks_type`, function (err, rows) {
            callback(null, rows || null);
        });
    }

}

module.exports = bankAccount;