class app {
    static btc2money(btc, money, exch_rate, callback) {
        let obj = {
            btc_amount: 0,
            amount: 0
        };
        if (obj.btc_amount > 0 && obj.amount > 0) { callback(obj); }

        if (btc > 0) {
            obj.amount = exch_rate * btc;
            obj.btc_amount = btc;
        } else {
            obj.amount = money;
            obj.btc_amount = money / exch_rate;
        }
        callback(obj);
    };
}

module.exports = app;