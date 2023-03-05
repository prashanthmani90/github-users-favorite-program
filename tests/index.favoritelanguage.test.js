const app = require("../index")
const supertest = require("supertest")

const { parse } = require("node-html-parser")

// describe("Find Favorite Programming Language", () => {
//     test("It should response the getFavoriteProgramming Language", async () => {
//         await supertest(app)
//             .post("/getFavoriteLanguage")
//             .send({
//                 username: "prashanthmani90"
//             })
//             // .expect(200)
//             .then((response) => {
//                 console.log(response)
//                 expect(response.body.status).toBe(true)
//             })
//             .catch((error) => {
//                 console.log(error)
//             })
//     })
// })

describe("getFavoriteProgammingLanguage", () => {
    it("returns the favorite programming language for a valid username", async () => {
        const username = "prashanthmani90"
        const response = await supertest(app).post("/getFavoriteLanguage").send({ username })
        expect(response.status).toBe(200)
        expect(response.type).toBe("text/html")
        const root = parse(response.text)
        const message = root.querySelector("#result-message")?.textContent.trim()
        expect(message).toBe("User prashanthmani90's favorite programming language is JavaScript.")
    })

    it("returns an error message for an invalid username", async () => {
        const username = "invalidusername"
        const response = await supertest(app).post("/getFavoriteLanguage").send({ username })
        expect(response.status).toBe(400)
        expect(response.type).toBe("text/html")
        const root = parse(response.text)
        const message = root.querySelector("#error-message")?.textContent.trim()
        expect(message).toBe(`User ${username}'s may not exist in Gihub or Does not own any public repos.`)
    })
})
