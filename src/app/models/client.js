const {Client} = require("pg")
var client = new Client({
    host:"localhost",
    database:"user",
    user:"postgres",
    password:"krossnguyen2000",
    port: 3000
})
client.connect(function(err){
    if (err) throw err
    console.log("Connect successfully")
})
module.exports = client