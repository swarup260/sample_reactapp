import React, { useReducer } from "react"
import AddPerson from "../components/AddPerson"
import PersonList from "../components/PersonList"
import { Container } from '@mui/material'
import { AppContext, initialState } from "../state/AddPerson/AppContext"
import reducer from "../state/AddPerson/action"
import statePersistent from "../util/statePersistent"

export default function AddPersonView () {

    const [state, dispatch] = useReducer(reducer, statePersistent.get() || initialState)
    return (
        <AppContext.Provider value={{ ...state, dispatch }}>
            <Container fixed className="m-5">
                <AddPerson />
                <PersonList />
            </Container>
        </AppContext.Provider>
    )
}



