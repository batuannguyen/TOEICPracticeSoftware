class LoginControllers{
    index(req, res){
        res.render("login")
    }
}

module.exports = new LoginControllers()