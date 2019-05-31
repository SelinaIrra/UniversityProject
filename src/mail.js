const nodemailer = require('nodemailer');
const CONFIG = require('./config').mail;

let transporter = null;

function get_transporter() {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            host: CONFIG.host,
            port: CONFIG.port,
            secure: true,
            auth: {
                user: CONFIG.username,
                pass: CONFIG.password
            }
        });
    }
    return transporter;
}

function get_mail_template() {
    return {
        from: CONFIG.username,
        to: CONFIG.manager_email,
        subject: 'Заявка',
        text: `В ${new Date()} была оставлена заявка:\n`
    };
}

function send_email(fio, school, _class, faculty, phone) {
    const mail = get_mail_template();
    mail.text += `Контактное лицо: ${fio}\nШкола: ${school}\nКласс: ${_class}\nНаправление обучения: ${faculty}\nТелефон: ${phone}`;
    get_transporter().sendMail(mail, function (error, info) {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = send_email;
