/**
 * @author  AZDirect  <azdirect@allianz.it>
 * @desc    this grunt task runs karma with the given configuration from the karma.conf.js file,
 *          and create a jUnitXMLReport (test-results.xml).
 */

module.exports = function(options, grunt) {

    grunt.loadNpmTasks("grunt-karma");
    return {
        options: {
            configFile: "karma.conf.js"
        },
        dev: {
            reporters: ['story']
        },
        dist: {
            reporters: ['story', 'junit']
        }
    };
};