const { v4 } = require('uuid')
const userList = []
const socketEvent = require('../socketEnum')


function AddNewUser(userID, socket) {
    console.log(userID)
    userList.push(userID)
    boardCastMessage(socket, `USER CONNECTED : ${userID}`)
}

function boardCastMessage(socket, message) {
    const boardCastMessage = {
        id: v4(),
        content: message,
        boardCast: true
    }
    socket.broadcast.emit(socketEvent.BOARDCAST_MESSAGE, boardCastMessage)
}


module.exports = function socketHandler(socket) {

    socket.on(socketEvent.NEW_USER, (userID) => AddNewUser(userID, socket))

    socket.on(socketEvent.SEND_MESSAGE, (message) => socket.broadcast.emit(socketEvent.MESSAGE, message))


    socket.on('disconnect', () => {
        boardCastMessage(socket, `USER LEFT!!`)
        console.log('user disconnected')
    })
}