const http = require('http')
const expressApp = require('./app/index')
const connectMongoDB = require('./models')

const PORT = process.env.PORT ?? 8000

async function init() {
    try {
        await connectMongoDB(process.env.MONGODB_URI)
        console.log(`Mongo DB Connected successfully`)
        const server = http.createServer(expressApp)
        server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
    } catch (err) {
        console.log(`Error on starting a server${err}`)
        process.exit(1)
    }
}

init()
