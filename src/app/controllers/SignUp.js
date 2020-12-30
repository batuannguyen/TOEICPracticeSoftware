const {signup, checkDuplicateEmail} = require("../models/signup")

class Sign_Up{
    get(req, res){
        res.render("signup")

    }
    post(req, res){
        //Process with post method
        async function process(){
            console.log(req.body)
            var isDuplicate = await checkDuplicateEmail(req.body.email)
            if (isDuplicate){
                res.render("signup")
            }
            else{
                await signup(req.body.email, req.body.psw, req.body.user_name, "HUST", req.body.number_phone)
                res.redirect("http://localhost:4000/login")
            }
        }
        try{
            process()
        }
        catch(err){
            console.warn(err)
            res.send("Server error")
        }
    }
}

module.exports = new Sign_Up()