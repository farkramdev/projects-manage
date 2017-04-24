var db = require("../services/database");
var httpMsgs = require("../services/httpMsgs");
var util = require("util");
var TABLE = 'Student';

exports.getList = (req, callback) => {
    db.query(`SELECT * FROM ${TABLE}`, (data, err) => {
        if (err) {
            callback({ status: 500 });
        } else {
            callback(data);
        }
    });
};

exports.findOneId = (req, callback) => {
    try {
        db.query(`SELECT * FROM ${TABLE} WHERE studentId=` + util.format('%s', req.params.id), (data, err) => {
            if (err) {
                callback({ status: 500 });
            } else {
                callback(data);
            }
        });
    } catch (ex) {
        callback({ status: 500 });
    }
};

exports.findOneEmail = (req, callback) => {
    try {

        let sql = `SELECT email FROM ${TABLE} WHERE email=` + util.format("%s", req.email);
        //let sql = `SELECT email FROM ${TABLE} WHERE email= ''`
        console.log(sql);

        db.query(sql, (data, err) => {
            if (err) {
                console.log('Error ******');
                callback({ status: 500 });
            } else {
                callback(data);
            }
        });
    } catch (ex) {
        callback({ status: 500 });
    }
};

exports.add = (req, callback) => {
    try {
        if (!req.body) throw new Error("Input not valid");
        var data = req.body;
        if (data) {
            var sql = `INSERT INTO ${TABLE} (studentId, studentFName, studentLName, PhoneNo) VALUES `;
            sql += util.format("('%s', '%s', '%s', '%s') ", data.studentId, data.studentFName, data.studentLName, data.PhoneNo);
            db.query(sql, (data, err) => {
                if (err) {
                    callback({ status: 500 });
                } else {
                    callback({ status: 200 });
                }
            });
        } else {
            throw new Error("Input not valid");
        }
    } catch (ex) {
        callback({ status: 500 });
    }
};

exports.update = (req, callback) => {
    try {
        if (!reqBody) throw new Error("Input not valid");

        var data = req.body;

        if (data) {
            if (!data.studentId) throw new Error("studentId not provided");

            var sql = `UPDATE ${TABLE} SET `;

            var isDataProvided = false;
            if (data.studentFName) {
                sql += "studentFName = `" + data.studentFName + "`,";
                isDataProvided = true;
            }
            if (data.studentLName) {
                sql += "studentLName = `" + data.studentLName + "`,";
                isDataProvided = true;
            }
            if (data.PhoneNo) {
                sql += "PhoneNo = `" + data.PhoneNo + "`,";
                isDataProvided = true;
            }

            if (!isDataProvided) throw new Error("No data provided to update");

            sql = sql.slice(0, -1); //remove last comma
            sql += ` WHERE studentId = ` + data.studentId;

            db.query(sql, function(data, err) {
                if (err) {
                    callback(err);
                } else {
                    callback({ status: 200 });
                }
            });
        } else {
            throw new Error("Input not valid");
        }
    } catch (ex) {
        callback({ status: 500, error: ex });
    }
};

exports.delete = (req, callback) => {
    try {
        if (!req.body) throw new Error("Input not valid");
        var data = req.body;
        if (data) {
            if (!data.studentId) throw new Error("studentId not provided");

            var sql = `DELETE FROM ${TABLE} WHERE studentId = ` + data.studentId;

            db.query(sql, function(data, err) {
                if (err) {
                    httpMsgs.show500(req, resp, err);
                } else {
                    httpMsgs.send200(req, resp);
                }
            });
        } else {
            throw new Error("Input not valid");
        }
    } catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
};