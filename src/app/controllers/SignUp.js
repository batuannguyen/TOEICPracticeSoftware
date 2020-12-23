class Sign_Up{
    get(req, res){
        res.render("signup")
    }
    post(req, res){
        //Process with post method
    }
}

module.exports = new Sign_Up()