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

var request = null;

// connect to your database
mssql.connect(config);
module.exports = new mssql.Request();