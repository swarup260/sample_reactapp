import { initialState } from "./AppContext";
import statePersistent from "../util/statePersistent";
export default function reducer(state, action) {
    let updatedState = {}
    switch (action.type) {
        case 'ADD_PERSON':
            /* udpate person state */
            const newPerson = { ...state.person, ...action.payload }
            updatedState = { ...state, person: newPerson }
            statePersistent.set(updatedState)
            return updatedState

        case 'REMOVE_PERSON':
            /* remove selected person */
            const filteredPeople = state.people.filter(person => person.id !== action.payload)
            updatedState = { ...state, people: filteredPeople }
            statePersistent.set(updatedState)
            return updatedState

        case 'UPDATE_PERSON':
            /* add person to people object */
            const newPeople = [...state.people, action.payload]
            const resetPerson = initialState.person
            /* reset person state */
            updatedState = { person: resetPerson, people: newPeople }
            statePersistent.set(updatedState)
            return updatedState

        default:
            throw new Error("Undefined Action Type")
    }
}