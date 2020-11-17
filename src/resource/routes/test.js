const handler = require("../../app/controllers/TestController")
const express = require("express")

var route = express.Router()
route.get("/:slug", handler.index)
route.post("/:slug", handler.postForm)

module.exports = route