const Joi=require('@hapi/joi');
const registerValidation=(data)=>{



const schema=Joi.object({
    firstName:Joi.string().min(5).required(),
    lastName:Joi.string().min(1).required(),
    Username:Joi.string().min(7).required(),
    Email:Joi.string().min(7).required().email(),
    password:Joi.string().min(7).required()

});
return schema.validate(data);
};

const loginValidation=(data)=>{



    const schema=Joi.object({
        
        Username:Joi.string().min(7).required(),
      
        password:Joi.string().min(7).required()
    
    });
    return schema.validate(data);
    };
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;