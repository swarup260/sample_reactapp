import React from "react";

export const initialState = {
    person: {
        name: '',
        email: ''
    },
    people: []
}

export const AppContext = React.createContext({...initialState})