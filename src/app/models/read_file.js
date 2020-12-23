const fs = require("fs")

module.exports = async function read(path){
    var promise = new Promise((resolve,reject) =>{
        fs.readFile(path, function(err, data){
            if (err) reject("error")
            else resolve(data.toString())
        })
    })
    promise.then((resp) => resp)
            .catch((err) => console.warn(err))
    return promise
}