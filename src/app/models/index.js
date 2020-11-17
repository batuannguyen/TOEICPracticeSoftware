const {Client} = require("pg")
var client = new Client({
    host: "localhost",
    database: "toeic_db",
    user: "postgres",
    password: "krossnguyen2000",
    port: 3000
})
client.connect(function(err){
    if (err) throw err
    console.log("Connect test successfully")
})
function queryData(text, values){
    return client.query(text, values)
                .then(function(resp){
                    return resp.rows
                })
                .catch(function(err){
                    console.log(err)
                })
}
module.exports = queryData




