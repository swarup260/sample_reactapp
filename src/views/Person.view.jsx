import { useContext } from "react";
import { Container } from '@mui/material';
import { useParams } from "react-router-dom";
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import List from '@mui/material/List'
import statePersistent from "../util/statePersistent";

const Person = () => {
    let params = useParams();
    const { people } = statePersistent.get()
    let selectedPerson = {}
    people.forEach(person => {
        if (params.id == person.id) {
            selectedPerson = person
        }
    })

    return (
        <Container fixed className="m-5">
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItemText primary={selectedPerson.name} />
                <ListItemText primary={selectedPerson.id} secondary={selectedPerson.email} />
            </List>
        </Container>
    )
}

export default Person