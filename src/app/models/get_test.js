const queryData = require("../models/index")
const path = require("path")
const read = require("./read_file")

async function get_test_data(numPart, numTest){
    var text = "SELECT * FROM question WHERE test_id = (SELECT test_id FROM test WHERE part = $1 AND number_test = $2) ORDER BY number_question"
    var values = [numPart, numTest]
    var question_list = await queryData(text, values)
    var question_data = []
    var num_page = 0
    for (var question of question_list){
        var q = {}
        q["number_question"] = question.number_question
        q["answer"] = []
        var set_label = [["A", "B", "C", "D"], ["A", "B", "C"]]
        if (numPart <= 2){
            for (var label of set_label[numPart - 1]){
                q["answer"].push({"number_question": question.number_question, "L":label})
            }
        }
        else{
            var label_content = {"A": "a_choice", "B": "b_choice", "C": "c_choice", "D": "d_choice"}
            for (var label of set_label[0]){
                q["answer"].push({"number_question": question.number_question, "L":label, "content": question[label_content[label]]})
            }
            q["question_content"] = question["question_content"]
        }
        if (numPart <= 4){
            if (question.audio != null){
                num_page ++
                question_data.push({"image": question.image, "audio": question.audio, "question_list": [], "num_page": num_page})
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
                question_data.push({"image":question.image,"paragraph": line.join("<br>"), "question_list": [], "num_page": num_page})
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

module.exports = get_test_data