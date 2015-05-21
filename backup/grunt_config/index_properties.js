/**
 * @author  AZDirect  <azdirect@allianz.it>
 * @desc    this grunt task generates the index.properties file.
 */

module.exports = function(options, grunt) {

    function getFiles(dir,files_){
        files_ = files_ || [];
        if (typeof files_ === 'undefined') files_=[];
        var files = fs.readdirSync(dir);
        for (var i in files) {
            if (!files.hasOwnProperty(i)) continue;
            var noExtName = files[i].split(".less")[0];
            if (noExtName.indexOf("_") === 0) continue;
            var name = dir+'/'+files[i];
            if (fs.statSync(name).isDirectory()){
                getFiles(name,files_);
            } else {
                files_.push(name);
            }
        }
        return files_;
    }
    var paths = options.paths,
        fs = require("fs");

    function getJsFiles(){
        return jsFiles = getFiles(paths.app + "/js");
    }
    function getCssFiles(){
        return getFiles(paths.app + "/less").map(function(file){
            var fileName = file.replace("/less/", "/css/").split(".less")[0];
            return fileName + ".min.css";
        });
    }

    function getJsLibs(){
        return options.jsLibsMin.filter(function(lib){
            if(lib == "''"){
                return false
            } else {
                return true
            }
        });
    }

    function getJsLibsDev(){
        return options.jsLibs.filter(function(lib){
            if(lib == "''"){
                return false
            } else {
                return true
            }
        });
    }

    function getCssLibs(){
        return options.cssLibsMin.filter(function(lib){
            if(lib == "''"){
                return false
            } else {
                return true
            }
        });
    }

    function getCssLibsDev(){
        return options.cssLibs.filter(function(lib){
            if(lib == "''"){
                return false
            } else {
                return true
            }
        });
    }

    function getCssFilesDev(){
        return getFiles(paths.app + "/less").map(function(file){
            var fileName = file.replace("/less/", "/css/").split(".less")[0];
            return fileName + ".css";
        });
    }

    grunt.loadNpmTasks('grunt-template');

    return {

        'dev': {
            'options': {
                'data': {
                    'ng_app':'emptyNgApp',
                    'styles': getCssLibsDev().map(function(lib){
                        return "lib/" + lib;
                    }).concat(getCssFilesDev().map(function(appCss){
                        return appCss;
                    })).toString(),
                    'scripts':getJsLibsDev().map(function(lib){
                        return "lib/" + lib;
                    }).concat(getJsFiles().map(function(appJs){
                        return appJs;
                    })).toString(),
                    'ie8_styles': '',
                    'ie8_scripts': '',
                    'type': '2'
                }
            },
            'files': {
                '.tmp/index.properties': ['index.properties']
            }
        },
        'dist': {
            'options': {
                'data': {
                    'ng_app':'emptyNgApp',
                    'styles': getCssLibs().map(function(lib){
                        return "lib/" + lib;
                    }).concat(getCssFiles().map(function(appCss){
                        return appCss;
                    })).toString(),
                    'scripts':getJsLibs().map(function(lib){
                        return "lib/" + lib;
                    }).concat(getJsFiles().map(function(appJs){
                        return appJs;
                    })).toString(),
                    'ie8_styles': '',
                    'ie8_scripts': '',
                    'type': '2'
                }
            },
            'files': {
                'emptyNgApp-war/src/main/webapp/index.properties': ['index.properties']
            }
        }

    };
};

