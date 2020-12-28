const express = require("express")
const handler = require("../../app/controllers/FeedBack")

var route = express.Router()
route.get("/", handler.get)
route.post("/", handler.post)

module.exports = route