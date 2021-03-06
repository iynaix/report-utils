import React from "react"

const parseRegex = (str, re) => {
    let ret = []
    str.split(/\r?\n/).forEach(line => {
        const m = re.exec(line)
        if (m) {
            // discard the entire match
            ret.push(m.slice(1))
        }
    })
    return ret
}

const BasicOutput = ({ output }) => {
    if (!output) {
        return null
    }

    return (
        <div className="section">
            <div className="box">{output}</div>
        </div>
    )
}

const App = ({
    title,
    processInput,
    regex,
    input,
    setInput,
    output: OutputComponent = BasicOutput,
}) => {
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

            <OutputComponent output={output} />
        </div>
    )
}

export default App
