const express = require('express');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');
const app=express()
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
app.use(bodyParser.json())
//app.use(express.json());

require('./login')(app,mongoDbUrl, MongoClient);


const authRoute = require('./routes/auth');

app.use('/api/user',authRoute);





app.listen(3000,()=>console.log('Server running'));