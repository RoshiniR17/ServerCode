const express=require('express');
const app=express();
const dotenv=require('dotenv');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');

dotenv.config();

mongoose.connect('mongodb://localhost:27017/covidcare',{
    useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true,},()=>
    console.log('connected to db')
    
);

app.use(express.json());



const authRoute = require('./routes/auth');

app.use('/api/user',authRoute);





app.listen(3000,()=>console.log('Server running'));