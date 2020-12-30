const get_test_list = require("../models/get_test_list")

class UserPage{
    get(req, res){
        async function process(){
            var test_list = await get_test_list()
            res.render("page", {"data": test_list})
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
}

module.exports = new UserPage()