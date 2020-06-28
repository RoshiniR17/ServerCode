const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const nodemailer = require("nodemailer");
const {MongoClient} = require('mongodb');
const app=express()
app.use(cors({ origin: "*" }));
app.use(bodyParser.json())
const details = require("./details.json");
const mongoDbUrl = "mongodb://localhost:27017/";

// const dotenv=require('dotenv');
// const mongoose = require('mongoose');


// dotenv.config();

// mongoose.connect('mongodb://localhost:27017/covidcare',{
//     useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true,},()=>
//     console.log('connected to db')
    
// );

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8100"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.urlencoded({extended:true}))
//app.use(express.json());

require('./login')(app,mongoDbUrl, MongoClient);
require('./signup')(app,mongoDbUrl,MongoClient);


const authRoute = require('./routes/auth');

app.use('/api/user',authRoute);
app.listen(3000,()=>console.log('Server running'));

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log(`The mail has beed send`);
    res.send(info);
  });
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: false, // true for 465, false for other ports
    auth: {
      user: details.email,
      pass: details.password
    }
  });

  let mailOptions = {
    from: '"Admin"<bookme2covidcare@gmail.com>', // sender address
    to: user.email, // list of receivers
    subject: user.sub, // Subject line
    html:`<h1>Greetings from CovidCare</h1><br>
    <h4>Appointment has been scheduled on ${user.date}</h4>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}