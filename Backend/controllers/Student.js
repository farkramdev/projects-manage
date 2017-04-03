const m_student = require('../models/m_students');

exports.getStudent = (req, res, next) => {
    m_student.getList(req, (callback) => {
        res.send({ data: callback });
    });
}

exports.studentFindOne = (req, res, next) => {
    m_student.studentFindOne(req, (callback) => {
        res.send({ data: callback });
    });
}

exports.InsertStudent = (req, res, next) => {
    m_student.add(req, (callback) => {
        res.send({ data: callback });
    });
}

exports.UpdateStudent = (req, res, next) => {
    m_student.update(req, (callback) => {
        res.send({ data: callback });
    });
}