const get_test_data = require("../models/get_test")
const get_key_data = require("../models/get_key")
const count_score = require("../models/score")

class TestController{

    index(req, res){
        console.log(req)
        async function process(){
            var slug_info = req.params.slug
            var info = slug_info.split("-")
            var numPart = parseInt(info[1], 10)
            var numTest = parseInt(info[3], 10)
            var question_data = await get_test_data(numPart, numTest)
            res.render("test", {"data": question_data, "numPart": numPart, "numTest": numTest})
        }
        if (req.isAuthenticated()){
            try{
                process()
            }
            catch(err){
                res.send("Server error")
            }
        }
        else{
            res.redirect("http://localhost:4000/login")
        }
    }

    postForm(req, res){
        function encode(ch){
            switch(ch){
                case "A": return 1
                case "B": return 2
                case "C": return 3
                case "D": return 4
            }
        }
        async function process(){
            var slug_info = req.params.slug
            var info = slug_info.split("-")
            var numPart = parseInt(info[1], 10)
            var numTest = parseInt(info[3], 10)
            var question_data = await get_key_data(numPart, numTest, req)
            var score = 0
            for (var page of question_data){
                for (var question of page.question_list){
                    if (encode(question.choice) == question.correct){
                        score += 1;
                    }
                }
            }
            var user_id = parseInt(req.user.user_id, 10)
            await count_score(user_id, numPart, numTest, score)
            res.render("key", {"data": question_data, "numPart": numPart, "numTest": numTest})
        }
        if (req.isAuthenticated()){
            try{
                process()
            }
            catch(err){
                res.send("Server error")
            }
        }
        else{
            res.redirect("http://localhost:4000/login")
        }
    }
}
module.exports = new TestController()