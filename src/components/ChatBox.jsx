import { useContext } from "react"
import { FormGroup, Button, TextField } from '@mui/material'
import actionEnum from "../state/actionEnum";
import { ChatContext } from "../state/Chat/ChatContext";

export default function ChatBox() {

    const { message, dispatch } = useContext(ChatContext)

    const submitHandler = (e) => {
        e.preventDefault()
        if (message.content == '') {
            return
        }
        dispatch({ type: actionEnum.SEND_MESSAGE })
    }

    const inputTextHandler = (e) => {
        dispatch({ type: actionEnum.MESSAGE_HANDLER, payload: e.target.value })
    }

    return (
        <form onSubmit={submitHandler}>
            <FormGroup className="m-4">
                <TextField id="outlined-basic" label="message" variant="outlined" name="message" value={message.content} onChange={inputTextHandler} />
            </FormGroup>
            <FormGroup className="m-4">
                <Button variant="contained" type="submit">Submit</Button>
            </FormGroup>
        </form>
    )
}