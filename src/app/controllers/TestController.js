const queryData = require("../models/index")
class TestController{

    index(req, res){
        async function process(){
            var slug_info = req.params.slug
            var info = slug_info.split("-")
            var numPart = parseInt(info[1], 10)
            var numTest = parseInt(info[3], 10)
            var text = "SELECT * FROM question WHERE test_id = (SELECT test_id FROM test WHERE part = $1 AND number_test = $2)"
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
                        question_data.push({"image": question.image, "audio": question.audio, "question_list": []})
                    }
                }
                else{
                    if (question.paragraph != null){
                        num_page ++
                        question_data.push({"image": question.image, "paragraph": question.paragraph, "question_list": []})
                    }
                }
                question_data[num_page - 1].question_list.push(q)
            }
            res.render("test", {"data": question_data, "numPart": numPart, "numTest": numTest})
            console.log(question_data)
        }
        try{
            process()
        }
        catch(err){
            res.send("Server error")
        }
    }

    postForm(req, res){
        async function readData(){
            var slug_info = req.params.slug
            var info = slug_info.split("-")
            var numPart = parseInt(info[1], 10)
            var numTest = parseInt(info[3], 10)
            var text = "SELECT * FROM question WHERE test_id = (SELECT test_id FROM test WHERE part = $1 AND number_test = $2)"
            var values = [numPart, numTest]
            var question_list = await queryData(text, values)
            var question_data = []
            if (numPart <= 4){
                var num_page = 0
                for (var question of question_list){
                    var q = {}
                    var keys = ["number_question", "question_content", "correct"]
                    for (var key of keys){
                        q[key] = question[key]
                    }
                    q["answer"] = []
                    q["answer"].push({"content":question.a_choice, "number_question": question.number_question, "L":"A"})
                    q["answer"].push({"content":question.b_choice, "number_question": question.number_question, "L":"B"})
                    q["answer"].push({"content":question.c_choice, "number_question": question.number_question, "L":"C"})
                    q["choice"] = req.body[question.number_question.toString()]
                    if (numPart != 2) {
                        q["answer"].push({"content":question.d_choice, "number_question": question.number_question, "L":"D"})
                    }
                    if (question.audio != null){
                        num_page ++ 
                        question_data.push({"image": question.image, "audio": question.audio, "paragraph": question.paragraph, "question_list": []})
                    }
                    question_data[num_page - 1].question_list.push(q)
                }
            }
            else{
                var num_page = 0
                for (var question of question_list){
                    var q = {}
                    var except = ["question_id", "image", "paragraph", "audio", "test_id", "correct"]
                    for (var key in question){
                        if (except.indexOf(key) < 0){
                            q[key] = question[key]
                        }
                    }
                    if (question.paragraph != null){
                        num_page ++ 
                        question_data.push({"image": question.image, "audio": question.audio, "paragraph": question.paragraph, "question_list": []})
                    }
                    question_data[num_page - 1].question_list.push(q)
                }
            }
            res.render("key", {"data": question_data, "numPart": numPart, "numTest": numTest})
            console.log(question_data)
        }
        try{
            readData()
        }
        catch(err){
            res.send("Server error")
        }
    }
}
module.exports = new TestController()