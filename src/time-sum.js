const divmod = (n, d) => ({ div: (n / d) | 0, rem: n % d })

export default {
    title: "Time Sum",
    regex: /((\d+):)?(\d+):(\d{2})/gm,
    processInput: parsedRegex => {
        let hrs = 0,
            mins = 0,
            secs = 0

        parsedRegex.forEach(([, hr, min, sec]) => {
            hrs += hr | 0
            mins += min | 0
            secs += sec | 0
        })

        let mindiv = divmod(secs, 60)
        mins += mindiv.div

        let hrdiv = divmod(mins, 60)
        hrs += hrdiv.div

        let daydiv = divmod(hrs, 24)

        return [
            daydiv.div ? `${daydiv.div} days` : undefined,
            daydiv.rem ? `${daydiv.rem} hours` : undefined,
            `${hrdiv.rem} minutes`,
            `${mindiv.rem} seconds`,
        ]
            .join(" ")
            .trim()
    },
}
