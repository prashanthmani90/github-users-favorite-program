const app = require("./index")
const port = process.env.PORT || 4000
const errorMiddleware = require("./middlewares/error.middleware")

const bodyParser = require("body-parser")
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }))


console.log(`Node environment: ${process.env.NODE_ENV}`)

app.set("view engine", "pug")
app.set('views', './views');


app.listen(port, () => {
    console.log(`Example app listening at port http://localhost:${port}`)
})

// Error Handler Middleware
app.use(errorMiddleware)
