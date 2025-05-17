const router = require('express').Router();
const multer = require('multer');
const { auth, authAndAdmin } = require('../middelware/authrazition');
const {
  addCategory,
  getAllCategory,
  deleteCategory
} = require('../controller/categoryController');

// ✅ إعداد التخزين في الذاكرة
const storage = multer.memoryStorage();

// ✅ إعداد الحماية
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 ميجا
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('فقط الصور من نوع JPEG أو PNG أو WEBP مسموح بها.'));
    }
  }
});

// ✅ الراوتات
router
  .route('/')
  .post(authAndAdmin, upload.single('image'), addCategory)
  .get(getAllCategory);

router
  .route('/:id')
  .delete(authAndAdmin, deleteCategory);

module.exports = router;
