/**
 * @author  AZDirect  <azdirect@allianz.it>
 * @desc    this grunt task just watches the files and folders, and executes tasks on change
 */

module.exports = function(options, grunt) {

    grunt.loadNpmTasks("grunt-contrib-watch");

    var paths = options.paths;

    return {
        js: {
            files: "" + paths.app + "/js/**/*.js",
            tasks: ["sync:dev_js", "htmlbuild:dev", "karma:dev"]
        },
        tests: {
            files: "" + paths.app + "tests/**/*.js",
            tasks: ["karma:dev"]
        },
        less: {
            files: "" + paths.app + "/less/**/*.less",
            tasks: ["less:dev", "htmlbuild:dev"]
        },
        index: {
            files: ["" + paths.app + "/index.html"],
            tasks: ["htmlbuild:dev"]
        },
        partials: {
            files: ["" + paths.app + "/partials/*.html"],
            tasks: ["sync:dev_static"]
        },
        grunt: {
            files: ["Gruntfile.js"],
            tasks: ["deps", "compile_dev"]
        },
        libs: {
            files: ["grunt_config/libs.js"],
            tasks: ["htmlbuild:dev"]
        },
        mocks: {
            files: "" + paths.app + "/mocks/**/*",
            tasks: ["sync:dev_static", "htmlbuild:dev"]
        },
        npm: {
            files: "package.json",
            tasks: ["npm-install"]
        },
        bower: {
            files: "bower.json",
            tasks: ["bower"]
        },
        jshint: {
            files: "app/**/*",
            tasks: ["jshint"]
        },
        options: {
            livereload: true
        }
    };
};
