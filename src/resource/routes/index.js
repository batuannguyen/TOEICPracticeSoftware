const homeRoute = require('./home')
const newsRoute = require('./news')
function route(app){
    app.get("/", homeRoute)
    app.get("/news", newsRoute)
}

module.exports = route