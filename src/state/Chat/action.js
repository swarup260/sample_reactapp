
import statePersistent from "../../util/statePersistent";
import actionEnum from "../actionEnum";
import { initialChatState } from "./ChatContext"

function messageHandler(state, payload) {
    const message = { content: payload, time: new Date().toDateString() }
    return { ...state, message }
}

function sendMessage(state) {
    const message = initialChatState.message
    const messageList = [...state.messageList, state.message]
    return { ...state, message, messageList }
}

function updateMessageList(state, payload) {

}

function setSocket(state, payload) {
    return { ...state, socket: payload }
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
        default:
            throw new Error("Undefined Action Type")
    }
}