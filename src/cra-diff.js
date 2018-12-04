export default {
    title: "CRA Total Diff Calculator",
    regex: /\(([+-])(.*)(KB|B)\)/,
    processInput: parsedRegex => {
        let total = 0

        parsedRegex.forEach(([sign, amt, unit]) => {
            total += (sign === "-" ? -1 : 1) * parseFloat(amt) * (unit === "KB" ? 1000 : 1)
        })

        const diff = total / 1000

        return `Diff: ${diff > 0 ? "+" : ""} ${diff} KB`
    },
}
