const express = require('express');
const multer = require('multer');
const { auth, authAndAdmin } = require('../middelware/authrazition');
const { addImage, getAllImage, deleteImage } = require('../controller/ImageController');

const router = express.Router();

// ✅ إعداد التخزين في الذاكرة (لرفع مباشر إلى Cloudinary مثلاً)
const storage = multer.memoryStorage();

// ✅ أنواع الملفات المسموح بها (صور فقط)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('فقط الصور بصيغ jpeg/jpg/png/webp مسموح بها.'));
  }
};

// ✅ الحد الأقصى للحجم (مثلاً: 2MB لكل صورة)
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 2MB
  },
  fileFilter,
});

// ✅ الراوتر مع الحماية
router.route('/add').post(authAndAdmin, upload.array('images', 5), addImage); // حد أقصى 5 صور
router.route('/').get(getAllImage);
router.route('/:id').delete(authAndAdmin, deleteImage);

module.exports = router;
