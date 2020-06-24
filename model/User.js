const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({


    firstName:{type:String,
        required:true,
    min : 3},
    lastName:{type:String,
        required:true,
    min : 1},
    Username:{type:String,
        required:true,
    min : 3,
    unique: true },
    Email:{type:String,
        required:true,
    unique: true,
min :9,
max:255},
    password:{type:String,
        required:true,
        min:7
    }

});

module.exports=mongoose.model('User',userSchema);