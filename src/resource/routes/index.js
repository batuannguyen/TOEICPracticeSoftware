const homeRoute = require('./home')
const loginRoute = require('./login')
const testRoute = require('./test')
const adjustQuestionRouter = require('./modify_question')
const addRoute = require('./add_test')

function route(app){
    app.use("/login", loginRoute)
    app.use("/", homeRoute)
    app.use("/test", testRoute)
    app.use("/manage_question/modify", adjustQuestionRouter)
    app.use("/add_test", addRoute)
}

module.exports = route