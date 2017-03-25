const db = require('../services/database');

class m_app {
    static get_btcAddress(acc_id, callback) {
        db.query(`select btc_address from wallets where acc_id = ?`, [acc_id], (err, rows) => {
            if (err) { return callback(err, null); }
            callback(rows);
        });
    }

    static get_dashboard(acc_id, pages, callback) {
        db.query(`call s_get_dashboard(?,?)`, [acc_id, pages], (err, res) => {
            if (err) { return callback(err, null); }
            callback(null, res[0]);
        });
    }

    static get_countDash(acc_id, callback) {
        db.query(`select count(*) as count from orders where acc_id = ?`, [acc_id], (err, res) => {
            if (err) { return callback(err); }
            callback(null, res[0].count);
        });
    }
}

module.exports = m_app;