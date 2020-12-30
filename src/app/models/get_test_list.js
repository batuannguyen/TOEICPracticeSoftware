const query = require("./index")

async function get_test_list(){
    var text = "SELECT PART, NUMBER_TEST FROM TEST"
    var test_list = await query(text, [])
    return test_list
}

module.exports = get_test_list