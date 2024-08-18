const express = require('express')
const authController = require('../controllers/auth.controller')

const router = express.Router()

router.post('/signup', authController.handleSignup)
router.post('/signin', authController.handleSignin)

module.exports = router
