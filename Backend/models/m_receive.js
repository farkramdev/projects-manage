const database = require('../services/database');
const table = 'wallets';
class receive {
    static getObjectData(id, callback) {
        database.query(`select * from ${table} WHERE acc_id=?`, [id], function (er, res) {
            callback(res[0]);
        });
    }
    static inserWallet_address(address, walletId, callback) {
        database.query(`insert into wallets_address set address=?,wallet_id=?,txid=0`, [address, walletId]);
    }
    static getAddress_txid(id, callback) {
        database.query(`select * from wallets_address WHERE wallet_id=? and txid=0`, [id], function (er, res) {
            callback(res);
        });
    }

}
module.exports = receive;