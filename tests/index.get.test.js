const app = require("../index")
const pug = require("pug")
const supertest = require("supertest")
const { default: parse } = require("node-html-parser")

describe("HomePage", () => {
    it("should render an HTML form", async () => {
        const response = await supertest(app).get("/")
        expect(response.status).toBe(200)

        expect(response.type).toBe("text/html")
        const root = parse(response.text)
        const input = root.querySelector('input[type="text"][name="username"]')
        const form = root.querySelector("form")
        const button = root.querySelector("button")
        expect(form).toBeTruthy()
        expect(input).toBeTruthy()
        expect(button).toBeTruthy()
        expect(response).toMatchSnapshot()
    })
})
