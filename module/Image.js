const Joi = require('joi');
const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
      url: {
        type: String,
        required: true,
        trim: true,
      },
      id: {
        type: String,
        required: true,
        trim: true,
      },
   
});

const Image = mongoose.model('Image', ImageSchema);
function ImageValidate (obj) {
  const Schema = Joi.object({
    url: Joi.string().required(),
    id: Joi.string().required()
  })
  return Schema.validate()
}
module.exports = {
  Image ,
  ImageValidate
};
