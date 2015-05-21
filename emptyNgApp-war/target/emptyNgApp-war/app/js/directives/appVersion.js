/**
 * @ngdoc directive
 * @name emptyNgApp.directive:appVersion
 * @author  AZDirect  <azdirect@allianz.it>
 * @description Adds a text to a elemt
 * @restrict A
 * @returns {Object} Instance of given Directive
 */

'use strict';

angular.module('emptyNgApp')
    .directive('appVersion', function() {
        return {
            restrict: 'A',
            link: function(scope, elem, attr){
                elem.append(attr.appVersion);
            }
        };
    });
