var fs = require('fs');
const database = require('../services/database');
const bcrypt = require('bcrypt-nodejs');
const sendmail = require('../lib/send_mail');
const config = require('../config');

class buy_without_signed {
    // function to encode file data to base64 encoded string
    static base64_encode(file, callback) {
        //var bitmap = fs.readFileSync(file);
        //return new Buffer(bitmap).toString('base64');
        var img_base64 = new Buffer(file).toString('base64');
        callback(img_base64);
        //return img_base64;
    }

    static base64_decode(file, callback) {
        var img = new Buffer(file, 'base64').toString('hex');
        callback(img);
        //return img;
    }

    static create_comfirm_code(callback) {
        var iconfirm_code;
        var possible = "0123456789";
        iconfirm_code = parseInt((Math.random() * 9999999) % 1000000);

        console.log({confirmCode : iconfirm_code});
        callback(iconfirm_code);
    }

    static save_order(ibtc_address, ibtc_amount, iamount, ifee, icurrency, iexch_rate, ibanks_type_id, iemail, iphone_num, iconfirm_code, callback) {
        bcrypt.hash(iconfirm_code, null, null, function (err, hash_confirm_code) {
            database.query('call btctest.s_trans_buy_wo(?,?,?,?,?,?,?,?,?,?);',
                [ibtc_address, ibtc_amount, iamount, ifee, icurrency, iexch_rate, ibanks_type_id, iemail, iphone_num, hash_confirm_code], (err, result) => {
                    //var url = config.domain + "/uploadImg/" + result[0][0].order_id;

                    var url = "http://localhost:4200/uploadbuywithwithout/" + result[0][0].order_id;
                    console.log(result[0][0]);
                    console.log({confirnCode : hash_confirm_code});
                    if (result[0][0].error == 0) {
                        let mail = new sendmail(iemail, "bitcoin Upload image", '<a href=' + url + '>Upload Image Page</a>');
                        mail.Send();
                        //res.status(200).send(result[0][0]);

                        callback({ status: 200, message: result[0][0] });
                    } else {
                        //res.status(500).send("fail");
                        callback({ status: 500, message: "fail" });
                    }
                });
        });
    }

    static verify_buy(order_id, confirm_code, callback) {

        database.query('select * from confirm_order where order_id = ?', [req.body.order_id], (err, result) => {
            if (confirm_code == result[0].confirm_by_email) {
                callback({ status: 200, message: "success" });
            } else {
                callback({ status: 500, message: "doesn't match verify code" });
            }
        });
    }

    static save_image(order_id, img_base64, callback) {
        database.query('insert into payment_confirm (order_id,image,add_dt) values(?,?,now()) ', [order_id, img_base64], (err, result) => {
            callback("success");
        });
    }

    static show_img(order_id, callback) {
        database.query('select * from payment_confirm where order_id =?', [order_id], (err, result) => {
            //console.log(result);
            callback({ length: result.length, img: result[0].image });
            /*if (result.length != 0) {
                res.status(200).send({ img: result[0].image });
            } else {
                res.status(500).send("fail");
            }*/
        })
    }

    static get_data(order_id,callback){
        database.query('select * from orders where order_id =?', [order_id], (err, result) => {
            callback(result);
        })
    }

}

module.exports = buy_without_signed;