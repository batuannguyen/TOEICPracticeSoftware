const login = require("../models/login")
class LoginControllers{
    index(req, res){
        res.render("login")
    }
}

module.exports = new LoginControllers()