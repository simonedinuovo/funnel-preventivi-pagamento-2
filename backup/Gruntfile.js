/**
 * @author  AZDirect azdirect@allianz.it>
 * @desc    Grunt configuration file
 */

module.exports = function (grunt) {

    var options = require("./package.json"),
        /**
         * @desc loads modules with configuration from the grunt_config folder
         * @param {String} module name of the module which should be load
         * @returns {function} object with the grunt module and all necessary configuration information
         */
        loadConfig = function (module) {
            return require("./grunt_config/" + module)(options, grunt);
        };

    loadConfig("npm"); // loads all node modules
    loadConfig("libs");

    // loads grunt modules which are needed
    grunt.initConfig({
        pkg: options,
        jshint: loadConfig("jshint"),
        htmlbuild: loadConfig("htmlbuild"),
        karma: loadConfig("karma"),
        less: loadConfig("less"),
        uglify: loadConfig("uglify"),
        ngAnnotate: loadConfig("annotate"),
        watch: loadConfig("watch"),
        sync: loadConfig("sync"),
        clean: loadConfig("clean"),
        connect: loadConfig("connect"),
        protractor: loadConfig("protractor"),
        template: loadConfig("index_properties"),
        ngdocs: loadConfig("ngdocs")
    });


    // available tasks for grunt
    grunt.registerTask("dependencies", ["npm-install"]);
    grunt.registerTask("sync_dev", ["sync:dev_js", "sync:dev_static", "sync:dev_libs", "sync:fonts_dev", "htmlbuild:dev"]);
    grunt.registerTask("sync_dist", ["sync:dist_js", "sync:dist_static", "sync:dist_libs", "sync:fonts_dev"]);
    grunt.registerTask("compile_dev", ["sync_dev", "less:dev", "htmlbuild:dev"]);
    grunt.registerTask("compile_dist", ["sync_dist", "less:dist" /*, "ngAnnotate", "uglify", "clean:annotated"*/]);
    grunt.registerTask("dev", ["clean:dev", "compile_dev", "template:dev", /*"jshint", "karma:dev", */"configureProxies:server", "connect:server", "watch"]);
    grunt.registerTask("dist", ["dependencies", "clean:dist", /*"jshint", "karma:dist",*/ "compile_dist", "template:dist", "ngdocs"]);
    grunt.registerTask("unittest", ["karma:dev"]);
    grunt.registerTask("e2etest", ["protractor:dev"]);
    grunt.registerTask("ngDocs", ["ngdocs"]);

};