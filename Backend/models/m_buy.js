const db = require('../services/database');


class transBuy {
    static insTransBuy(obj = {}, callback) {
        let acc_id = obj.acc_id;
        let btc_amount = obj.btc_amount;
        let amount = obj.amount;
        let currency = obj.currency;
        let exch_rate = obj.exch_rate;
        let banks_type_id = obj.banks_type_id;
        let btc_address = obj.btc_address;
        console.log(obj);
        db.query(`call s_trans_buy(?,?,?,?,?,?,?)`, [acc_id, btc_amount, amount, currency, exch_rate, btc_address, banks_type_id],
            (err, result) => {
                if (err) { return callback(err); }
                callback(err, result[0][0].other);
            });
    }
}

module.exports = transBuy;