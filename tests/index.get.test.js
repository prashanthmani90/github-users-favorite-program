const app = require("../index")
const pug = require("pug")
const supertest = require("supertest")
const { default: parse } = require("node-html-parser")

describe("HomePage", () => {
    it("should render an HTML form", async () => {
        const response = await supertest(app).get("/")
        expect(response.status).toBe(200) // Check the status to be 200
        expect(response.type).toBe("text/html")
        const root = parse(response.text)
        const form = root.querySelector("form")
        const input = root.querySelector('input[type="text"][name="username"]')
        const button = root.querySelector('button[type="submit"]')
        expect(form).toBeTruthy() // Validate form
        expect(input).toBeTruthy() // Validate form contains an input
        expect(button).toBeTruthy() // validate form have a submit button
        const template = pug.compileFile("./views/form.pug")
        const renderedHtml = template({
            title: `Find Github User's Dominatin Programming Language`
        })
        expect(renderedHtml).toMatchSnapshot()
    })
})
