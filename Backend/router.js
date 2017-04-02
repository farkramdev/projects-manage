const passport = require('passport');

// controllers
// const Authentication = require('./controllers/authentication');
// const Account = require('./controllers/account');
// const App = require('./controllers/app');
// const Sell = require('./controllers/tran_sell');
// const sell_without = require('./controllers/sell_without');
// const receive = require('./controllers/receive')
// const Forgotpassword = require('./controllers/forgotpassword');
// const TransBuy = require('./controllers/trans_buy');
// const provinces = require('./controllers/provinces');
// const code_phone = require('./controllers/code_phone');
// const send = require('./controllers/send');
// const balance = require('./controllers/balance');

const student = require('./controllers/student');


// const passportService = require('./services/passport');
// const test = require('./controllers/test');
// const requireAuth = passport.authenticate('jwt', { session: false });
// const requireSignin = passport.authenticate('local', { session: false });
// const unsigned_buy = require('./controllers/buy_without_signed');

module.exports = function(app) {

    app.post('/student_add', student.InsertStudent);
    app.get('/student', student.getStudent);
    app.put('/student/:studentID', student.UpdateStudent);

    // Mogate
    // app.get('/test', test.testpage);
    // app.post('/signin', requireSignin, Authentication.signin);
    // app.post('/signup', Authentication.signup);
    // app.post('/transactions/buy', requireAuth, TransBuy.trans_buy);
    // app.post('/exchange', App.exchangeBTC);
    // app.get('/get_dashboard', requireAuth, App.Dashboard);

    // // Joe 
    // app.post('/get_dashboard/search_date', requireAuth, App.Search_dashboard);

    // // Base
    //app.post('/account', requireAuth, Account.account);
    // app.put('/account/name', requireAuth, Account.edit_name);
    // // app.put('/account/edit/email', requireAuth, Account.edit_email);
    // app.put('/account/phone', requireAuth, Account.edit_phone);
    // app.put('/account/address', requireAuth, Account.edit_address);
    // app.put('/account/password', requireAuth, Account.changepassword);
    // app.post('/receive', requireAuth, receive.receive);
    // app.get('/code_phone', code_phone.code_phone);
    // app.post('/send', requireAuth, send.send);
    // app.post('/balance', requireAuth, balance.balance);
    // // Aop
    // app.get('/provinces', provinces.provinces);
    // app.post('/get_Account_Data', requireAuth, Account.AccountData);

    // // bank
    // app.get('/account/bankaccount', requireAuth, Account.bankaccount);
    // app.post('/account/bankaccount', requireAuth, Account.bankaccount);
    // app.post('/account/bankaccount/add', requireAuth, Account.add_bankaccount);
    // app.post('/account/bankaccount/delete', requireAuth, Account.delete_bankaccount);
    // app.post('/account/bank', requireAuth, Account.Bank);
    // //verifyemail
    // app.get('/account/verifyemail-check/:verifycode', Account.verifyemailcheck);
    // app.post('/account/verifyemail', requireAuth, Account.verifyemail);
    // //sell_bitcore
    // app.post('/sell', requireAuth, Sell.sell);
    // //app.post('/sell_bitcore',requireAuth, Sell.sell_bitcore); //confirm
    // app.post('/sell_bitcore_confirm', requireAuth, Sell.sell_bitcore_confirm);

    // //sell without
    // app.post('/sell_without_create', sell_without.sell_without_create);
    // app.post('/sell_without_payment', sell_without.sell_without_payment);
    // app.post('/sell_without_verify', sell_without.sell_without_verify);
    // app.post('/sell_without_confirm', sell_without.sell_without_confirm);
    // app.get('/sell_without_verify_confirm/:verifycode', sell_without.sell_without_verify_confirm);

    // //champ
    // app.post('/forgotpassword', Forgotpassword.forgot_password);
    // app.post('/verifyToken', Forgotpassword.verify_token);
    // app.post('/changepassword', Forgotpassword.change_password_post);
    // app.post('/unsign_buying_bitcoin', unsigned_buy.buying_bitcoin);
    // //app.post('/getVerifyCode',unsigned_buy.get_verify_code);
    // app.post('/verifyBuying', unsigned_buy.verify_buying);
    // app.post('/uploadImg', unsigned_buy.upload_img);
    // app.post('/showImg', unsigned_buy.order_img);
    // app.post('/orderId_data', unsigned_buy.get_data);
    // // loem
    //app.use('/application', require('./controllers/application'));
}