import React from "react"
import ResponsiveAppBar from "./components/ResponsiveAppBar"

const pages = ["AddPerson", "About","Chat"]
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

export const App = () => {

    return (
        <>
            <ResponsiveAppBar pages={pages} settings={settings} />
        </>
    )
}

