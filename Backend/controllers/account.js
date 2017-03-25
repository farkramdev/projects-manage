// const jwt = require('jwt-simple');
const account = require('../models/m_account');
const bankaccount = require('../models/m_bankaccount');
const verifyemail = require('../models/m_verifyemail');
const config = require('../config');

const token = require('./authentication');
const bcrypt = require('bcrypt-nodejs');
const validation = require('../lib/validation');

exports.account = function(req, res, next) {
    res.send({ token: token.tokenForUser(req.user), data: req.user, URL: bitcore.bitcoinURL('1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH', 10, 'test bitcore') });
}

exports.edit_name = function(req, res, next) {

    let th = /^[ก-์]+$/;

    let en = /^[A-Za-z]+$/;
    if (req.body.firstname === undefined) {
        res.status(500).send({ msg: 'I want field "firstname" require.' });
        return;
    }
    if (req.body.lastname === undefined) {
        res.status(501).send({ msg: 'I want field "lastname" require.' });
        return;
    }
    if ((!th.test(req.body.firstname) || !th.test(req.body.lastname)) && (!en.test(req.body.firstname) || !en.test(req.body.lastname))) {
        res.status(504).send({ msg: 'I want field "firstname" and "lastname" not mate. ' });
        return;
    }

    if (req.body.firstname.length > 50 && req.body.lastname.length > 50) {
        res.status(503).send({ msg: 'I want field "firstname" and "lastname" maxlength 50 .' });
        return;
    }

    let model = new validation.validationModel({ name: req.body.firstname, lastname: req.body.lastname }, {
        name: [validation.validators.special_characters],
        lastname: [validation.validators.special_characters]
    });
    if (model.valid) {
        account.edit_name(req.user.id, req.body.firstname, req.body.lastname, function(result) {
            account.findbyid(req.user.id, function(rows) {
                res.send({ token: token.tokenForUser(req.user), data: rows });
            });
        });
    } else {
        res.status(502).send({ msg: 'Field "firstname" and "lastname" do not use special characters.' });
        return;
    }
}

exports.edit_phone = function(req, res, next) {
    if (req.body.phone_num === undefined) {
        res.status(500).send({ msg: 'I want field "phone_num" require.' });
        return;
    }
    num = Number(req.body.phone_num);
    if (isNaN(num)) {
        res.status(501).send({ msg: 'I want field "phone_num" to integer. ' });
        return;
    }
    if (req.body.phone_num.length > 10) {
        res.status(502).send({ msg: 'I want field "phone_num" maxlength 10 . ' });
        return;
    }
    account.edit_phone(req.user.id, req.body.phone_num, function(result) {
        account.findbyid(req.user.id, function(rows) {
            res.send({ token: token.tokenForUser(req.user), data: rows });
        });
    });
}
exports.edit_address = function(req, res, next) {
    if (req.body.address === undefined) {
        res.status(500).send({ msg: 'I want field "address" require.' });
        return;
    }
    if (req.body.city === undefined) {
        res.status(501).send({ msg: 'I want field "city" require.' });
        return;
    }
    if (req.body.zipcode === undefined) {
        res.status(502).send({ msg: 'I want field "zipcode" require.' });
        return;
    }
    if (typeof req.body.zipcode === "string") {
        res.status(503).send({ msg: 'I want field "zipcode" to integer.' });
        return;
    }
    if (req.body.zipcode.toString().length > 10) {
        res.status(506).send({ msg: 'I want field "zipcode" maxlength 10 . ' });
        return;
    }
    if (req.body.country === undefined) {
        res.status(504).send({ msg: 'I want field "country" require.' });
        return;
    }
    let model = new validation.validationModel({ city: req.body.city, country: req.body.country }, {
        city: [validation.validators.special_characters],
        country: [validation.validators.special_characters]
    });
    if (model.valid) {
        account.edit_address(req.user.id, req.body.address, req.body.city, req.body.zipcode, req.body.country, function(result) {
            account.findbyid(req.user.id, function(rows) {
                res.send({ token: token.tokenForUser(req.user), data: rows });
            });
        });
    } else {
        res.status(505).send({ msg: 'Field "city" and "country" do not use special characters.' });
        return;
    }
}

