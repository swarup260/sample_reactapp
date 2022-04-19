import { Divider } from '@mui/material'
import ChatBox from './ChatBox'
import ChatMessage from './ChatMessageList'

export default function ChatView() {
    return (
        <>
            <ChatMessage />
            <Divider />
            <ChatBox />
        </>
    )
}