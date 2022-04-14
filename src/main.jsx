
import ReactDom from "react-dom"
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AddPersonView from "./views/AddPerson.view"
import About from "./views/About.view"
import Home from "./views/Home.view"
import Person from "./views/Person.view"
import { App } from "./App"
import { Container } from '@mui/material'

ReactDom.render(
    <BrowserRouter>
        <App />
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/AddPerson" element={<AddPersonView />}></Route>
            <Route path="/About" element={<About />}>AddPerson</Route>
            <Route path="/Person/:id" element={<Person />}>Person</Route>
            <Route
                path="*"
                element={
                    <Container fixed className="m-5">
                        <p>There's nothing here!</p>
                    </Container>
                }
            />
    </Routes>
    </BrowserRouter >
    , document.querySelector('#root'))