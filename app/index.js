const express = require('express')

//import routes
const adminRoutes = require('../routes/admin.routes')
const userRoutes = require('../routes/user.routes')
const authRoutes = require('../routes/auth.routes')
const { authenticationMiddleware } = require('../middlewares/auth.middleware')

const app = express()

//middleware
app.use(express.json())
app.use(authenticationMiddleware)

app.get('/', (req, res) => {
  res.json({ status: 'success', message: 'server is up and running' })
})

app.use('/admin', adminRoutes)
app.use('/auth', authRoutes)
app.use('/user', userRoutes)

module.exports = app
