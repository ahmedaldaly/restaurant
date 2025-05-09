const Joi = require('joi')
const mongoose = require('mongoose')
const CategorySchema = new mongoose.Schema({
    name:{
        require:true,
        unique:true,
        trim:true,
        type:String
    },
    image:{
        url:{
            required:true,
            type:String
        },
        id:{
            required:true,
            type:String
        }
    }
},{timeseries:true})
const Category = mongoose.model('Category',CategorySchema)
function validetCategory (obj){
    const schema =Joi.object({
        name: Joi.string().required(),
        image:{
            url: Joi.string().required(),
            id: Joi.string().required(),
        }
    })
    return schema.validate(obj)
}

module.exports = {
    Category,
    validetCategory
}