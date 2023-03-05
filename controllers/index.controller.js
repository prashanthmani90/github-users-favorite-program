const https = require("https")
const { getPublicRepos } = require("../api")

const { successResponse } = require("../helpers/methods")

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.index = async (req, res) => {
    res.send(
        successResponse("Express JS API Boiler Plate working like a charm...", {
            data: "here comes you payload..."
        })
    )
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.indexPost = async (req, res) => {
    res.send(
        successResponse("Express JS API Boiler Plate post api working like a charm...", {
            data: "here comes you payload...",
            request: req.body
        })
    )
}

exports.getFavoriteProgammingLanguage = async (req, res) => {
    try {
        const { username } = req.body
        if (!username) {
            // To handle API Limit Reached
            return res.status(400).render("error.pug", {
                message: `Username is required. Please enter a username to find the favorite program`
            })
        }
        const repos = await getPublicRepos(username)
        const languages = {}

        if (!repos.length) {
            // To handle API Limit Reached
            return res.status(400).render("error.pug", {
                message: repos?.message || `User ${username}'s may not exist in Gihub or Does not own any public repos.`
            })
        }
        repos.forEach((repo) => {
            const language = repo.language

            if (language) {
                if (languages[language]) {
                    languages[language] += 1
                } else {
                    languages[language] = 1
                }
            }
        })

        let favoriteLanguage = ""
        let maxRepos = 0

        Object.entries(languages).forEach(([language, repos]) => {
            if (repos > maxRepos) {
                favoriteLanguage = language
                maxRepos = repos
            }
        })
        if (!favoriteLanguage) {
            return res.status(200).render("result.pug", {
                message: `User ${username}'s does not have any favorite programming language or have not any language added to theri repos.`
            })
        }
        res.status(200).render("result.pug", {
            message: `User ${username}'s favorite programming language is ${favoriteLanguage}.`
        })
    } catch (error) {
        console.log(error)
        res.status(500).render("error.pug", {
            message: error.message || `User ${username} not found.`
        })
    }
}

exports.HomePage = async (req, res) => {
    res.status(200)
    res.render("form.pug")
}
