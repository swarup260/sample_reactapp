import { useEffect, useReducer, useState } from "react"
import { Container } from '@mui/material'
import io from 'socket.io-client'
import LinearProgress from '@mui/material/LinearProgress'
import ChatView from "../components/ChatView";
import { ChatContext, initialChatState } from "../state/Chat/ChatContext";
import reducer from "../state/Chat/action";
import actionEnum from "../state/actionEnum";

export default function Chat() {

    const [state, dispatch] = useReducer(reducer, initialChatState)
    const { socket } = state
    useEffect(() => {
        const newSocket = io(`http://${window.location.hostname}:5500`)
        dispatch({ type: actionEnum.SET_SOCKET, payload: newSocket })
        return () => newSocket.close()
    }, [])

    console.log({ state })
    return (
        <ChatContext.Provider value={{ ...state, dispatch }}>
            <Container fixed className="m-5">
                {socket ? <ChatView /> : <LinearProgress />}
            </Container>
        </ChatContext.Provider>
    )
}
