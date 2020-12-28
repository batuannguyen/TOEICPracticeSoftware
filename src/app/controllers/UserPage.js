class UserPage{
    get(req, res){
        if (req.isAuthenticated()){
            res.render("page")
        }
        else{
            res.redirect("http://localhost:4000/login")
        }
    }
}

module.exports = new UserPage()