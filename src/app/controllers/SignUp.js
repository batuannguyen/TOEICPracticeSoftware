class Sign_Up{
    get(req, res){
        res.render("signup")
    }
    post(req, res){
        //Process with post method
        console.log(req.body)
        res.redirect("http://localhost:4000/login")
    }
}

module.exports = new Sign_Up()