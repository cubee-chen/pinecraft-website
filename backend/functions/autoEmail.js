const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const loadEmailTemplate = () => new Promise((resolve, reject) => {
  fs.readFile(path.join(__dirname, '../templates/emailTemplate.html'), 'utf-8', (err, data) => {
    if (err){
      console.error(err);
      reject(err);
    } else {
      resolve(data);
    }
  });
});


const sendEmail = async (receivers = process.env.EMAIL, subject = "Pinecraft 模板寄發通知", text = "", html = "") => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAILPASSWORD
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"${process.env.EMAILSENDER}" <${process.env.EMAIL}>`, // sender address
    to: receivers, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: html // html body
  });
};

const createAndSendEmail = async (username, templateName, templateLink, userEmail) => {
  const html = await loadEmailTemplate();
  const emailContent = html
    .replaceAll("$username", username)
    .replaceAll("$templateName", templateName)
    .replaceAll("$templateLink", templateLink);
  await sendEmail(userEmail, "🌲 感謝您的支持！您的PineCraft模板已準備就緒 🌲", templateLink, emailContent);
};

module.exports = {
  createAndSendEmail
}