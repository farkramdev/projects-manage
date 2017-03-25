
const database = require('../services/database');


class provinces {

    static provinces(req, callback) {

         database.query(`select * from provinces`, function (err, rows1) {

            let data = {
                "data":rows1
            }
            callback(data);
         });
    }
}
module.exports = provinces;