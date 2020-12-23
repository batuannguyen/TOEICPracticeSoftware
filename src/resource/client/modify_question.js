var h = document.querySelector("h2")
var numPart = h.innerText.split(" ")[1]
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

function decode(correct){
    switch (correct){
        case "1": return "A";
        case "2": return "B";
        case "3": return "C";
        case "4": return "D";
    }
}
//Display paragraph
for (var element of document.querySelectorAll("p")){
    var text = element.innerText
    element.innerHTML = text
}
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


for (var choice_list of document.getElementsByClassName("choice_list")){
    var correct = decode(choice_list.classList[1])
    for (var input of choice_list.querySelectorAll("input")){
        if (input.type == "radio" && input.value == correct){
            input.checked = true;
        }
    }
}