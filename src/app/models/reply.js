const query = require("./index")

async function update_reply(feedback_id, response){
    var text = "UPDATE FEEDBACK SET RESPONSE_CONTENT = $1 WHERE FEEDBACK_ID = $2"
    var values = [response, feedback_id]
    await query(text, values)
}

module.exports = update_reply