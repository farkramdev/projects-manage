const m_student = require('../models/m_student');
exports.student = (req, res, next) => {
    m_student.insertStudent(req, function(callback) {
        res.send({ data: callback });
    })
}