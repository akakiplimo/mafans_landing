const functions = require("firebase-functions");
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
 admin.initializeApp();

let transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "apikey",
      pass: "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",
    },
  });

exports.sendEmail = functions.https.onRequest((request, response) => {
    const email_from = request.query.email_from;
    const message = request.query.message;

    const mailOptions = {
        from: 'Mafans App <akakiplimo@gmail.com>',
        to: 'replictech@gmail.com',
        subject: 'Mafans Contact Form Submission',
        html: `${message} <br><br> From ${email_from}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error){
            console.log(`ERROR: (email) ${email_from} --- (message) ${message} ---- (error) ${error.toString()}`);
            response.send(error.toString());
        }
        response.send('Your message was submitted successfully!');
    });
})

