console.log("feedback")

for (var content of document.getElementsByClassName("content-wrapper-display")){
    var p = content.querySelector("p")
    console.log(p.innerHTML.split("\n"))
    var res = []
    for (var st of p.innerHTML.split("\n")){
        if (st.length){
            res.push(st.trim())
        }
    }
    p.innerHTML = res.join("<br>")
}