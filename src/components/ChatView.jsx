import { Divider } from '@mui/material'
import { useContext, useEffect } from 'react'
import { ChatContext } from '../state/Chat/ChatContext'
import ChatBox from './ChatBox'
import ChatMessage from './ChatMessageList'
import socketEvents from "../socketEvents";
import actionEnum from '../state/actionEnum'
import { v4 as uuid } from 'uuid'

export default function ChatView() {

    const { socket,dispatch } = useContext(ChatContext)

    useEffect(() => {
        const userID = uuid()
        dispatch({type: actionEnum.SET_USER_ID,payload:userID})
        socket.emit(socketEvents.NEW_USER,userID)
    }, [socket])

    return (
        <>
            <ChatMessage />
            <Divider />
            <ChatBox />
        </>
    )
}