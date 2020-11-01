class HomeController{
    index(req, res){
        res.render("home");
        // console.log(res)
        // var choice = window.document.getElementsByClassName("inp_data")
        // console.log(document)
        // var h1 = document.querySelector("h1") 
        // for (var i = 0; i < choice.length; i++){
        //     if (choice[i].checked === true){
        //         h1.style.color = choice[i].id
        //         break
        //     }
        // }
        // console.log(choice)
    }
}

module.exports = new HomeController