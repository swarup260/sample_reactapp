const { v4 } = require('uuid')
const userList = []
const socketEvent = require('../socketEnum')


function AddNewUser(socket) {
    const userID = v4()

    userList.push(userID)

    socket.broadcast.emit(socketEvent.NEW_USER_CONNECTED, userID)
    boardCastMessage(socket, `USER CONNECTED : ${userID}`)
}

function boardCastMessage(socket, message) {
    const boardCastMessage = {
        id: v4(),
        content: message,
        boardCast: true
    }
    console.log(boardCastMessage)
    socket.broadcast.emit(socketEvent.BOARDCAST_MESSAGE, boardCastMessage)
}


module.exports = function socketHandler(socket) {

    AddNewUser(socket)

    socket.on(socketEvent.SEND_MESSAGE, (message) => socket.broadcast.emit(socketEvent.MESSAGE, message))


    socket.on('disconnect', () => {
        boardCastMessage(socket, `USER LEFT!!`)
        console.log('user disconnected')
    })
}