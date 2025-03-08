const nodemailer = require('nodemailer');

module.exports.sendMail = (email, subject, html) => {
    const transporter = nodemailer.createTransport({
        sevice : 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASWORD
        }
    });

    const mailOptions = {
        from: 'qn17200502@gmail.com',
        to: email,
        subject:subject,
        html :html
    };

    transporter.sendMail(mailOptions, function(error,info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent : ' + info.response);
            // do something useful
        }
    });
}