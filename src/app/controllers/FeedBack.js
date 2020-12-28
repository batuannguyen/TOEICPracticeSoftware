const feedback = require("../models/feedback")

class FeedBack{
    get(req, res){
        if (req.isAuthenticated()){
            res.render("feedback")
        }
        else{
            res.redirect("http://localhost:4000/login")
        }
    }

    post(req, res){
        async function process(){
            res.send("Feedback successfully")
            console.log(req.body)
            var user_id = req.user.user_id
            var content = req.body["feedback"]
            feedback(user_id, content)
        }

        if (req.isAuthenticated()){
            try{
                process()
            }
            catch(err){
                console.log(err)
            }
        }
        else{
            // res.send("You must login to feedback")
            res.redirect("http://localhost:4000/login")
        }
        
    }
}

module.exports = new FeedBack()