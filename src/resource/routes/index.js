const homeRoute = require('./home')
const loginRoute = require('./login')
const testRoute = require('./test')
function route(app){
    app.use("/login", loginRoute)
    app.use("/", homeRoute)
    app.use("/test", testRoute)
}

module.exports = route