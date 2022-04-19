import { useContext, useRef,useEffect } from "react"
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { Container } from '@mui/material'
import { ChatContext } from "../state/Chat/ChatContext";

export default function ChatMessage() {

    const { messageList } = useContext(ChatContext)

    const messagesEndRef = useRef(null)

    useEffect(() => {
        messagesEndRef.current.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        })

    }, [messageList])

    const setStyle = (isCurrentSame, message) => {
        let bgColor = 'bg-zinc-600'
        if (isCurrentSame) {
            bgColor = 'bg-zinc-300'
        }
        if (message.BoardCast) {
            bgColor = "bg-stone-900"
        }
        return bgColor
    }


    return (
        <Container style={{ height: "400px", display: "block", overflow: "scroll" }} ref={messagesEndRef} >
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} className="list-item">
                {messageList.map(message => {
                    const { id, content, time, user } = message
                    const isCurrentSame = user == userID
                    let bgColor = setStyle(isCurrentSame, message)
                    return (
                        <ListItem key={id} className={`${bgColor} m-2`}>
                            <ListItemText primary={content} secondary={`${message.boardCast ? "" : time} ${!isCurrentSame && user}`} />
                        </ListItem>
                    )
                })}
            </List>
        </Container>
    )
}