function Register() {
    var user_name = document.forms["register"]["user_name"].value;
    var email = document.forms["register"]["email"].value;
    var password = document.forms["register"]["psw"].value;
    var password_repeat = document.forms["register"]["psw_repeat"].value;
    var phone = document.forms["register"]["phone_number"].value;

    //check user email 
    if (!ValidateEmail(email)) {

        // alert("Invalid Email");
        return false;
    }

    // check password
    if (password.indexOf(password_repeat) != 0 ||
        password.length != password_repeat.length) {
        // alert("Password confirm not correct");
        return false;
    }

    if (password.length > 50) {
        // alert("Password to long, please enter a shorter password, must contain less than 50 chars")
        return false;
    }

    if (!checkPhone(phone)){
        // alert("Phone is invalid")
        return false
    }
    // register successfull 
    // alert("Signup successfully");
    return true
}

function ValidateEmail(inputText) {
    var mailformat = /^[a-zA-Z0-9]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (inputText.match(mailformat)) {
        // alert("Valid email address!");
        // document.form1.text1.focus();
        return true;
    }
    else {
        // alert("You have entered an invalid email address!");
        // document.form1.text1.focus();
        return false;
    }
}

function checkPhone(phone){
    for (var i = 0; i < phone.length; i += 1){
        if (phone[i] == '1' || phone[i] == '2' || phone[i] == '3' ||
            phone[i] == '4' || phone[i] == '5' || phone[i] == '6' ||
            phone[i] == '7' || phone[i] == '8' || phone[i] == '9' ||
            phone[i] == '0'){
                continue
            }
        else{
            return false
        }
    }
    return true
}
var html = document.querySelector("body")
var button = document.querySelector("button")
html.onkeyup = function(e){
    console.log(e)
    if (Register()){
        button.style.display = "block"
        console.log("Valid")
    }
    else{
        button.style.display = "none"
        console.log("Invalid")
    }
}


console.log("Checking...")