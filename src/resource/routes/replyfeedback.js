const handler = require("../../app/controllers/FeedBack")
const express = require("express")

var route = express.Router()
route.get("/", handler.get)
route.post("/", handler.post)

module.exports = route