const {display} = require("../models/feedback")
const update_reply = require("../models/reply")

class ReplyFeedback{
    get(req, res){
        async function process(){
            var feedback = await display()
            console.log(feedback)
            var non_reply = []
            for (var item of feedback){
                if (!item.response_content){
                    non_reply.push(item)
                }
            }
            if (non_reply.length){
                res.render("replyfeedback", {"data": non_reply})
            }
            else{
                res.send("No feedback is available!")
            }
        }

        if (req.isAuthenticated() && req.user.user_id == 1){
            try{
                process()
            }
            catch(err){
                console.warn(err)
            }
        }

        else{
            res.sendStatus(404)
        }
    }

    post(req, res){
        async function process(){
            console.log(req.body)
            var feedback = req.body
            for (var key in feedback){
                var feedback_id = parseInt(key.split("-")[2], 10)
                await update_reply(feedback_id, feedback[key])
            }
        }

        if (req.isAuthenticated() && req.user.user_id == 1){
            try{
                process()
            }
            catch(err){
                console.log(err)
            }
        }
        else{
            res.sendStatus(404)
        }
    }
}

module.exports = new ReplyFeedback()