const auth = require('./authentication');
// const app = require('../lib/app');
// const m_app = require('../models/m_app');

// exports.exchangeBTC = function(req, res, next) {
//     exch_rate.request(url_rate, (err, exchRate) => {
//         let btc_amount = req.body.btc_amount;
//         let amount = req.body.amount;
//         let exch_rate = exchRate;
//         let obj = {
//             btc_amount: 0,
//             amount: 0
//         }

//         if ((btc_amount > 0 && amount > 0) || (btc_amount === 0 && amount === 0)) { return res.send(obj); }

//         app.btc2money(btc_amount, amount, exch_rate, (res_obj) => {
//             if (btc_amount > 0) {
//                 obj.btc_amount = btc_amount;
//                 obj.amount = res_obj.amount;
//             } else {
//                 obj.btc_amount = res_obj.btc_amount;
//                 obj.amount = amount;
//             }
//             res.status(200).send(obj);
//         });

//     });
// }

// exports.Dashboard = (req, res, next) => {

//     m_app.get_countDash(req.user.id, (err, count) => {
//         console.log(req.query.pages);
//         m_app.get_dashboard(req.user.id, req.query.pages, (err, data) => {

//             console.log({ count: count, data: data });
//             res.status(200).send({ token: auth.tokenForUser(req.user), count: count, data: data });
//         });
//     });
// }