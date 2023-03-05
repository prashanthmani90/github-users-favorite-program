const app = require("../index")
const supertest = require("supertest")
const { default: parse } = require("node-html-parser")

describe("Test the root post path with username fail validation", () => {
    test("It should response the POST method with username failed validation", async () => {
        await supertest(app)
            .post("/getFavoriteLanguage")
            .send({
                userame: "" // username is required in validation...
            })
            .expect(406)
            .then((response) => {
                expect(response.type).toBe("text/html")
                const root = parse(response.text)
                const message = root.querySelector("#error-message")?.textContent?.trim()
                expect(message).toBe("Invalid value")
            })
    })
})

describe("Test the root post path with no username validation", () => {
    test("It should response the POST method with no username validation", async () => {
        await supertest(app)
            .post("/getFavoriteLanguage")
            .send({
                username: "" // username should not be empty...
            })
            .expect(406)
            .then((response) => {
                expect(response.type).toBe("text/html")
                const root = parse(response.text)
                const message = root.querySelector("#error-message")?.textContent?.trim()
                expect(message).toBe(
                    "Username is required. Please enter a username to find the favorite program"
                )
            })
    })
})
