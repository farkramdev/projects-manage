const database = require('../services/database');

class db_bitcore {
    static addWallet(obj = {}, callback) {
        let acc_id = obj.acc_id;
        let wallet_id = obj.wallet_id;
        let wallet_obj = obj.wallet_obj;

        database.query(`call s_create_wallet(?,?,?)`, [wallet_id, acc_id, wallet_obj],
            (err, result) => {
                if (err) { return callback(err, null) }

                callback(result.affectedRows != 0 ? null : 'insert data error');
            });
    }
}

module.exports = db_bitcore;