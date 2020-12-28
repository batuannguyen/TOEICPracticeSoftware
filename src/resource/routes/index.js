const homeRoute = require('./home')
const loginRoute = require('./login')
const testRoute = require('./test')
const adjustQuestionRouter = require('./modify_question')
const addRoute = require('./add_test')
const signupRoute = require("./sign_up")
const pageRoute = require("./page")
const feedbackRoute = require("./feedback")
const authenticate = require("../../app/models/authenticate")
const replyfeedbackRoute = require("./replyfeedback")

function route(app){
    app.use("/login", loginRoute)
    authenticate(app)
    app.use("/", homeRoute)
    app.use("/test", testRoute)
    app.use("/manage_question/modify", adjustQuestionRouter)
    app.use("/add_test", addRoute)
    app.use("/signup", signupRoute)
    app.use("/page", pageRoute)
    app.use("/feedback", feedbackRoute)
    app.use("/reply", replyfeedbackRoute)
}

module.exports = route