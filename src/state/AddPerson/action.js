import { initialState } from "../AddPerson/AppContext";
import statePersistent from "../../util/statePersistent";
import actionEnum from "../actionEnum";

function updatePerson(state, payload) {
    const updatedState = {}
    const newPeople = [...state.people, payload];
    const resetPerson = initialState.person;
    /* reset person state */
    updatedState = { person: resetPerson, people: newPeople };
    statePersistent.set(updatedState);
    return updatedState;
}

function removePerson(state, payload) {
    const updatedState = {}
    const filteredPeople = state.people.filter(person => person.id !== payload);
    updatedState = { ...state, people: filteredPeople };
    statePersistent.set(updatedState);
    return updatedState;
}

function addPerson(state, payload) {
    const updatedState = {}
    const newPerson = { ...state.person, ...payload };
    updatedState = { ...state, person: newPerson };
    statePersistent.set(updatedState);
    return updatedState;
}


export default function reducer(state, action) {
    switch (action.type) {
        case actionEnum.ADD_PERSON:
            /* udpate person state */
            return addPerson(state, action.payload)
        case actionEnum.REMOVE_PERSON:
            /* remove selected person */
            return removePerson(state, action.payload)
        case actionEnum.UPDATE_PERSON:
            /* add person to people object */
            return updatePerson(state, action.payload)
        default:
            throw new Error("Undefined Action Type")
    }
}

