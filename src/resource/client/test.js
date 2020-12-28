//Countdown time
function TimeLeft(hours, minutes, seconds){
    this.hours = hours
    this.minutes = minutes
    this.seconds = seconds
}
var time = new TimeLeft(0, 0, 30)
var time_element = document.querySelector(".time-left")
time_element.innerText = display(time)
function isOvertime(time){
    return (time.hours == 0) && (time.minutes == 0) && (time.seconds == 0)
}
function display(time){
    var hours = time.hours.toString()
    var minutes = time.minutes.toString()
    var seconds = time.seconds.toString()
    if (hours.length < 2){
        hours = "0" + hours
    }
    if (minutes.length < 2){
        minutes = "0" + minutes
    }
    if (seconds.length < 2){
        seconds = "0" + seconds
    }
    return [hours, minutes, seconds].join(" : ")
}
var auto = setInterval(function(){
    if (time.seconds == 0){
        if (time.minutes == 0){
            if (time.hours > 0){
                time.hours -= 1
                time.minutes = 59
                time.seconds = 59
            }
        }
        else{
            time.minutes -= 1
            time.seconds = 59
        }
    }
    else{
        time.seconds -= 1
    }
    time_element.innerText = "Time : " + display(time)
    if (isOvertime(time)){
        clearInterval(auto)
        var button = document.querySelector("button")
        button.click()
    }
}, 1000)
//Display paragraph
for (var element of document.querySelectorAll("p")){
    var text = element.innerText
    element.innerHTML = text
}
//Remove redundant element
var h = document.querySelector("h2")
var numPart = h.innerText.split(" ")[1]
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
if (numPart < 6){
    var paragraphs = document.getElementsByClassName("paragraph-container")
    for (var paragraph of paragraphs){
        paragraph.style.display = "none"
    }
}
//Set control for question-button
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

for (var choice of document.getElementsByClassName("choice-item")){
    choice.onmouseenter = function(e){
        e.target.classList.add("change-color-choice-item")
    }
    choice.onmouseout = function(e){
        e.target.classList.remove("change-color-choice-item")
    }
    choice.onclick = function(e){
        var input_tag = e.srcElement.children[0]
        input_tag.checked = "true"
        document.querySelector(".question-button-container").querySelector(".question-" + input_tag.name).style.backgroundColor = "gray"
        for (var item of e.srcElement.parentElement.children){
            if (item.children[0].checked == true){
                item.classList.add("change-color-answer-item")
            }
            else{
                item.classList.remove("change-color-answer-item")
            }
        }
    }
}
function preventBack(){
    window.history.forward()
}  
setTimeout("preventBack()", 0);  
window.onunload = function () {null};