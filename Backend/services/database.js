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

module.exports = new mssql.Connection(config, (err) => {
    if (err) { console.error('Error connecting: ' + err); return; }
    console.log('Database connected');
});