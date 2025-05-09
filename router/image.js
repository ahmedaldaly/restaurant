
const express = require('express');
const multer = require('multer')
const {addImage,getAllImage,deleteImage } = require('../controller/ImageController');
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
router.route('/add').post(upload.array('images'),addImage)
router.route('/').get(getAllImage)
router.route('/:id').delete(deleteImage)

module.exports = router;
