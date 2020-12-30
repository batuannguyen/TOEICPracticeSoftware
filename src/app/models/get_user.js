const query = require("./index")

async function get_user(user_id){
    var text = "SELECT FULLNAME, EMAIL, COMPANY, PHONE FROM USER_INFO WHERE USER_ID = $1"
    var values = [user_id]

    var user_info = await query(text, values)
    return user_info
}

async function update_user(user_id, user_name, company, phone){
    var text = "UPDATE USER_INFO SET FULLNAME = $1, COMPANY = $2, PHONE = $3 WHERE USER_ID = $4"
    var values = [user_name, company, phone, user_id]
    await query(text, values)
}

async function get_score(user_id){
    var text = `SELECT TEST.PART, TEST.NUMBER_TEST, TEST_RESULT.SCORE, TEST_RESULT.TEST_TIME
                FROM TEST, TEST_RESULT
                WHERE TEST_RESULT = $1 AND TEST.TEST_ID = TEST_RESULT.TEST_ID`
    var values = [user_id]
    var data = await query(text, values)
    console.log(data)
    return data
}

module.exports = {get_user, update_user, get_score}