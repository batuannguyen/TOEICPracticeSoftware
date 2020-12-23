var numPart = document.querySelector(".content").querySelector("h2").innerText.split(" ")[4]
var control_page = document.querySelector(".add-datapage")
var content = document.querySelector(".block-add-content")
var numQuestion = 0
control_page.onclick = function(e){
    console.log(e)
    var numPage = document.getElementsByClassName("page-container").length + 1
    var html_code_for_page = `
        <div class="page-container" id="page-${numPage}">
        </div>`
    content.innerHTML += html_code_for_page
    var page = document.getElementById(`page-${numPage}`)
    var html_code_for_file = `
        <legend>
            <div class="page-content"><h3>Add question for part ${numPart}</h3></div>
            <div class="page-content add-question" id="add-question-${numPage}"><h4>Add question</h4></div>
        </legend>
        <label for="img-${numPage}">Add image</label>
        <input name="img-${numPage}" id="img-${numPage}" type="file">
        <label for="audio-${numPage}">Add audio</label>
        <input name="audio-${numPage}" id="audio-${numPage}" type="file">
        <label for="paragraph-${numPage}">Add paragraph</label>
        <input name="paragraph-${numPage}" id="paragraph-${numPage}" type="file">`
    page.innerHTML += html_code_for_file
}

setInterval(function(){
    var control_questions = document.getElementsByClassName("add-question")
    for (var control_question of control_questions){
        control_question.onclick = function(e1){
            numQuestion += 1
            var parent = e1.srcElement.parentElement.parentElement.parentElement
            console.log(parent)
            var html_code_for_question = `
            <div class="question" id="question-${numQuestion}">
                <input type="text" name="${numQuestion}-index" value="${parent.id.split("-")[1]}" style="display:none">
                <h4>
                    Question ${numQuestion}.
                    <input type="text" name="${numQuestion}-content" size="150">
                </h4>
                <div class="choice-container">
                    <ul class="choice_list">
                        <li class="choice-item">
                            <input type="radio" name="${numQuestion}-key" id="${numQuestion}-A" value="A">
                            <label for="${numQuestion}-A">(A)</label>
                            <input type="text" name="${numQuestion}-A" class="adjust" size="100">
                        </li>
                        <li class="choice-item">
                            <input type="radio" name="${numQuestion}-key" id="${numQuestion}-B" value="B">
                            <label for="${numQuestion}-B">(B)</label>
                            <input type="text" name="${numQuestion}-B" class="adjust" size="100">
                        </li>
                        <li class="choice-item">
                            <input type="radio" name="${numQuestion}-key" id="${numQuestion}-C" value="C">
                            <label for="${numQuestion}-C">(C)</label>
                            <input type="text" name="${numQuestion}-C" class="adjust" size="100">
                        </li>
                        <li class="choice-item">
                            <input type="radio" name="${numQuestion}-key" id="${numQuestion}-D" value="D">
                            <label for="${numQuestion}-D">(D)</label>
                            <input type="text" name="${numQuestion}-D" class="adjust" size="100">
                        </li>
                    </ul>
                </div>
            </div>`
            parent.innerHTML += html_code_for_question
        }
    }
}, 1000)