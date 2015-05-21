/**
 * @author  AZDirect  <azdirect@allianz.it>
 * @desc    this grunt task runs jshint (a code quality tool), you can configure it via the .jshintrc
 */

module.exports = function(options, grunt) {

    grunt.loadNpmTasks("grunt-contrib-jshint");

    return {
        options: {
            jshintrc: ".jshintrc"
        },
        sources: ["" + options.paths.app + "/js/**/*.js"]
    };
};