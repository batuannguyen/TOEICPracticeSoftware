const get_key_data = require("../models/get_key")
const modify = require("../models/modify_question")
class ModifyQuestion{
    get(req, res){
        async function process(){
            var slug_info = req.params.slug
            var info = slug_info.split("-")
            var numPart = parseInt(info[1], 10)
            var numTest = parseInt(info[3], 10)
            var question_data = await get_key_data(numPart, numTest, req)
            console.log(question_data)
            res.render("modify_question", {"data": question_data, "numPart": numPart, "numTest": numTest})
        }
        if (req.isAuthenticated() && req.user.user_id == 1){
            try{
                process()
            }
            catch(err){
                res.send("Server error")
            }
        }
        else{
            res.sendStatus(404)
        }
        
    }
    post(req, res){
        async function process(){
            var slug_info = req.params.slug
            var info = slug_info.split("-")
            var numPart = parseInt(info[1], 10)
            var numTest = parseInt(info[3], 10)
            console.log(req)
            await modify(req, numPart, numTest)
            res.render("modify_question", {"numPart": numPart, "numTest": numTest})
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

module.exports = new ModifyQuestion()