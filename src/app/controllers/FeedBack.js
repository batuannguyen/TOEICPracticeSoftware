const {feedback, get_feedback} = require("../models/feedback")

class FeedBack{
    get(req, res){
        async function process(){
            var feedback_list = await get_feedback()
            console.log(feedback_list)
            res.render("feedback", {"data": feedback_list})
        }
        if (req.isAuthenticated()){
            try{
                process()
            }
            catch(err){
                console.warn(err)
            }
        }
        else{
            res.redirect("http://localhost:4000/login")
        }
    }

    post(req, res){
        async function process(){
            // res.send("Feedback successfully")
            console.log(req.body)
            var user_id = req.user.user_id
            var content = req.body["feedback"]
            feedback(user_id, content)
            res.redirect("http://localhost:4000/page")
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
            res.redirect("http://localhost:4000/login")
        }
        
    }
}

module.exports = new FeedBack()