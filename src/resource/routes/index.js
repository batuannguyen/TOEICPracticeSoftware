const homeRoute = require('./home')
const loginRoute = require('./login')
function route(app){
    app.use("/login", loginRoute)
    app.use("/", homeRoute)
}

module.exports = route