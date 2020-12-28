function Register() {
    var user_name = document.forms["register"]["user_name"].value;
    var email = document.forms["register"]["email"].value;
    var password = document.forms["register"]["psw"].value;
    var password_repeat = document.forms["register"]["psw_repeat"].value;
    var phone = document.forms["register"]["phone_number"].value;
    console.log(user_name)
    //check user email 
    if (email.indexOf("@") != email.lastIndexOf("@") ||
        email.lastIndexOf("@") == -1 ||
        !ValidateEmail(email)) {
        console.log("Invalid Email");
        return "Invalid Email";
    }

    // check password
    if (password.indexOf(password_repeat) != 0 ||
        password.length != password_repeat.length) {
        console.log("Password confirm not correct");
        return "password confirm not correct";
    }

    if (password.length > 50) {
        console.log("Password to long, please enter a shorter password, must contain less than 50 chars")
        return "Password to long, please enter a shorter password, must contain less than 50 chars";
    }

    // register successfull 
    var user = {
        email: email,
        user_name: user_name,
        password: password,
        phone: phone

    };

    return user
}

function ValidateEmail(inputText) {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (inputText.value.match(mailformat)) {
        alert("Valid email address!");
        document.form1.text1.focus();
        return true;
    }
    else {
        alert("You have entered an invalid email address!");
        document.form1.text1.focus();
        return false;
    }
}
function test() {
    var x = document.forms["register"]["email"];
    console.log(x);
}