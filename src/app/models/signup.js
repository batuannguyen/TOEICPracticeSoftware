const query = require("./index")

async function signup(email, password, username, company, phone){
    var text = "INSERT INTO USER_INFO(EMAIL, USER_PASSWORD, FULLNAME, COMPANY, PHONE) VALUES ($1, $2, $3, $4, $5)"
    var values = [email, password, username, company, phone]
    await query(text, values)
}

async function checkDuplicateEmail(email){
    var text = "SELECT EMAIL FROM USER_INFO"
    var email_list = await query(text, [])
    console.log(email_list)
    if (email_list.findIndex(email_item => email_item == email) >= 0){
        return true
    }
    return false
}

module.exports = {signup, checkDuplicateEmail}