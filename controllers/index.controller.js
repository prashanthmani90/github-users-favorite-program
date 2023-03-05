
const { default: axios } = require("axios")
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
    console.log(req.body)
    const { username } = req.body
    const reposUrl = `https://api.github.com/users/${username}/repos`
    // https://api.github.com/users/samraj/repos
    try {
        const { data: repos } = await axios.get(reposUrl)
        const languages = {}

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
            res.render("result", {
                message: `User ${username}'s does not have any favorite programming language or have not any language added to theri repos.`
            })
        }
        res.render("result", {
            message: `User ${username}'s favorite programming language is ${favoriteLanguage}.`
        })
    } catch (error) {
        console.log(error)
        res.render("result", {
            message: `User ${username} not found.`
        })
    }
}

exports.HomePage = async (req, res) => {
    res.render("form")
}
