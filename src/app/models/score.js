const query = require("./index")

async function score(user_id, numPart, numTest, score){
    var test_id_obj = await query("SELECT TEST_ID FROM TEST WHERE PART = $1 AND NUMBER_TEST = $2", [numPart, numTest])
    var test_id = test_id_obj[0].test_id
    console.log(test_id)
    console.log(user_id)
    var text = "INSERT INTO TEST_RESULT(USER_ID, TEST_ID, SCORE, TEST_TIME) VALUES ($1, $2, $3, $4)"
    var values = [user_id, test_id, score, "NOW()"]
    await query(text, values)
}

module.exports = score