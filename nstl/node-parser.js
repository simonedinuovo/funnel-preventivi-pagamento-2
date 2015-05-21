/**
 *
 * @param html {string} - UTF-8 file to be parsed
 * @param nodeTag {string | "nstl:"} - tag to be searched. Default "nstl:"
 * @param isVoid {boolean} - if true, tag to be searched is "void" type
 * @returns {Array} - Array of objects
 *      <h1>returnValue Schema:</h1>
 *      <code>
 *      tag : null - name of the tag parsed
        startPosition : 0,
        endPosition : null,
        startHtml : null,
        endHtml : null,
        attributes : []
        </code>
 *
 */
module.exports = function(html, nodeTag, isVoid){
    //var debuggerTxt = require("../debugger-txt/debugger-txt.js");
    var returnValueS = [];
    var fileToBeParsed = String(html);
    var parsingAdded = 0;
    var nodeTag = nodeTag || "nstl:"
    var parseAttribute = function(stringAttr){
        if ( stringAttr.charAt(stringAttr.length-1) == "/" ) stringAttr = stringAttr.substring(0,stringAttr.length-1);
        /*var tokenAttrs = stringAttr.split(/\"/g).filter(function(v,i,a){
            return v.length;
        });*/

        var tokenAttrs = stringAttr.split(/\s+/);

        var returnValue = {
            name : null,
            attributes : {}
        }
        for(var i = 0; i<tokenAttrs.length;i++)
        {
            var element = tokenAttrs[i].replace(/\"/g,"");
            var index = i;
            var array = tokenAttrs;
            //if(element.indexOf("=") > -1 && array[index+1] && array[index+1].indexOf("=") < 0)
            if ( index == 0 ) {
                //returnValue.tag = tokenAttrs[i].replace(/\"/g, "");
                returnValue.name = tokenAttrs[i].replace(/\"/g, "");
                continue;
            }

            if( element.indexOf("=") > -1 )
            {
                var splitted = element.split("=");
                returnValue.attributes[splitted[0]] = splitted[1];
                //tokenAttrs.splice(index+1,1);
            }
            //else if(element.indexOf("=") > -1 && ( !array[index+1] || array[index+1].indexOf("=") > -1 ) )
            else
            {
                returnValue.attributes[element] = null;
            }

        };
        return returnValue;
    }
    var parseTag = function(file){
        var returnValue = {
            tag : null,
            startPosition : 0,
            endPosition : null,
            startHtml : null,
            endHtml : null,
            attributes : {}
        };
        var startTag = "<"+nodeTag;
        returnValue.startPosition = file.indexOf(startTag) + parsingAdded;
        if ( file.indexOf(startTag) < 0 )
            return -1;
        var rest1 = html.substring(returnValue.startPosition,html.length);
        if(isVoid)
        {
            returnValue.endPosition = rest1.indexOf(">") + ">".length + returnValue.startPosition; //+ nodeTag.length;
            var attributesString = html.substring(returnValue.startPosition + startTag.length,returnValue.endPosition-1);
            returnValue.attributes = parseAttribute(attributesString);
            returnValueS.push(returnValue);
            parsingAdded = returnValue.endPosition;
            return html.substring(returnValue.endPosition,html.length);
        }
        returnValue.startHtml = rest1.indexOf(">") + ">".length + returnValue.startPosition; //+ nodeTag.length;
        var attributesString = html.substring(returnValue.startPosition + startTag.length,returnValue.startHtml-1);
        var attributes = parseAttribute(attributesString);
        returnValue.tag = attributes.name;
        returnValue.attributes = attributes.attributes;
        var rest2 = html.substring(returnValue.startHtml,html.length);
        var endTag = "</"+nodeTag;
        returnValue.endHtml = rest2.indexOf(endTag) + returnValue.startHtml;
        var rest3 = html.substring(returnValue.endHtml,html.length);
        returnValue.endPosition = rest3.indexOf(">") + ">".length + returnValue.endHtml;
        returnValueS.push(returnValue);
        parsingAdded = returnValue.endPosition;
        return html.substring(returnValue.endPosition,html.length);
    };
    do
    {
        fileToBeParsed = parseTag(fileToBeParsed);
    }
    while (fileToBeParsed!=-1);
    return returnValueS;
}
