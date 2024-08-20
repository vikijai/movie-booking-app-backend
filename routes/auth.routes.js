const express = require('express')
const authController = require('../controllers/auth.controller')

const router = express.Router()

router.post('/signup', authController.handleSignup)
router.post('/signin', authController.handleSignin)

router.get('/me', authController.handleMe)

module.exports = router
