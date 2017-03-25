var nodemailer = require('nodemailer');
const username = 'smtpout@addlink.com';
const password = 'Addlink123!';

class sendMail {

    constructor(to, subject, html) {
        this.mail = nodemailer.createTransport({
            host: 'mail.privateemail.com',
            secure: true,
            port: 465,
            auth: {
                user: username,
                pass: password
            }
        });
        this.option = { from: `"Bitcointh" <${username}>`, to, subject, html };
    }

    Send(callback = function() {}) {
        let option = this.option;
        this.mail.sendMail(this.option, function(error, infomation) {
            if (error) {
                callback({ error: 500, message: error });
                return;
            }
            let message = 'Mail message sent: ' + infomation.response;
            callback({ error: 200, message: message, option });
        });
    }

}

module.exports = sendMail;