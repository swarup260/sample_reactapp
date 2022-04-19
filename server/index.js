/* dependencies */
const Express = require('express')
const socket = require('socket.io')
const http = require('http')
const cros = require('cors')
const { v4 } = require('uuid')

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
io.on('connection', (socket) => {

    socket.on("USER_ADD", (val) => {
        const boardCastMessage = {
            id: v4(),
            content: `USER CONNECTED ${val}`,
            boardCast: true
        }
        console.log(boardCastMessage)
        socket.broadcast.emit("BROADCAST", boardCastMessage)
    })


    socket.on("connection", (val) => {
    })
    socket.on("SEND_MESSAGE", (message) => socket.broadcast.emit("MESSAGE", message))


    socket.on('disconnect', () => {
        console.log('user disconnected')
    })

})

server.listen(PORT, () => console.log(`SERVER RUNNING AT 127.0.0.1:${PORT}`))