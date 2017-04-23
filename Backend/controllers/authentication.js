const jwt = require('jwt-simple');
const validation = require('../lib/validation');
const Student = require('../models/m_students');
// const config = require('../config');

// function tokenForUser(user) {
//     const timestamp = new Date().getTime();
//     const timestampexp = new Date().getTime() + 10000;
//     var date = Math.floor(Date.now() / 1000) + (60 * 60);

//     return jwt.encode({ sub: user.id, iat: timestamp, exp: date }, config.secret); //,exp:900000
// }

// exports.signin = function(req, res, next) {
//     // User has already had their email and password auth'd
//     // We just need to give them a token
//     if (req.user.block_status == 0) {
//         res.send({ token: tokenForUser(req.user) });
//     } else {
//         res.status(500).send("You have been blocked.");
//     }
// }

exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const re_password = req.body.re_password;

    if (password !== re_password) { return res.status(500).send({ message: 'password not match.' }); }

    let res_valid = new validation.validationModel(req.body, {
        email: [validation.validators.required, validation.validators.email],
        password: [validation.validators.required, validation.validators.password],
        re_password: [validation.validators.required, validation.validators.password]
    });

    if (res_valid.valid === true) {

        // See if a user with the given email exists
        Student.findOne({ email: email }, function(err, existingUser) {
            if (err) { return next(err); }

            // If a user with email does exist, return an error
            if (existingUser) {
                return res.status(502).send({ message: 'Email is in use' });
            }

            // If a user with email does NOT exist, create and save user record
            const user = new User({
                email: email,
                password: password
            });

            user.save(function(err, result) {
                // create wallet from bitcore
                bitcore_app.Createbitcore(email, (info, data) => {
                    // create bitcoin address
                    bitcore_app.CreateAddress(data, (addr) => {

                        // create wallet obj
                        let wallet_obj = {
                            acc_id: result.id,
                            wallet_id: info.wallet.id,
                            wallet_obj: JSON.stringify(data)
                        };

                        // Add wallet    
                        m_bitcore.addWallet(wallet_obj, (err, resWallet) => {
                            //Repond to request indicating the user was created
                            res.send({ token: tokenForUser(result) });
                        });
                    });
                });
            });
        });
    } else {
        return res.status(502).send({ message: 'The email address that you\'ve entered doesn\'t match any account.' });
    }
}

// exports.tokenForUser = tokenForUser;