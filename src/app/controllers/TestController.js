const get_test_data = require("../models/get_test")
const get_key_data = require("../models/get_key")

class TestController{

    index(req, res){
        async function process(){
            var slug_info = req.params.slug
            var info = slug_info.split("-")
            var numPart = parseInt(info[1], 10)
            var numTest = parseInt(info[3], 10)
            var question_data = await get_test_data(numPart, numTest)
            res.render("test", {"data": question_data, "numPart": numPart, "numTest": numTest})
        }
        try{
            process()
        }
        catch(err){
            res.send("Server error")
        }
    }

    postForm(req, res){
        async function process(){
            var slug_info = req.params.slug
            var info = slug_info.split("-")
            var numPart = parseInt(info[1], 10)
            var numTest = parseInt(info[3], 10)
            var question_data = await get_key_data(numPart, numTest, req)
            res.render("key", {"data": question_data, "numPart": numPart, "numTest": numTest})
        }
        try{
            process()
        }
        catch(err){
            res.send("Server error")
        }
    }
}
module.exports = new TestController()