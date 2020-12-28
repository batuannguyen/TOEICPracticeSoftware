const query = require("./index")

async function feedback(user_id, feedback_content){
    var text = "INSERT INTO FEEDBACK(USER_ID, FEEDBACK_CONTENT) VALUES ($1, $2)"
    var values = [user_id, feedback_content]
    await query(text, values)
}

module.exports = feedback