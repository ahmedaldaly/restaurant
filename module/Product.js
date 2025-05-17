const mongoose = require('mongoose');
const Joi = require('joi');

// ✅ Mongoose Schema
const ProductSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 500,
  },
  descriptionAr: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 500,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  sizes: [
    {
      size: {
        type: String,
        required: true,
        enum: ['sm', 'md', 'lg'],
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  images: [
    {
      url: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
    },
  ],
});

// ✅ Joi Validation
function productValidation(obj) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    description: Joi.string().min(5).max(500).required(),
    descriptionAr: Joi.string().min(5).max(500).required(),
    category: Joi.string().required(),
    sizes: Joi.array()
      .items(
        Joi.object({
          size: Joi.string().valid('sm', 'md', 'lg').required(),
          price: Joi.number().positive().required(),
        })
      )
      .min(1)
      .required(),
    images: Joi.array()
      .items(
        Joi.object({
          url: Joi.string().uri().required(),
          id: Joi.string().required(),
        })
      )
      .min(1)
      .required(),
  });

  return schema.validate(obj, { abortEarly: false }); // يعرض جميع الأخطاء دفعة واحدة
}

const Product = mongoose.model('Product', ProductSchema);

module.exports = {
  Product,
  productValidation,
};
