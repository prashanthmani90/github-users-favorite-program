const https = require("https")

exports.getPublicRepos = async (username) => {
    return new Promise((resolve, reject) => {
        // Set the options for the API request
        const options = {
            hostname: "api.github.com",
            path: `/users/${username}/repos`,
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
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
