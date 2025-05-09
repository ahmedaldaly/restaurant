const {validetCategory,Category} = require('../module/Category')
const asyncHandler = require('express-async-handler')
const cloudinary = require('../config/Cloud')
const streamifier = require('streamifier');
module.exports.addCategory = asyncHandler(async (req, res) => {
    try {
      const { error } = validetCategory(req.body);//التحقق من المعلومات في السيرفر
      if (error) return res.status(400).json({ message: 'error in data' });
  
      const check = await Category.findOne({ name: req.body.name });
      if (check) return res.status(401).json({ message: 'Category already exist' });
  
      if (!req.file) return res.status(400).json({ message: 'No image provided' });
  
      const streamUpload = (buffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) resolve(result);
            else reject(error);
          });
          streamifier.createReadStream(buffer).pipe(stream);
        });
      };
  
      const result = await streamUpload(req.file.buffer);
  
      const newCategory = new Category({
        name: req.body.name,
        image: {
          url: result.secure_url,
          id: result.public_id,
        },
      });
  
      const saved = await newCategory.save();
      res.status(201).json(saved);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  module.exports.getAllCategory = asyncHandler(async(req,res)=>{
    try{
        const find = await Category.find()
        if(!find)res.status(404).json({message:'categorys not found'})
            res.status(200).json(find)
    }catch(err){res.status(500).json(err)}
  })
 
module.exports.deleteCategory = asyncHandler(async (req, res) => {
    try {
      const find = await Category.findById(req.params.id);
  
      if (!find) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      // حذف الصورة من Cloudinary
      if (find.image?.id) {
        await cloudinary.uploader.destroy(find.image.id);
      }
  
      // حذف الكاتيجوري من قاعدة البيانات
      await Category.findByIdAndDelete(req.params.id);
  
      res.status(200).json({ message: 'Category is deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });