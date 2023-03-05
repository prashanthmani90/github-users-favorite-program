const https = require("https")

exports.getPublicRepos = async (username) => {
    return new Promise((resolve, reject) => {
        // Set the options for the API request
        const options = {
            hostname: "api.github.com",
            path: `/users/${username}/repos`,
            headers: {
                Authorization: `Bearer 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`,
                "User-Agent": "node.js"
            }
        }

        // Make the HTTPS GET request
        const req = https.get(options, (res) => {
            let body = ""
            res.on("data", (d) => {
                body += d
            })

            res.on("end", () => {
                // Parse the JSON response
                const repos = JSON.parse(body)

                resolve(repos)
            })
        })

        // Handle errors
        req.on("error", (error) => {
            reject(error)
        })

        // End the request
        req.end()
    })
}
