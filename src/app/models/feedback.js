const query = require("./index")

async function feedback(user_id, feedback_content){
    var text = "INSERT INTO FEEDBACK(USER_ID, FEEDBACK_CONTENT) VALUES ($1, $2)"
    var values = [user_id, feedback_content]
    await query(text, values)
}

async function get_feedback(){
    var text = `SELECT FEEDBACK.FEEDBACK_ID, USER_INFO.FULLNAME, FEEDBACK.FEEDBACK_CONTENT, FEEDBACK.RESPONSE_CONTENT
                FROM USER_INFO, FEEDBACK
                WHERE USER_INFO.USER_ID = FEEDBACK.USER_ID`
    var res = await query(text, [])
    return res
}

async function display(){
    var text = "SELECT * FROM FEEDBACK"
    var feedback = await query(text)
    return feedback
}

module.exports = {feedback, get_feedback, display}