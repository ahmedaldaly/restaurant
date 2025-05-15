const mongoose = require('mongoose');
const joi  = require('joi')
const UserSchema = new mongoose.Schema({
    name:{
        required:true,
        trim:true,
        type:String,
        minlength:5,
        maxlength:30
    },
    email:{
        required:true,
        trim:true,
        type:String,
        minlength:5,
        maxlength:50 ,
        unique:true
    },
    phone:{
        required:true,
        trim:true,
        type:Number,
    },
    address:{
        required:true,
        trim:true,
        type:String,
    },
    password:{
        required:true,
        trim:true,
        type:String,
        minlength:8,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    token:{
        type:String,
        trim:true
    }
},{timestamps:true})
const User =mongoose.model('User',UserSchema);

function validateRegister(obj){
    const schema = joi.object({
        name: joi.string().required().min(5).max(30),
        email:joi.string().required().min(5).max(50).email(),
        password:joi.string().min(8).required(),
        phone:joi.number().required(),
        phone:joi.string().required(),
        token: joi.string()
    })
    return schema.validate(obj)
}
function validateLogin(obj){
    const schema = joi.object({
        email:joi.string().required().min(5).max(50).email(),
        password:joi.string().min(8).trim().required(),
    })
    return schema.validate(obj)
}

module.exports ={
    User,
    validateLogin,
    validateRegister
}