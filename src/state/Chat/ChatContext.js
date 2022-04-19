
/* inital state */

import React from "react"

export const initialChatState = {
    userID: '',
    message: {
        content: '',
        time: ''
    },
    messageList: [],
    socket: null
}


export const ChatContext = React.createContext({ ...initialChatState })