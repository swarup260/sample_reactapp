import { useContext } from "react"
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { ListItemButton } from '@mui/material'
import { AppContext } from "../state/AppContext"
import actionEnum from "../state/actionEnum"
import { Link } from "react-router-dom"

const PersonList = () => {
    const { dispatch, people } = useContext(AppContext)

    const removePerson = (id) => {
        dispatch({ type: actionEnum.REMOVE_PERSON, payload: id })
    }

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {people.map(person => {
                const { id, name, email } = person
                return (
                    <ListItem key={id}>
                        <Link to={`/Person/${id}`}>
                            <ListItemText primary={name} secondary={email} />
                            <ListItemButton variant="contained" onClick={() => removePerson(id)}>Remove</ListItemButton>
                        </Link>
                    </ListItem>
                )

            })}
        </List>
    )
}

export default PersonList