const get_key_data = require("../models/get_key")

class ModifyQuestion{
    get(req, res){
        async function process(){
            var slug_info = req.params.slug
            var info = slug_info.split("-")
            var numPart = parseInt(info[1], 10)
            var numTest = parseInt(info[3], 10)
            var question_data = await get_key_data(numPart, numTest, req)
            res.render("modify_question", {"data": question_data, "numPart": numPart, "numTest": numTest})
        }
        try{
            process()
        }
        catch(err){
            res.send("Server error")
        }

    }
    post(req, res){
        var slug_info = req.params.slug
        var info = slug_info.split("-")
        var numPart = parseInt(info[1], 10)
        var numTest = parseInt(info[3], 10)
        console.log(req.body)
        res.render("modify_question", {"numPart": numPart, "numTest": numTest})
    }
}

module.exports = new ModifyQuestion()