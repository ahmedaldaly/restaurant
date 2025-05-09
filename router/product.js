const router = require('express').Router()
const multer = require('multer')
const { auth,authAndAdmin} = require('../middelware/authrazition')
const {addProduct,allProduct,getProduct,removeProduct,editProduct,getProductByCategory} = require('../controller/productController')
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.route('/').post(authAndAdmin,upload.array('images'),addProduct).get(allProduct)
router.get('/by-category',getProductByCategory)
router.route('/:id').get(getProduct).delete(authAndAdmin,removeProduct).put(authAndAdmin,editProduct)
module.exports =router