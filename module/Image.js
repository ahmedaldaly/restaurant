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
module.exports = Image;
