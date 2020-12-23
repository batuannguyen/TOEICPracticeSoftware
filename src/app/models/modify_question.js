const query = require("./index")

function encode(key){
    switch (key){
        case "A": return 1
        case "B": return 2
        case "C": return 3
        case "D": return 4
    }
}
async function update_question(req, numPart, numTest){
    var test_id_obj = await query("SELECT test_id FROM test WHERE part = $1 AND number_test = $2", [numPart, numTest])
    var test_id = test_id_obj[0].test_id
    var data = req.body
    // var files = req.files
    var num_questions_obj = await query("SELECT COUNT(*) FROM QUESTION WHERE TEST_ID = $1", [test_id])
    var num_questions = parseInt(num_questions_obj[0].count, 10)
    for (var i = 1; i <= num_questions; i++){
        var text_query = "UPDATE QUESTION SET QUESTION_CONTENT = $1, A_CHOICE = $2, B_CHOICE = $3, C_CHOICE = $4, D_CHOICE = $5, CORRECT = $6 WHERE NUMBER_QUESTION = $7"
        var values = [data[`${i}-content`], data[`${i}-A`], data[`${i}-B`], data[`${i}-C`], data[`${i}-D`], encode(data[`${i}-key`]), i]
        await query(text_query, values)
    }
    console.log(num_questions)
}

module.exports = update_question