const {get_user, update_user} = require("../models/get_user")

class UpdateUserInfo{
    get(req, res){
        async function process(){
            var user_id = req.user.user_id
            var user_info = await get_user(user_id)
            var data = user_info[0]
            console.log(data)
            res.render("userinfo", {"data": data})
        }
        if (req.isAuthenticated()){
            try{
                process()
            }
            catch(err){
                console.log(err)
                res.send("Server error")
            }
        }
        else{
            res.redirect("http://localhost:4000/login")
        }
    }
    post(req, res){
        async function process(){
            // res.send("Update successfully")
            console.log(req.body)
            var user_id = req.user.user_id
            await update_user(user_id, req.body.user_name, req.body.company, req.body.phone_number)
            res.redirect("http://localhost:4000/page")
        }
        if (req.isAuthenticated()){
            try{
                process()
            }
            catch(err){
                console.log(err)
                res.send("Server error")
            }
        }
        else{
            res.redirect("http://localhost:4000/login")
        }
    }
}

module.exports = new UpdateUserInfo()