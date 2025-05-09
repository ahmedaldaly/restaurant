const router = require('express').Router()
const multer = require('multer')
const { auth,authAndAdmin} = require('../middelware/authrazition')
const {addCategory,getAllCategory,deleteCategory} = require('../controller/categoryController')
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.route('/').post(authAndAdmin,upload.single('image'),addCategory).get(getAllCategory)
router.route('/:id').delete(authAndAdmin,deleteCategory)
module.exports =router