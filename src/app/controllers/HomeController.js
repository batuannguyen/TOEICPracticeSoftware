const client = require("../models/client")
const query = require("../models/home")
class HomeController{
    index(req, res){
        async function readData(){
            var text1 = "SELECT * FROM user_list"
            var user_data = await query(text1)
            var text2 = "SELECT * FROM players"
            var player_data = await query(text2)
            var data = {"user_data": user_data, "player_data": player_data}
            res.render("home", data)
            console.log(data)
            return data
        }
        try{
            var data = readData()
            console.log(data)
        }
        catch(err){
            console.log(err)
        }
    }
    postData(req, res){
        var info = req.body
        var text = "SELECT * FROM user_list WHERE username = $1 AND password = $2"
        var values = [info.username, info.password]
        async function checkData(){
            var data = await query(text, values)
            console.log(data)
            if (data == 0){
                res.render("home", {"status": "login failed"})
            }
            else{
                res.render("home", {"status": "login successfully"})
            }
        }
        try{
            checkData()
        }
        catch(err){
            console.log(err)
        }
        console.log(info)
    }
}

module.exports = new HomeController()