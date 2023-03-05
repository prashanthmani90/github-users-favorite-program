const app = require("../index")
const supertest = require("supertest")

const pug = require("pug")

describe("my Jade template", () => {
    it("renders correctly", () => {
        const template = pug.compileFile("form.jade")
        const renderedHtml = template({
            title: `Find Github User's Dominatin Programming Language`,
        })
        expect(renderedHtml).toMatchSnapshot()
    })
})

describe("Find Favorite Programming Language", () => {
    test("It should response the getFavoriteProgramming Language", async () => {
        await supertest(app)
            .post("/getFavoriteLanguage")
            .send({
                username: "prashanthmani90"
            })
            .expect(200)
            .then((response) => {
                expect(response.body.status).toBe(true)
            })
    })
})
