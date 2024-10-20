const express = require('express')
const cors = require('cors')

//import routes
const adminRoutes = require('../routes/admin.routes')
const userRoutes = require('../routes/user.routes')
const authRoutes = require('../routes/auth.routes')
const publicRoutes = require('../routes/public.routes')
const bookingRoutes = require('../routes/booking.routes')
const { authenticationMiddleware } = require('../middlewares/auth.middleware')

const app = express()

//middleware
app.use(express.json())
app.use(cors())
app.use(authenticationMiddleware)

app.get('/', (req, res) => {
  res.json({ status: 'success', message: 'server is up and running' })
})

app.use('/admin', adminRoutes)
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/api', publicRoutes)
app.use('/booking', bookingRoutes)

module.exports = app
