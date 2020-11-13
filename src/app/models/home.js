const client = require("./client")
function queryData(text, values = undefined){
    return client.query(text, values)
                .then(resp => resp.rows)
                .catch(err => console.warn(err))
}
module.exports = queryData




