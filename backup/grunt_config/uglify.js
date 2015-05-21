/**
 * @author  AZDirect  <azdirect@allianz.it>
 * @desc    this grunt task just minifies the code
 */

module.exports = function(options, grunt) {

    grunt.loadNpmTasks("grunt-contrib-uglify");

    var paths = options.paths,
        files = {};

    files["" + paths.dist + "/js/app.min.js"] = options.jsLibsMin.concat(["" + paths.dist + "/annotated/js/app.js", "" + paths.dist + "/annotated/js/**/*.js"]);

    return {
        options: {
            mangling: true,
            compress: true,
            banner: "/*! pkg.name - v pkg.version - grunt.template.today(\"yyyy-mm-dd\") */\n"
        },
        dist: {
            files: files
        }
    };
};