const Image = require('../module/Image');
const asyncHandler = require('express-async-handler');
const streamifier = require('streamifier');
const cloudinary = require('../config/Cloud');

module.exports.addImage = asyncHandler(async (req, res) => {
  try {
    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'products' },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    // رفع كل صورة وتخزينها في Document منفصل
    const savedImages = await Promise.all(
      req.files.map(async (file) => {
        const result = await streamUpload(file.buffer);
        const newImage = new Image({
          url: result.secure_url,
          id: result.public_id,
        });
        return await newImage.save();
      })
    );

    res.status(201).json({ message: 'Images uploaded successfully', data: savedImages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Image upload failed', error: err.message });
  }
});
module.exports.getAllImage = asyncHandler(async (req, res) => {
  try {
    const find = await Image.find();
    if (!find || find.length === 0) {
      return res.status(404).json({ message: 'No images found' });
    }
    res.status(200).json(find);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports.deleteImage = asyncHandler(async (req, res) => {
  try {
   

    // ابحث عن الصورة في قاعدة البيانات
    const imageDoc = await Image.findById(req.params.id);
    if (!imageDoc) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // حذف الصورة من Cloudinary
    await cloudinary.uploader.destroy(imageDoc.id);

    // حذف الصورة من قاعدة البيانات
    await Image.findByIdAndDelete(imageDoc._id);

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting image', error: err.message });
  }
});
