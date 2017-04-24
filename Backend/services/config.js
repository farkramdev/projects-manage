exports.databaseConfig = {
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
}

exports.httpMsgsFormat = "HTML";

exports.jwt_secret = {
    secret: 'farkramdev@#oneman'
}