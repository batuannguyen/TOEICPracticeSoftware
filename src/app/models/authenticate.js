const {Client} = require("pg")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const session = require("express-session")
var client = new Client({
    host: "localhost",
    database: "toeic_db",
    user: "postgres",
    password: "krossnguyen2000",
    port: 3000
})
client.connect(function(err){
    if (err) throw err
    console.log("Start authentication ....")
})

var strategy = new LocalStrategy(function(username, password, done){
    client.query("SELECT * FROM USER_INFO WHERE EMAIL = $1 AND USER_PASSWORD = $2", [username, password])
        .then(function(resp) {
            if (resp.rows){
                done(null, resp.rows[0])
            }
            else{
                done(null, false)
            }
        })
        .catch(function(err){
            console.warn(err)
        })
})

function authenticate(app){
    app.use(session({
        secret: "mysecret"
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    passport.use(strategy)
    app.post("/login", passport.authenticate("local", {
        failureRedirect: "/login"
    }),function(req, res){
        res.redirect(`http://localhost:4000/page`)
    })

   
    passport.serializeUser(function(user, done){
        done(null, user.user_id)
    })

    passport.deserializeUser(function(user_id, done){
        client.query("SELECT * FROM USER_INFO WHERE USER_ID = $1", [user_id])
            .then(function(resp){
                if (resp.rows.length){
                    done(null, resp.rows[0])
                }
                else{
                    done(null, false)
                }
            })
            .catch(function(err){
                console.log(err)
            })
    })
}


module.exports = authenticate

