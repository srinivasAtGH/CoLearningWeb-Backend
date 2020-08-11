import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

//Step 1
var transport = nodemailer.createTransport({
    service:'gmail',
    auth:{
      //  user: process.env.EMAIL, 
       // pass: process.env.PASSWORD
       user: 'testingCLWnodejs@gmail.com', 
       pass: 'testingCLW'
    }
});

//Step 2
var mailOptions = {
    from: 'testingCLW@gmail.com',
    to: 'bawalekar.nilesh@gmail.com',
    subject: 'CLW - Registration Confirmaion',
    html: '<h1>Welcome, You have been successfully registerd for Co-Learning Web</h1>'
};

//Step 3
transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  });