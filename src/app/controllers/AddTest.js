const path = require("path")
const add_data = require("../models/add_test")
class AddQuestion{
    get(req, res){
        var numPart = req.params.slug.split("-")[1]
        res.render("add_test", {"numPart": numPart})
    }
    post(req, res){
        async function process(){
            var numPart = req.params.slug.split("-")[1]
            res.render("add_test", {"numPart": numPart})
            var data = req.body
            console.log("data = ",data)
            console.log("files = ",req.files)
            var numQuestion = 1
            var separate = {}
            function Question(A, B, C, D, content, key){
                this.A = A
                this.B = B
                this.C = C
                this.D = D
                this.content = content
                this.key = key
            }
            while (data[`${numQuestion}-index`]){
                var numPage = data[`${numQuestion}-index`]  
                if (separate[`${numPage}`]){
                    separate[`${numPage}`].push(new Question(data[`${numQuestion}-A`], data[`${numQuestion}-B`], data[`${numQuestion}-C`],
                    data[`${numQuestion}-D`], data[`${numQuestion}-content`], data[`${numQuestion}-key`]))
                }
                else{
                    separate[`${numPage}`] = [new Question(data[`${numQuestion}-A`], data[`${numQuestion}-B`], data[`${numQuestion}-C`],
                    data[`${numQuestion}-D`], data[`${numQuestion}-content`], data[`${numQuestion}-key`])]
                }
                numQuestion += 1
            }
            for (var key in req.files){
                var classify = {"i":"img", "a":"audio", "p":"paragraph"}
                req.files[key].mv(path.join(__dirname, "..", "..", "public", classify[key[0]], req.files[key].name), function(err){
                    if (err){
                        console.warn(`Upload files failed with error is ${err}`)
                    }
                    else{
                        console.log("Upload files successfully!")
                    }
                })
            }
            await add_data(separate, numPart, req.files)
        }
        try{
            process();
        }
        catch(err){
            console.warn(err)
        }
    }
}
module.exports = new AddQuestion()