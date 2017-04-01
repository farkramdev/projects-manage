const database = require('../services/database');
const bcrypt = require('bcrypt-nodejs');
var util = require("util");

const table = 'Student';

class StudentC {
    // static findbyid(id, callback) {
    //     database.query(`select * from ${table} WHERE id=?`, [id], function(req, res) {
    //         callback(res[0]);
    //     });
    // }
    // static edit_name(id, name, lastname, callback) {
    //     database.query(`UPDATE ${table} SET firstname=? , lastname=? WHERE id=?`, [name, lastname, id], function(res) {
    //         callback(id);
    //     });
    // }
    // static edit_email(id, email, callback) {
    //     database.query(`UPDATE ${table} SET email=? WHERE id=?`, [email, id]);
    // }
    // static edit_phone(id, phone_num, callback) {
    //     database.query(`UPDATE ${table} SET phone_num=? WHERE id=?`, [phone_num, id], function(res) {
    //         callback(id);
    //     });
    // }
    // static edit_address(id, address, city, zipcode, country, callback) {
    //     database.query(`UPDATE ${table} SET address=? , city=? , zipcode=? , country=?  WHERE id=?`, [address, city, zipcode, country, id], function(res) {
    //         callback(id);
    //     });
    // }
    // static changepassword(id, pass, callback) {
    //     database.query(`UPDATE ${table} SET password=? WHERE id=?`, [pass, id], function(res) {
    //         callback(id);
    //     });
    // }

    static insertStudent(req, callback) {
        //console.log(req.body);
        let v = {
            "studentID": "001",
            "studentFName": "FarkramDev",
            "studentLName": "LastnameDev",
            "PhoneNo": "089555051"
        };
        //let sql = `INSERT INTO Student(studentID, studentFName, studentLName, PhoneNo) VALUES(` + util.format("%s, '%s', %s, %s ", req.body.studentID, req.body.studentFName, req.body.studentLName, req.body.PhoneNo) + `) `;
        let sql = `INSERT INTO Student(studentID, studentFName, studentLName, PhoneNo) VALUES(req.body.studentID, req.body.studentFName, req.body.studentLName, req.body.PhoneNo) `;
        //let val = util.format("(%s, '%s', %s, %s) ", req.body.studentID, req.body.studentFname, req.body.studentLname, req.body.PhoneNo);
        database.query(sql, (err, result) => {
            console.log(err);
            callback(result);
        });
    }

}
module.exports = StudentC;