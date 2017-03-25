const m_provinces = require('../models/m_provinces');

exports.provinces = function (req, res, next) {
   m_provinces.provinces(req, function (callback) {
        res.send({ 'data': callback });
    });
}