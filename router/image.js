
const express = require('express');
const multer = require('multer')
const { auth,authAndAdmin} = require('../middelware/authrazition')
const {addImage,getAllImage,deleteImage } = require('../controller/ImageController');
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
router.route('/add').post(authAndAdmin,upload.array('images'),addImage)
router.route('/').get(getAllImage)
router.route('/:id').delete(authAndAdmin,deleteImage)

module.exports = router;