exports.changepassword = function(req, res, next) {
    if (req.body.old_password === undefined) {
        res.status(500).send({ msg: 'I want field "old_password" require.' });
        return;
    }
    if (req.body.new_password === undefined) {
        res.status(501).send({ msg: 'I want field "new_password" require.' });
        return;
    }
    if (req.body.re_password === undefined) {
        res.status(502).send({ msg: 'I want field "re_password" require.' });
        return;
    }
    let old = req.body.old_password;
    let pass = req.body.new_password;
    let conpass = req.body.re_password;
    let requireData = {
        password: pass
    }
    let model = new validation.validationModel(requireData, {
        password: [validation.validators.password]
    })
    if (!model.valid) {
        res.status(500).send({ message: 'Invalid password will have more than 8 and a number.' });
        return;
    }
    account.findbyid(req.user.id, function(rows) {
        if (pass != conpass) {
            res.status(501).send({ message: 'You new password and confirm are not match' });
            return;
        }
        bcrypt.compare(old, rows.password, function(err, ress) {
            if (ress) {
                bcrypt.compare(pass, rows.password, function(err, result) {
                    if (!result) {
                        bcrypt.hash(pass, null, null, function(err, hash) {
                            account.changepassword(req.user.id, hash, function() {
                                res.send({ token: token.tokenForUser(req.user), message: 'Sucess' });
                            });
                        })
                    } else {
                        res.status(503).send({ message: 'You old and new password are duplicate , please try again' });
                    }
                });
            } else {
                res.status(502).send({ message: 'You old password incorrect.' });
            }
        });
    });
}

/// P Aop
exports.bankaccount = function(req, res, next) {
    bankaccount.bankaccount(req, function(err, callback) {
        // console.log(callback);
        res.send({ token: token.tokenForUser(req.user), data: callback });
    });



}

exports.add_bankaccount = function(req, res, next) {
    if (req.body.hasOwnProperty('banks_type_id') == false) {
        res.status(500).send({ message: 'no have parameter banks_type_id' });
    } else if (isNaN(req.body.banks_type_id) == true) {
        res.status(500).send({ message: 'banks_type_id enter number' });
    } else if (req.body.hasOwnProperty('ba_no') == false) {
        res.status(500).send({ message: 'no have parameter ba_no' });
    } else if (req.body.hasOwnProperty('ba_name') == false) {
        res.status(500).send({ message: 'no have parameter ba_name' });
    } else if (req.body.ba_name == '') {
        res.status(500).send({ message: 'BANK NAME NOT NULL' });
    } else if (req.body.ba_name.length > 15) {
        res.status(500).send({ message: 'The name is too long.' });
    } else if (req.body.ba_no == '') {
        res.status(500).send({ message: 'BANK NUMBER NOT NULL' });
    } else if (isNaN(req.user.id) == true) {
        res.status(500).send({ message: 'acc_id enter number' });
    } else if (isNaN(req.body.ba_no) == true) {
        res.status(500).send({ message: 'ba_no enter number' });
    } else if (req.body.ba_no.length < 10 || req.body.ba_no.length > 15) {
        res.status(500).send({ message: 'ba_no enter number length 15' });
    } else if (!(/^((?!([~`!#$%\^&*+=\[\]\\';,/{}|\\"":<>\?@])).)+$/).test(req.body.ba_name)) {
        res.status(500).send({ message: 'Please fill out the text only.' });
    } else {

        bankaccount.insertBank(req, function(err, callback) {
            if (callback != null) {
                res.send({ token: token.tokenForUser(req.user), data: callback });

            } else {
                res.status(500).send({ message: '' });
            }
        });

    }

}
exports.delete_bankaccount = function(req, res, next) {
    if (req.body.hasOwnProperty('ba_id') == false) {
        res.status(500).send({ message: 'no have parameter ba_id' });
    } else if (isNaN(req.body.ba_id) == true) {
        res.status(500).send({ message: 'ba_id enter number' });
    } else {
        bankaccount.delectByBank_id(req, function(callback) {
            console.log(callback)
            if (callback == 'yes') {
                res.status(200).send({ token: token.tokenForUser(req.user), message: true });
            } else {
                res.status(500).send({ message: false });
            }
        });
    }
}
exports.Bank = function(req, res, next) {
    bankaccount.Bank(req, function(err, callback) {
        res.send({ data: callback });
    });

}

// email
exports.verifyemailcheck = function(req, res, next) {
    verifyemail.verifyemailcheck(req, function(err, callback) {

        if (callback == 'yes') {
            res.redirect('http://www.ttvone.com/');
        } else {
            res.redirect('https://codepen.io/jonitrythall/pen/bgYbZX');
        }
    });
}

exports.verifyemail = function(req, res, next) {
    if (!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/).test(req.body.email)) {
        res.status(500).send({ message: 'email not formate' });
    } else {
        verifyemail.verifyemail(req, function(err, callback) {
            res.send({ token: token.tokenForUser(req.user), data: callback });
        });
    }

}