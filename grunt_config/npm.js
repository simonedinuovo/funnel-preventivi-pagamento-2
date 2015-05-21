/**
 * @author  AZDirect  <azdirect@allianz.it>
 * @desc    this grunt task just executes the 'npm install' command, so do not need to run it before grunt
 */

module.exports = function(options, grunt) {

    return grunt.loadNpmTasks("grunt-npm-install");

};