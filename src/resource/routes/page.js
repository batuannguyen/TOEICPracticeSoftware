const express = require("express")
const handler = require("../../app/controllers/UserPage")

var route = express.Router()
route.get("/", handler.get)

module.exports = route