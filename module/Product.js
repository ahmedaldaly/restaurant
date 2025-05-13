const mongoose = require('mongoose');

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
        enum: ['sm', 'md', 'lg'], // اختياري: تحديد القيم المقبولة
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

const Product = mongoose.model('Product', ProductSchema);
module.exports =Product;