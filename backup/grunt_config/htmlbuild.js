/**
 * @author  AZDirect  <azdirect@allianz.it>
 * @desc    this grunt task include all necessary files for dev and dist mode into the index.html
 */

module.exports = function (options, grunt) {

    grunt.loadNpmTasks("grunt-html-build");

    var paths = options.paths,
        fs = require("fs");

    function getFiles(dir, files_) {
        files_ = files_ || [];
        if (typeof files_ === 'undefined') files_ = [];
        if (!fs.existsSync(dir)) return files_;
        var files = fs.readdirSync(dir);
        for (var i in files) {
            if (!files.hasOwnProperty(i)) continue;
            var name = dir + '/' + files[i];
            if (fs.statSync(name).isDirectory()) {
                getFiles(name, files_);
            } else {
                files_.push(name);
            }
        }
        return files_;
    }


    var cssDevFiles = [];
    getFiles(paths.app + "/less").forEach(function(less) {
        // Copy only .less files that doesn't match "/_NAME.less"
        if (/\.less$/.test(less) && !(/\/_.+?$/.test(less))) {
            cssDevFiles.push([
                paths.dev,
                'app',
                'css',
                less.replace(paths.app + "/less/", '').replace(/\//g, '').replace('.less', '.css')
            ].join('/'));
        }
    });

    return {
        dev: {
            src: "" + paths.app + "/index.html",
            dest: "" + paths.dev + "/index.html",
            options: {
                prefix: "x",
                styles: {
                    all: options.cssLibs.map(function (lib) {
                        return "" + paths.dev + "/lib/" + lib;
                    }).concat( cssDevFiles )
                },
                scripts: {
                    all: options.jsLibs.map(function (lib) {
                        return "" + paths.dev + "/lib/" + lib;
                    }).concat(["" + paths.dev + "/app/js/app.js", "" + paths.dev + "/app/js/route.js", "" + paths.dev + "/app/js/**/*.js", "" + paths.dev + "/app/mocks/**/*", "!" + paths.dev + "/app/js/templates.js"])
                },
                data: {
                    version: options.version,
                    title: options.name
                }
            }
        },
        dist: {
            src: "" + paths.app + "/index.html",
            dest: "" + paths.dist + "/app/index.html",
            options: {
                prefix: "x",
                styles: {
                    all: "" + paths.dist + "/app/css/app.min.css"
                },
                scripts: {
                    all: options.jsLibsMin.map(function (lib) {
                        return "" + paths.dist + "/lib/" + lib;
                    }).concat(["" + paths.dist + "/app/js/app.js", "" + paths.dist + "/app/js/route.js", "" + paths.dist + "/app/js/**/*.js", "!" + paths.dist + "/app/js/templates.js"])
                },
                data: {
                    version: options.version,
                    title: options.name
                }
            }
        },
        options: {
            relative: true,
            prefix: "/x"
        }
    };

};