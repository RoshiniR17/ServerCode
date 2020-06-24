const express =require('express');
const router=express.Router();

const User=require('../model/User');
const jwt =require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const {registerValidation,loginValidation}=require('../validation');




//Validation

router.post('/register',async(req,res)=>{
//validation before we are a user
    const{error} = registerValidation(req.body);

if(error) return res.status(400).send(error.details[0].message);
//check if user exists
const usernameExist=await User.findOne({Username:req.body.Username});
if(usernameExist) return res.status(400).send('Username already exists');
//hash password
const salt=await bcrypt.genSalt(10);
const hashPassword= await bcrypt.hash(req.body.password,salt);

//new user
   const user= new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        Username:req.body.Username,
        Email:req.body.Email,
        password:hashPassword
    });
    try{
        const savedUser=await user.save();
        res.send({user:user.Username});

    }catch(err){
        res.status(400).send(err);
    }
});

//login
router.post('/login',async(req,res)=>{

    const{error} = loginValidation(req.body);

     if(error) return res.status(400).send(error.details[0].message);
     const user=await User.findOne({Username:req.body.Username});
if(!user) return res.status(400).send('Username does not exist');
     
    const validPass=await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send('Invalid Password');
    //create and assign a token
   const token=jwt.sign({Username:user.Username},process.env.TOKEN_SECRET)

   res.send();
    
});




module.exports=router;