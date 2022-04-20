
import { v4 as uuid } from "uuid";
import socketEvents from "../../socketEvents";
import statePersistent from "../../util/statePersistent";
import actionEnum from "../actionEnum";
import { initialChatState } from "./ChatContext"

function messageHandler(state, payload) {
    const message = { content: payload, time: new Date().toDateString() }
    return { ...state, message }
}

function sendMessage(state) {
    const message = initialChatState.message
    /* set message id */
    state.message.id = uuid()
    state.message.user = state.userID
    /* updated message LIST */
    const messageList = [...state.messageList, state.message]
    state.socket.emit(socketEvents.SEND_MESSAGE,state.message)
    return { ...state, message, messageList }
}

function updateMessageList(state, payload) {
    const messageList = [...state.messageList, payload]
    console.log(messageList)
    return { ...state, messageList }
}

function setSocket(state, payload) {
    return { ...state, socket: payload }
}

function setUserID(state,payload){
    console.log({userID: payload})
    return { ...state, userID: payload }
}

export default function reducer(state, action) {
    switch (action.type) {
        case actionEnum.MESSAGE_HANDLER:
            return messageHandler(state, action.payload)
        case actionEnum.SEND_MESSAGE:
            return sendMessage(state)
        case actionEnum.UPDATE_MESSAGE_LIST:
            return updateMessageList(state, action.payload)
        case actionEnum.SET_SOCKET:
            return setSocket(state, action.payload)
        case actionEnum.SET_USER_ID:
            return setUserID(state, action.payload)
        default:
            throw new Error("Undefined Action Type")
    }
}