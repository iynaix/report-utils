import React, { useState } from "react"

const compact = arr => arr.filter(x => !!x)

const divmod = (n, d) => [(n / d) | 0, n % d]

const formatSeconds = s => {
    const [totalMins, secs] = divmod(s | 0, 60)
    const [totalHours, mins] = divmod(totalMins, 60)
    const [days, hours] = divmod(totalHours, 24)

    return compact([
        days ? `${days} days` : undefined,
        hours ? `${hours} hours` : undefined,
        mins ? `${mins} minutes` : undefined,
        secs ? `${secs} seconds` : undefined,
    ]).join(" ")
}

const SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3]

const TimeOutput = ({ output }) => {
    if (!output) {
        return null
    }

    const [currentSpeed, setSpeed] = useState(1)
    const timeString = formatSeconds(output / currentSpeed)

    return (
        <div>
            <div style={{ display: "flex" }}>
                {SPEEDS.map(speed => (
                    <button
                        key={speed}
                        className={`button ${speed === currentSpeed ? "is-link" : "is-primary"}`}
                        style={{ flex: 1, marginLeft: 8, marginRight: 8 }}
                        onClick={e => {
                            e.preventDefault()
                            setSpeed(speed)
                        }}
                    >
                        {speed}x
                    </button>
                ))}
            </div>

            <div className="section">
                <div className="box">{timeString}</div>
            </div>
        </div>
    )
}

export default {
    title: "Time Sum",
    regex: /(-?)((\d+):)?(\d+):(\d{2})/,
    processInput: parsedRegex => {
        let totalSecs = 0

        parsedRegex.forEach(([neg, , hr, min, sec]) => {
            const total = (hr | 0) * 60 * 60 + (min | 0) * 60 + (sec | 0)
            totalSecs += total * (neg === "-" ? -1 : 1)
        })
        return totalSecs
    },
    output: TimeOutput,
}
