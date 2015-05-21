/**
 * @author  AZDirect <azdirect@allianz.it>
 * @desc    This setup file generates all information for the protractor.conf.js
 * @param   {String} seleniumAddress The remote selenium hub URL, if you set this attribute, protractor automatically connect to this hub.
 * @param   {Object} capabilities The configuration objects for the browsers you want to run.
 * @param   {Object[]} multiCapabilities The configuration objects for multiple capabilities.
 * @param   {String} chromeDriver The path to the ChromeDriver binary / executable.
 * @param   {String} specs The relative path to your specs folder.
 * @param   {String} framework The testframework your tests are written in.
 * @param   {Number} maxSessions Maximum number of total browser sessions to run. Tests are queued in sequence if number of browser sessions is limited by this parameter. Use a number less than 1 to denote unlimited. Default is unlimited.
 * @param   {Object} jasmineNodeOpts The Jasmine configuration object.
 * @param   {Boolean} showColors Generates a colored output.
 * @param   {Numner} defaultTimeoutInterval The time Jasime will wait for a browser response.
 * @param   {Boolean} isVerbose Writes more information about the tests in the output.
 * @param   {function} onPrepare Callback to configure Jasmine reporter.
 * All options for protractor can be find here: https://github.com/angular/protractor/blob/master/docs/referenceConf.js
 */

module.exports.config = {

    //seleniumAddress: 'http://hub.browserstack.com/wd/hub',

    capabilities: {
        'browserName': 'chrome'
        //'browserstack.user' : 'user',
        //'browserstack.key' : 'key'

    },

    /*
     multiCapabilities: [
     {
     'browserName': 'firefox'
     },
     {
     'browserName': 'chrome'
     }
     ],
     */

    chromeDriver: 'node_modules/chromedriver/lib/chromedriver/chromedriver',

    seleniumServerJar: 'node_modules/selenium-wrapper/lib/selenium-server-standalone-2.45.0.jar',

    specs: ['app/tests/e2e/emptyNgAppE2e.js'],

    framework: 'jasmine',

    maxSessions: 1,

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        isVerbose:true
    },

    onPrepare: function() {
        require('jasmine-reporters');
        var capsPromise = browser.getCapabilities();
        capsPromise.then(function(caps){
            var browserName = caps.caps_.browserName.toUpperCase();
            var browserVersion = caps.caps_.version;
            var prePendStr = browserName + "-" + browserVersion + "-";
            jasmine.getEnv().addReporter(
                new jasmine.JUnitXmlReporter('target/surefire-reports/e2e', true, true, prePendStr));
        });
    }
};