const query = require("./index")

function to_number(ch){
    switch (ch){
        case "A": return 1;
        case "B": return 2;
        case "C": return 3;
        case "D": return 4;
    }
}
//Complete pg-format to avoid SQL Injection
async function push_data(data, numPart, files){
    var out = await query("SELECT COUNT(*) FROM test WHERE PART = $1", [numPart])
    var numTest = parseInt(out[0].count, 10) + 1
    var add_test = await query("INSERT INTO TEST VALUES ($1, $2, $3)", [`P${numPart}-T${numTest}`, numPart, numTest])
    var numQuestion = 0
    var numPage = 1  
    var test_id_obj = await query("SELECT test_id FROM test WHERE part = $1 AND number_test = $2", [numPart, numTest])
    var test_id = test_id_obj[0].test_id
    console.log("data after being process = ",data)
    if (!files){
        files = {}
    }
    while (data[numPage]){
        var list = data[numPage]
        console.log(`data[${numPage}]`, data[numPage])
        if (! files[`img-${numPage}`]){
            files[`img-${numPage}`] = {"name": null}
        }
        if (! files[`audio-${numPage}`]){
            files[`audio-${numPage}`] = {"name": null}
        }
        if (! files[`paragraph-${numPage}`]){
            files[`paragraph-${numPage}`] = {"name": null}
        }
        numQuestion += 1
        console.log(`Adding question ${numQuestion}...`)
        var add_0 = await query("INSERT INTO question VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
        [`P${numPart}-T${numTest}-Q${numQuestion}`, files[`img-${numPage}`].name, files[`paragraph-${numPage}`].name, files[`audio-${numPage}`].name,
        list[0].content, list[0].A, list[0].B, list[0].C, list[0].D,
        to_number(list[0].key), test_id, numQuestion])
        console.log("Insert question done!")
        var add_sentences = []
        //Add sentences after first element
        for (var i = 1; i < list.length; i++){
            numQuestion += 1
            console.log(`Adding question ${numQuestion}...`)
            add_sentences.push(`(P${numPart}-T${numTest}-Q${numQuestion}, NULL, NULL, NULL, ${list[i].content},
                ${list[i].A}, ${list[i].B}, ${list[i].C}, ${list[i].D}, 
                ${to_number(list[i].key)}, P${numPart}-T${numTest}, ${numQuestion})`)
        }
        var add_execute = add_sentences.join(",")
        console.log(add_execute)
        if (add_execute){
            console.log("Execute add extra question")
            await query("INSERT INTO question VALUES $1", [add_execute])
        }
        numPage += 1
    }
    console.log(files)
    return 0
}

module.exports = push_data
