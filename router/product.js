const router = require('express').Router();
const multer = require('multer');
const { auth, authAndAdmin } = require('../middelware/authrazition');
const {
  addProduct,
  allProduct,
  getProduct,
  removeProduct,
  editProduct,
  getProductByCategory
} = require('../controller/productController');

// ✅ إعداد التخزين في الذاكرة
const storage = multer.memoryStorage();

// ✅ إعداد التحقق من الحجم والنوع
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
  .post(authAndAdmin, upload.array('images'), addProduct)
  .get(allProduct);

router.get('/by-category', getProductByCategory);

router
  .route('/:id')
  .get(getProduct)
  .delete(authAndAdmin, removeProduct)
  .put(authAndAdmin, editProduct);

module.exports = router;
