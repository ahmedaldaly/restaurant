const router = require('express').Router()
const {LogIn ,Register} = require('../controller/authController')
router.post('/register',Register)
router.post('/login',LogIn)

module.exports =router