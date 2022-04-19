
/* inital state */

import React from "react"

export const initialChatState = {
    message: {
        content: '',
        time: ''
    },
    messageList: [],
    socket: null
}


export const ChatContext = React.createContext({ ...initialChatState })