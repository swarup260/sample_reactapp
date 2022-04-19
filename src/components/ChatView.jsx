import { Divider } from '@mui/material'
import { useContext, useEffect } from 'react'
import { ChatContext } from '../state/Chat/ChatContext'
import ChatBox from './ChatBox'
import ChatMessage from './ChatMessageList'
import socketEvents from "../socketEvents";
import actionEnum from '../state/actionEnum'

export default function ChatView() {

    const { socket,dispatch } = useContext(ChatContext)

    useEffect(() => {
        socket.on(socketEvents.NEW_USER_CONNECTED,(userID) => dispatch({type: actionEnum.SET_USER_ID,payload:userID}))
    }, [socket])

    return (
        <>
            <ChatMessage />
            <Divider />
            <ChatBox />
        </>
    )
}