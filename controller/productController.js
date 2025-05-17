const {Product , productValidation} = require('../module/Product'); // استخدم التصدير الصحيح
const { validetCategory, Category } = require('../module/Category');
const asyncHandler = require('express-async-handler');
const cloudinary = require('../config/Cloud');
const streamifier = require('streamifier'); // تأكد من تثبيته: npm i streamifier

module.exports.addProduct = asyncHandler(async (req, res) => {
  try {
    const { title, description, descriptionAr, category, sizes } = req.body;

    // ✅ تحويل sizes إلى JSON إذا كانت سترينج
    const parsedSizes = typeof sizes === 'string' ? JSON.parse(sizes) : sizes;

    // ✅ صور وهمية مؤقتًا للفالديشن
    const placeholderImages = req.files?.map(() => ({
      url: 'https://placeholder.com/image.png',
      id: 'placeholder_id',
    }));

    // ✅ التحقق من الفالديشن
    const { error } = productValidation({
      title,
      description,
      descriptionAr,
      category,
      sizes: parsedSizes,
      images: placeholderImages,
    });

    if (error) {
      return res.status(400).json({ message: error.details.map(e => e.message).join(', ') });
    }

    // ✅ التأكد من وجود الكاتيجوري
    const checkCategory = await Category.findOne({ name: category });
    if (!checkCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // ✅ دالة رفع الصور
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

    // ✅ رفع الصور الفعلية
    const imageUploads = await Promise.all(
      req.files.map(async (file) => {
        const result = await streamUpload(file.buffer);
        return {
          url: result.secure_url,
          id: result.public_id,
        };
      })
    );

    // ✅ إنشاء المنتج
    const newProduct = new Product({
      title,
      description,
      descriptionAr,
      category,
      sizes: parsedSizes,
      images: imageUploads,
    });

    const save = await newProduct.save();
    res.status(201).json(save);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
});

module.exports.allProduct =asyncHandler(async(req, res)=>{
    try{
        const find = await Product.find();
        if(!find){
            res.status(404).json({message:'not found'})
        }
        res.status(200).json(find)
    }catch(err){res.status(500).json(err)}
});
module.exports.getProduct = asyncHandler(async(req,res)=>{
    try{
        const find = await Product.findById(req.params.id)
        if(!find){
            res.status(404).json({message:'product not found'})
        }
        res.status(200).json(find)
    }catch(err){res.status(500).json(err)}
})
module.exports.removeProduct = asyncHandler(async (req, res) => {
    try {
      const find = await Product.findById(req.params.id);
      if (!find) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      const images = find.images;
  
      // حذف الصور من Cloudinary
      
        images.map(async (item) => {
          await cloudinary.uploader.destroy(item.id);
        })
     
  
      // حذف المنتج من قاعدة البيانات
      await Product.findByIdAndDelete(req.params.id);
  
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
  });
  
  module.exports.editProduct = asyncHandler(async (req,res)=>{
    try{
      const { title, description,descriptionAr, category, sizes } = req.body;
      const check = await Product.findById(req.params.id)
      if(!check){
        res.status(404).json({message:'product not found'})
      }
      const parsedSizes = typeof sizes === 'string' ? JSON.parse(sizes) : sizes;

      const edit = await Product.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        sizes:parsedSizes,
        description,
        descriptionAr,
      },{new:true})
      res.status(200).json(edit)
    }catch(err){res.status(500).json(err)}
  })
module.exports.getProductByCategory = asyncHandler(async (req, res) => {
  try {
    const { category } = req.query;
    
    let find;

    if (category && category.trim() !== '') {
      // لو فيه title مش فاضي
      find = await Product.find({ category: category });
    } else {
      // لو مفيش title → رجع الكل
      find = await Product.find({});
    }

    if (!find || find.length === 0) {
      return res.status(404).json({ message: 'not found' });
    }

    res.status(200).json( find );
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});
