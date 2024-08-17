const mongoose = require('mongoose')

function connectMongoDB(connectionUri) {
    return mongoose.connect(connectionUri)
}

module.exports = connectMongoDB
