const query = require("../models/index")
class HomeController{
    index(req, res){
        res.render("home")
    }
    postData(req, res){
        var info = req.body
        var text = "SELECT * FROM user_list WHERE username = $1 AND password = $2"
        var values = [info.username, info.password]
        async function checkData(){
            var data = await query(text, values)
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
    }
}
module.exports = new HomeController()