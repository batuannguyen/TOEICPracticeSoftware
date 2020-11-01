const handler = require("../app/controllers/HomeController")
const express = require('express')


var route = express.Router()
route.get("/", handler.index)

module.exports = route;
