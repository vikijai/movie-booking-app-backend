const {
  userSigninValidationSchema,
  userSignupValidationSchema,
} = require('../lib/validators/auth.validators')
const AuthService = require('../services/auth.service')
const AppError = require('../errors/app.error')

async function handleSignup(req, res) {
  const validationResult = await userSignupValidationSchema.safeParseAsync(
    req.body
  )

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error })
  }

  const { firstname, lastname, email, password } = validationResult.data
  try {
    const token = await AuthService.signupWithEmailAndPassword({
      firstname,
      lastname,
      email,
      password,
    })
    return res.status(201).json({ status: 'success', data: token })
  } catch (err) {
    if (err instanceof AppError)
      return res.status(err.code).json({ status: 'error', error: err.message })

    console.log(`Error`, err)
    return res
      .status(500)
      .json({ status: 'error', error: 'Internal Server Error' })
  }
}

async function handleSignin(req, res) {
  const validationResult = await userSigninValidationSchema.safeParseAsync(
    req.body
  )
  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error })
  }
  const { email, password } = validationResult.data

  try {
    const token = await AuthService.signinWithEmailAndPassword({
      email,
      password,
    })
    return res.status(201).json({ status: 'success', data: { token } })
  } catch (err) {
    if (err instanceof AppError)
      return res.status(err.code).json({ status: 'error', error: err.message })

    console.log(`Error`, err)
    return res
      .status(500)
      .json({ status: 'error', error: 'Internal Server Error' })
  }
}

// req --> auth.middleware.js --> check the token is valid or not and set the req.user as user --> then check the below fn 
async function handleMe(req, res) {
  if (!req.user) return res.json({ isLoggedIn: false })
  return res.json({ isLoggedIn: true, data: { user: req.user } })
}

module.exports = {
  handleSignup,
  handleSignin,
  handleMe
}
