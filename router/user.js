const router = require('express').Router()

const { auth,authAndAdmin} = require('../middelware/authrazition')
const {getUser} = require('../controller/userController')
router.get(('/'),auth,getUser)
module.exports =router