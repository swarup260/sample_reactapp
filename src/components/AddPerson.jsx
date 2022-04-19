

import { FormGroup, Button, TextField } from '@mui/material';
import { useContext } from "react";
import { AppContext } from '../state/AddPerson/AppContext'
import actionEnum from '../state/actionEnum';

const AddPerson = () => {
    const { dispatch, person } = useContext(AppContext)

    const onChangeHandler = (e) => {
        const name = e.target.name
        const value = e.target.value
        dispatch({ type: actionEnum.ADD_PERSON, payload: { [name]: value } })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (person.name != "" && person.email != "") {
            const newPerson = { ...person, id: new Date().getTime().toString() }
            dispatch({ type: actionEnum.UPDATE_PERSON, payload: newPerson })
        }
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <FormGroup className="m-4">
                    <TextField id="outlined-basic" label="Name" variant="outlined" name="name" value={person.name} onChange={onChangeHandler} />
                </FormGroup>
                <FormGroup className="m-4">
                    <TextField id="outlined-basic" label="Email" variant="outlined" name="email" value={person.email} onChange={onChangeHandler} />
                </FormGroup>
                <FormGroup className="m-4">
                    <Button variant="contained" type="submit">Submit</Button>
                </FormGroup>
            </form>
        </>
    )

}

export default AddPerson