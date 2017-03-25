const database = require('../services/database');
const bcrypt = require('bcrypt-nodejs');
const sendmail = require('../lib/send_mail');
const fs = require('fs');
const config = require('../config');
const model = require('../models/m_buy_without_signed');

exports.buying_bitcoin = function(req, res, next) {
    var ibtc_address = req.body.bitcoinAddress;
    var ibtc_amount = req.body.btc;
    var iamount = req.body.amountPrice;
    var ifee = req.body.fee;
    var icurrency = req.body.currency;
    var iexch_rate = req.body.exchangeRate;
    var ibanks_type_id = req.body.paymentMethod;
    var iemail = req.body.email;
    var iphone_num = req.body.phone_number;
    var iconfirm_code;
    model.create_comfirm_code(function (callback) {
        iconfirm_code = callback;
        console.log(iconfirm_code);
    });
    console.log({ibtc_address, ibtc_amount, iamount, ifee, icurrency, iexch_rate, ibanks_type_id, iemail, iphone_num});
    model.save_order(ibtc_address, ibtc_amount, iamount, ifee, icurrency, iexch_rate, ibanks_type_id, iemail, iphone_num, iconfirm_code,
        function (callback) {
            
            res.status(callback.status).send(callback.message);
        });
}

exports.verify_buying = function (req, res, next) {
    model.verify_buy(req.body.order_id,req.body.confirm_code, function (callback) {
        res.status(callback.status).send(callback.message);
    });
}

exports.upload_img = function (req, res, next) {

    model.save_image(req.body.order_id, req.body.img_base64, function (callback) {
        res.status(200).send("success");
    });
    //console.log("upload");
    /*var form = new formidable.IncomingForm();
    console.log("upload");
    form.parse(req);

    form.on('file', (name, file) => {
        //console.log(file);
        fs.readFile(file.path, function (err, data) {
            if (err) throw err;

            var img_encode = model.base64_encode(data);
            console.log(img_encode);
            res.status(200).send(img_encode);
        });
    });*/
}

exports.order_img = function (req, res, next) {
    model.show_img(req.body.order_id, function (callback) {
        if (callback.length > 0) {
            res.status(200).send({ img: callback.img });
        } else {
            res.status(500).send("fail");
        }
    });
}

exports.get_data = function(req,res,next){
    console.log({orderId : req.body.order_id});
    model.get_data(req.body.order_id,function(callback){
        console.log({callback : callback});
        res.send(callback);
    })
}