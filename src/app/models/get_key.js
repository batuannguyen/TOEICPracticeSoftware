const queryData = require("../models/index")
const path = require("path")
const read = require("./read_file")

async function get_key_data(numPart, numTest, req){
    var text = "SELECT * FROM question WHERE test_id = (SELECT test_id FROM test WHERE part = $1 AND number_test = $2) ORDER BY number_question"
    var values = [numPart, numTest]
    var question_list = await queryData(text, values)
    var question_data = []
    var num_page = 0
    for (var question of question_list){
        var q = {}
        q["number_question"] = question["number_question"]
        q["question_content"] = question["question_content"]
        q["correct"] = question["correct"]
        q["answer"] = []
        q["answer"].push({"content":question.a_choice, "number_question": question.number_question, "L":"A"})
        q["answer"].push({"content":question.b_choice, "number_question": question.number_question, "L":"B"})
        q["answer"].push({"content":question.c_choice, "number_question": question.number_question, "L":"C"})
        q["choice"] = req.body[question.number_question.toString()]
        if (numPart != 2) {
            q["answer"].push({"content":question.d_choice, "number_question": question.number_question, "L":"D"})
        }

        if (numPart <= 4){
            if (question.audio != null){
                num_page ++
                question_data.push({"image": question.image, "audio": question.audio, "question_list": [], "num_page": num_page})
                if (question.paragraph != null){
                    var path_file = path.join(__dirname,"..", "..", "public", "paragraph", question.paragraph)
                    var paragraph = await read(path_file)
                    var line = paragraph.split("\n")
                    question_data[num_page - 1]["paragraph"] = line.join("<br>")
                }
            }
            q["num_page"] = num_page
            question_data[num_page - 1].question_list.push(q)
        }
        else if (numPart >= 6){
            if (question.paragraph != null){
                num_page ++
                var path_file = path.join(__dirname,"..", "..", "public", "paragraph", question.paragraph)
                var paragraph = await read(path_file)
                var line = paragraph.split("\n")
                question_data.push({"image": question.image, "paragraph": line.join("<br>"), "question_list": [], "num_page": num_page})
            }
            q["num_page"] = num_page
            question_data[num_page - 1].question_list.push(q)
        }
        else{
            num_page ++
            q["num_page"] = num_page
            question_data.push({"question_list":[q], "num_page": num_page})
        }
    }
    return question_data
}

module.exports = get_key_data