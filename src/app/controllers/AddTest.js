class AddQuestion{
    get(req, res){
        res.send("Hello")
    }
}
module.exports = new AddQuestion()