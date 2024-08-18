const crypto = require('crypto')
const User = require('../models/user.model')
const JWT = require('jsonwebtoken')
const AppError = require('../errors/app.error')

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET || JWT_SECRET === '') {
  throw new Error('JWT secret is required')
}

class AuthService {
  static generateUserToken(payload) {
    const token = JWT.sign(payload, JWT_SECRET)
    return token
  }

  static async signupWithEmailAndPassword(data) {
    const { firstname, lastname, email, password } = data

    const salt = crypto.randomBytes(26).toString('hex')
    const hashPassword = crypto
      .createHmac('sha256', salt)
      .update(password)
      .digest('hex')

    try {
      const user = await User.create({
        firstname,
        lastname,
        email,
        password: hashPassword,
        salt,
      })
      const token = AuthService.generateUserToken({
        _id: user._id,
        role: user.role,
      })

      return token
    } catch (err) {
      console.log('Err in creating a User')
    }
  }

  static async signinWithEmailAndPassword(data) {
    const { email, password } = data
    const user = await User.findOne({ email })

    if (!user) {
      throw new AppError(`User with email ${email} does not exist.`)
    }

    const hashedPassword = crypto
      .createHmac('sha256', user.salt)
      .update(password)
      .digest('hex')
    if (hashedPassword !== user.password) {
      throw new AppError(`Invalid email id or password`)
    }

    const token = AuthService.generateUserToken({
      _id: user._id,
      role: user.role,
    })

    return token
  }
}

module.exports = AuthService
