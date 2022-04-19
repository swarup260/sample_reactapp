import { useEffect, useState, useRef } from "react"
import { Container, FormGroup, Button, TextField, Divider } from '@mui/material';
import statePersistent from "../util/statePersistent";
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import List from '@mui/material/List'
import { v4 as uuidv4 } from 'uuid';
import io from 'socket.io-client';

export default function Chat() {

    const messagesEndRef = useRef(null);

    const CHAT_LIST = "chat_list"
    const USERID = "userid"

    const initState = { content: '', time: '' }
    const [message, setMessage] = useState(initState)
    const [userID, setUserID] = useState(statePersistent.getSession(USERID) ? statePersistent.getSession(USERID).id : "")
    const [messageList, setMessageList] = useState(statePersistent.getSession(CHAT_LIST) || [])
    const [socket, setSocket] = useState(null);

    const messageHandler = (e) => {
        setMessage({
            id: uuidv4(),
            content: e.target.value,
            time: new Date().toString(),
            user: userID
        })
    }

    const sendMessageHandler = (e) => {
        e.preventDefault()
        if (message.content == '') {
            return
        }
        const newChatList = [...messageList, message]
        setMessageList(newChatList)
        statePersistent.setSession(CHAT_LIST, newChatList)
        socket.emit("SEND_MESSAGE", message)
        setMessage(initState)
    }

    useEffect(() => {
        const newSocket = io(`http://${window.location.hostname}:5500`);
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);


    useEffect(() => {
        if (socket) {
            const id = uuidv4()
            setUserID(id)
            statePersistent.setSession(USERID, {id})
            socket.on("connection", () => socket.emit("NEW_USER", id))
        }
    }, [socket])


    useEffect(() => {
        messagesEndRef.current.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        })

    }, [messageList])


    return (
        <Container fixed className="m-5">
            <Container style={{ height: "400px", display: "block", overflow: "scroll" }} ref={messagesEndRef}>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {messageList.map(message => {
                        const { id, content, time, user } = message
                        const isCurrentSame = user == userID
                        let textAlign = "left"
                        if (isCurrentSame) {
                            textAlign = "right"
                        }
                        if (message.BoardCast) {
                            textAlign = "center"
                        }
                        return (
                            <ListItem key={id} style={{ textAlign }} color="red">
                                <ListItemText primary={content} secondary={message.BoardCast ? "" : time} />
                            </ListItem>
                        )

                    })}
                </List>
            </Container>
            <Divider />
            <form onSubmit={sendMessageHandler}>
                <FormGroup className="m-4">
                    <TextField id="outlined-basic" label="message" variant="outlined" name="message" value={message.content} onChange={messageHandler} />
                </FormGroup>
                <FormGroup className="m-4">
                    <Button variant="contained" type="submit">Submit</Button>
                </FormGroup>
            </form>
        </Container>
    )
}
