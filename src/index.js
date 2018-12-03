import React, { useState } from "react"
import ReactDOM from "react-dom"

import cra from "./cra-diff"
import timeSum from "./time-sum"
import App from "./app"

const APPS = { CRA: cra, Time: timeSum }

const AppButton = ({ app, targetApp, setApp, setInput, children }) => (
    <button
        className={`button ${app === targetApp ? "is-link" : "is-primary"}`}
        style={{ flex: 1, marginLeft: 8, marginRight: 8 }}
        onClick={e => {
            e.preventDefault()
            if (app !== targetApp) {
                setApp(targetApp)
                setInput("")
            }
        }}
    >
        {children}
    </button>
)

const AppContainer = () => {
    const [app, setApp] = useState("CRA")
    const [input, setInput] = useState("")

    const btnProps = { app, setApp, setInput }

    return (
        <div className="container">
            <div className="section" style={{ display: "flex" }}>
                <AppButton {...btnProps} targetApp="CRA">
                    CRA Diff
                </AppButton>
                <AppButton {...btnProps} targetApp="Time">
                    Time Sum
                </AppButton>
            </div>

            <App input={input} setInput={setInput} {...APPS[app] || APPS["CRA"]} />
        </div>
    )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<AppContainer />, rootElement)
