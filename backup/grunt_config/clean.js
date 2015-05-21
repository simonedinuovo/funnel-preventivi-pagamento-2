/**
 * @author  AZDirect  <azdirect@allianz.it>
 * @desc    this grunt task deletes the destination folder
 */

module.exports = function(options, grunt) {
    grunt.loadNpmTasks("grunt-contrib-clean");

    var paths = options.paths;

    return {
        dist: [ "" + paths.dist + "/app", "" + paths.dist + "/lib" , "" + paths.dist + "/index.properties"],
        dev: paths.dev,
        annotated: "" + paths.dist + "/annotated"
    };
};