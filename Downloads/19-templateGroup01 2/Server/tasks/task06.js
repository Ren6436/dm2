const common = require("../common.js");
const operation = require("../operation.js");

function task(employees) {
    
    //Validacni podminka jestli vtupni peromenna odkazuje na pole a ma alespon jeden prvek
    if (!Array.isArray(employees) || employees.length===0) return "Zamestnanci nejsou definováni."

    
    return "Test06";
}

module.exports = { task }