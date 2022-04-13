import React from "react";
import { AddPersonView } from "./views/AddPerson.view";
import { Routes, Route } from "react-router-dom";

export const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<AddPersonView />}>HOME</Route>
                <Route path="/AddPersonView" element={<AddPersonView />}>AddPerson</Route>
            </Routes>
        </>
    )
}

