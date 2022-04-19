/* dependencies */
const Express = require('express')
const socket = require('socket.io')
const http = require('http')
const cros = require('cors')

const socketHandler  = require('./src/sockerHandler')

/* constant */
const PORT = process.env.PORT || 5500

/* initalize APP */
const app = Express()

/* setup middleware */
app.use(cros())

/* routes */
app.get('/', async (_, response) => response.json({ status: true, message: 'hello world' }))

const server = http.createServer(app)
const io = new socket.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
})

/* server */
io.on('connection', socketHandler)

server.listen(PORT, () => console.log(`SERVER RUNNING AT 127.0.0.1:${PORT}`))


