const mssql = require('mssql');

var config = {
    user: 'sa',
    password: '123456',
    server: 'ADDLINK-NB004',
    database: 'projects',
    port: 1433,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

exports.httpMsgsFormat = "HTML";

exports.query = function(sql, callback) {
    var conn = new mssql.Connection(config);
    conn.connect().then(function() {
        var req = new mssql.Request(conn);
        req.query(sql).then(function(recordset) {
            conn.close();
            callback(recordset);
        }).catch(function(err) {
            console.log(err);
            callback(null, err);
        });
    }).catch(function(err) {
        console.log(err);
        callback(null, err);
    });
};