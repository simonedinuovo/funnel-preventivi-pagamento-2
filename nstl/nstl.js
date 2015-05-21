// options

// file to be parsed
var srcFile = process.argv[2];
var destFile = process.argv[3];
if ( !srcFile )
{
    console.log("No search file.");
    return;
}
if ( !destFile )
{
    console.log("No destination file.");
    return;
}
var fs = require("fs");
var nodeParser = require(__dirname + "/node-parser.js");
var includeTag = require(__dirname + "/tags/include.js");

var writeHtml = function(dest, html, callback){
    fs.writeFile(dest, html, function (err) {
        if (err) throw err;
        callback(dest,html);
    });
}

var parseNstlNodes = function(nodes, file){
    var html = "";
    //var html = data;
    var offset = 0;
    nodes.forEach(function(v,i,a){
        var exitValue = "";
        //var exitToken = data.substring(v.startPosition, v.endPosition);
        var exitToken = file.substring(offset, v.endPosition);
        switch(v.tag){
            case "include" :
                exitValue = includeTag(v.attributes);
                break;
            default:
                exitValue = "";
                break;
        };
        //html = html.replace(exitToken, exitValue);
        html += file.substring(offset, v.startPosition-1) + exitValue;
        offset = v.endPosition;
    });

    if ( offset != file.length )
        html += file.substring(offset, file.length);

    return html;
}


fs.readFile(srcFile, { encoding : "utf-8" }, function (err, data) {
    if (err) throw err;

    var nstlNodes = nodeParser(data);
    var html = parseNstlNodes(nstlNodes,data);
    writeHtml(destFile,html,function(dest,newHtml){
        console.log(dest + " was written.");
    })
    console.log("nstlNodes: \n", JSON.stringify(nstlNodes, null, 4))
});

