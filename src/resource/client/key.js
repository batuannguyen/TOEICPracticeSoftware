function convert_to_label(x){
    if (x == "1") return "A";
    if (x == "2") return "B";
    if (x == "3") return "C";
    if (x == "4") return "D";
}

var buttons = document.getElementsByClassName("question-button")
for (var button of buttons){
    button.onclick = function(e){
        var num_page = e.toElement.classList[1].split("-")[2]
        var datapage = document.getElementById("data-page-" + num_page)
        var datapage_list = document.getElementsByClassName("question-container")
        for (var item of datapage_list){
            item.style.display = "none"
        }
        datapage.style.display = "block"
    }
}
//Check answer and calculate user's score
var score = 0
var count_questions = document.getElementsByClassName("question").length
for (var element of document.getElementsByClassName("choice_list")){
    var correct = element.classList[1]
    correct = convert_to_label(correct)
    var choice = element.classList[2]
    if (!choice) continue
    var number_question = element.querySelector(".choice-item").id.split("-")[0]
    var div_question = document.querySelector(".question-button-container").querySelector(".question-"+number_question)
    for (var item of element.children){
        var id = item.id.split("-")[1]
        if (id == choice){
            item.style.backgroundColor = "red"
        }
        if (id == correct){
            item.style.backgroundColor = "green"
        }
    }
    if (choice == correct){
        div_question.style.backgroundColor = "green"
        score ++
    }
    else{
        div_question.style.backgroundColor = "red"
    }
}
var time_element = document.querySelector(".time-left")
time_element.innerText = `Score : ${score} / ${count_questions}`
for (var element of document.querySelectorAll("p")){
    var text = element.innerText
    element.innerHTML = text
}
var h = document.querySelector("h2")
var numPart = h.innerText.split(" ")[1]
//Remove redundant element
if (numPart > 1){
    var imgs = document.getElementsByClassName("image-container")
    for (var img of imgs){
        img.style.display = "none"
    }
}
if (numPart > 4){
    var audios = document.getElementsByClassName("audio-container")
    for (var audio of audios){
        audio.style.display = "none"
    }
}
if (numPart == 1 || numPart == 2 || numPart == 5){
    var paragraphs = document.getElementsByClassName("paragraph-container")
    for (var paragraph of paragraphs){
        paragraph.style.display = "none"
    }
}
function preventBack() {
    window.history.forward()
}  
setTimeout("preventBack()", 0)
window.onunload = null