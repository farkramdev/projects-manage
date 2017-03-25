var fs = require('fs');
exports.code_phone = function (req, res, next) {
    let data = fs.readFileSync('./models/m_phone.dat');
    res.send(JSON.parse(data));
}
