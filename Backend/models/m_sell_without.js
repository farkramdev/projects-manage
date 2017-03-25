const database = require('../services/database');
//const bitcore = require('../services/bitcore');
//const s_btcsell = require('../services/s_btcsell');
var sendMail = require('./../lib/send_mail');
var template = require('./../lib/templates');
var http = require("http");
const config = require('../config');

class sell_without {

    static sell_without_create(req, callback) {
        s_btcsell.request('http://api.coindesk.com/v1/bpi/currentprice/THB', function(status, body) {
            let data = { 'btc_price': body }
            callback(data);
        });
    }

    static sell_without_payment(req, callback) {
        let btc_amount = req.body.btc_amount;
        let btc_price = req.body.btc_price;
        // s_btcsell.request('http://api.coindesk.com/v1/bpi/currentprice/THB', function (status, body) {

        // dsf
        // database.query(`insert into transactions set type=?,btc_amount=?, amount=?,currency=?`,
        //     [13, btc_amount, btc_price, 'THB'], (err, result) => {
        //         database.query(`select * from transactions ORDER BY trans_id DESC LIMIT 1`, function (err, rows) {
        database.query(`select * from banks_type`, function(err, rows1) {

            let data = {
                    //'trans_id': rows[0].trans_id,
                    'btc_amount': btc_amount,
                    'btc_price': btc_price,
                    'banks': rows1
                }
                //console.log(result.affectedRows);
            callback(data);
        });
        //     });
        // });//end insert
        //}); //body


    }

    static sell_without_verify(req, callback) {

        let banks_type_id = req.body.banks_type_id;
        let ba_no = req.body.ba_no;
        let ba_name = req.body.ba_name;
        let btc_amount = req.body.btc_amount;
        let btc_price = req.body.btc_price;
        let free = req.body.free;


        let data = {
            'banks_type_id': banks_type_id,
            'ba_no': ba_no,
            'ba_name': ba_name,

            'btc_amount': btc_amount,
            'btc_price': btc_price,
            'free': free
        }
        callback(data);

    }

    static sell_without_confirm(req, callback) {

        let banks_type_id = req.body.banks_type_id;
        let ba_no = req.body.ba_no;
        let ba_name = req.body.ba_name;
        let btc_amount = parseInt(req.body.btc_amount);
        let btc_price = req.body.btc_price;
        let free = req.body.fee;
        let currency = req.body.currency;
        let email = req.body.email;
        let phone = req.body.phone;


        s_btcsell.request('http://api.coindesk.com/v1/bpi/currentprice/THB', function(status, body) {


            var text = "";
            var possible = "0123456789";
            for (var i = 0; i < 6; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            let temp = template.verifySell(email, config.domain + '/sell_without_verify_confirm/' + text);
            let mail = new sendMail(email, "Verify Sell", temp);
            mail.Send();

            database.query(`call s_trans_sell_wo(?,?,?,?,?,?,?,?,?,?,?)`, [btc_amount, btc_price, free, currency, body, banks_type_id, ba_no, ba_name, email, phone, text],
                (err, result) => {
                    if (err) {
                        return callback(err);
                    } else {
                        console.log(result[0][0].order_id);

                        database.query(`select * from cp_wallets_address where cp_address_id=?`, [1], function(err, rows) {
                            if (rows[0] == undefined || rows[0] == null || rows[0] == '') {
                                callback(null)
                            } else {
                                callback({ address: rows[0].cp_address, order_id: result[0][0].order_id });
                            }
                        });

                    }

                });
        });


    }

    static sell_without_verify_confirm(req, callback) {
        database.query(`select * from confirm_order where confirm_code =? and confirm_by_email=?`, [req.params.verifycode, 'p'], function(err, rows) {
            if (rows[0].email != '') {
                database.query(`update confirm_order set confirm_by_email = 'v' where confirm_code =? `, [req.params.verifycode], function(err, rows2) {});
                callback('yes');
            } else {
                callback('no')
            }
        });

    }
}
module.exports = sell_without;