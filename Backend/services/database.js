const mssql = require('mssql');

var config = {
    user: 'sa',
    password: '123456',
    server: 'ADDLINK-NB004', //ADDLINK-NB004
    database: 'projects',
    port: 1433,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

exports.httpMsgsFormat = "HTML";

exports.query = (sql, callback) => {
    var conn = new mssql.Connection(config);
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