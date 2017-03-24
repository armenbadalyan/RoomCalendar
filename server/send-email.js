'use strict';

const path = require('path');
const nodemailer = require('nodemailer');

const fileName = process.env.GOOGLE_APPLICATION_CREDENTIALS || null;
const file = fileName ? require(path.resolve(fileName)) : null;
const email = file ? file.email : process.env.email;
const password = file ? file.password : process.env.password;

function MailSender() {
  this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: email,
          pass: password
      }
  });
}

MailSender.prototype.send = function(mailOptions) {
  let transporter = this.transporter;
  return new Promise(function (resolve, reject) {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
    });
  });
}

module.exports = MailSender;