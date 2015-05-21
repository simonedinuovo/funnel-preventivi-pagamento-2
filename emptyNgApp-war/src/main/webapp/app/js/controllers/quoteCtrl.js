/**
 * @ngdoc controller
 * @name emptyNgApp.controller:quoteCtrl
 * @author  AZDirect  <azdirect@allianz.it>
 * @description Creates the controller for the quote view
 * @requires $scope
 * @requires $location
 * @param {Number} quote The quote which is returned form the quoteService
 * @param {Object} $scope The scope of the controller, used to access the view
 * @param {Object} $location Gives you access to the location object (used to manipulate the current path)
 */

'use strict';

angular.module('emptyNgApp')
    .controller('quoteCtrl', function($scope, $location, quote) {
        $scope.quote = quote;

        $scope.modData = function () {
            $location.path("/");
        };
    });
