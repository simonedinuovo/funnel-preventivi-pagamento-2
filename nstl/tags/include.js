module.exports = function(attributes){
    var fs = require("fs");
    var srcFile = attributes.path;
    if ( !srcFile ){
        throw "include tag initialized with no path"
    }
    var fileToInclude = fs.readFileSync(srcFile, { encoding : "utf-8" });
    return fileToInclude;
}
