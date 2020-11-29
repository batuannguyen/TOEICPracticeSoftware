const express = require("express")
const morgan = require("morgan")
const handlebars = require("express-handlebars")
const path = require("path")
const route = require('./resource/routes/index')
const bodyParser = require("body-parser")
var app = express();
app.use(bodyParser.urlencoded({"extended":true}))
app.use(morgan("combined"))
const port = 4000;
app.use(express.static(path.join(__dirname, "public")))
app.engine("handlebars", handlebars())
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "resource/views"))
route(app)
app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`)
})

