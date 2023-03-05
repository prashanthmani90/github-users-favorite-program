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
                console.log(response)
                expect(response.type).toBe("application/json")
                expect(response.body.message).toBe("Validation failed")
                //const root = parse(response.text)
                //const message = root.querySelector("#error-message")?.textContent?.trim()
                //expect(message).toBe("Validation failed")

                // expect(response.body.message).toBe("Validation failed")
            })
    })
})

describe("Test the root post path with no username validation", () => {
    test("It should response the POST method with no username validation", async () => {
        await supertest(app)
            .post("/getFavoriteLanguage")
            .send({
                username: "" // username is required in validation...
            })
            .expect(400)
            .then((response) => {
                expect(response.type).toBe("text/html")
                const root = parse(response.text)
                const message = root.querySelector("#error-message")?.textContent?.trim()
                expect(message).toBe("Not Found")
            })
    })
})
