const express = require("express")
const handler = require("../../app/controllers/UserPage")
const updateHandler = require("../../app/controllers/UpdateUserInfo")

var route = express.Router()
route.get("/info", updateHandler.get)
route.post("/info", updateHandler.post)
route.get("/", handler.get)

module.exports = route