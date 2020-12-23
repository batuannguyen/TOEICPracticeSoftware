const handler = require("../../app/controllers/AddTest")
const express = require("express")

var route = express.Router()
route.get("/:slug", handler.get)
route.post("/:slug", handler.post)

module.exports = route