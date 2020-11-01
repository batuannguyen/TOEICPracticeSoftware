const express = require("express")
const morgan = require("morgan")
const handlebars = require("express-handlebars")
const path = require("path")
const route = require('./resource/routes/index')
const {Client} = require('pg')
var app = express();
app.use(morgan("combined"))

const port = 4000;
app.use(express.static(path.join(__dirname, "public")))
app.engine("handlebars", handlebars())
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "resource/views"))

const client = new Client({
    user: "postgres",
    host:"localhost",
    database:"postgres",
    password:"krossnguyen2000",
    port: 3000
})
client.connect(function(err){
    if (err) throw err
    console.log("Connect successfully")
})
function select(err, res){
    if (err){
        console.log(err)
    }
    else{
        console.log(res.rows[0])
    }
}
// client.query("INSERT INTO student_list VALUES ('20180003', 'Vuong Dinh An', 20)")
//     .then(res => console.log(res))
//     .catch(err => console.log(err))

route(app)
app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`)
})