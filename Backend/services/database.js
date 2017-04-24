const mssql = require('mssql');
const config = require('./config');


exports.httpMsgsFormat = config.httpMsgsFormat;

exports.query = (sql, callback) => {
    var conn = new mssql.Connection(config.databaseConfig);
    conn.connect().then(() => {
        var req = new mssql.Request(conn);
        req.query(sql)
            .then((recordset) => {
                conn.close();
                callback(recordset);
            })
            .catch((err) => {
                console.log(err);
                callback(null, err);
            });
    }).catch((err) => {
        console.log(err);
        callback(null, err);
    });
};