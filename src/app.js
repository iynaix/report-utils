import React from "react"

const parseRegex = (str, re) => {
    let m,
        ret = []

    while ((m = re.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === re.lastIndex) {
            re.lastIndex++
        }

        ret.push(m.slice(1))
    }
    return ret
}

const App = ({ title, processInput, regex, input, setInput }) => {
    const output = input ? processInput(parseRegex(input, regex)) : undefined

    return (
        <div>
            <div className="section has-text-centered">
                <h3 className="title is-3">{title}</h3>

                <textarea
                    className="textarea"
                    cols={80}
                    rows={20}
                    value={input}
                    onChange={e => {
                        setInput(e.target.value)
                    }}
                />
            </div>

            <div className="section">{output && <div className="box">{output}</div>}</div>
        </div>
    )
}

export default App
