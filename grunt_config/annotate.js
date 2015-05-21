/**
 * @author  AZDirect  <azdirect@allianz.it>
 * @desc    this grunt task add AngularJS dependency injection annotations.
 * @example
 * angular.module('emptyNgApp')
 *  .controller('quoteCtrl', ['$scope', '$location', 'quote', function($scope, $location, quote) {
 *      $scope.quote = quote;
 *      $scope.modData = function () {
 *           $location.path("/");
 *      };
 *  }]);
 */

module.exports = function(options, grunt) {
    grunt.loadNpmTasks("grunt-ng-annotate");

    var paths = options.paths;

    return {
    'emptyNgApp': {
            files: [
                {
                    expand: true,
                    src: "js/**/*.js",
                    dest: "" + paths.dist + "/annotated",
                    cwd: paths.app
                }
            ]
        }
    };
};