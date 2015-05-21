/**
 * @ngdoc filter
 * @name emptyNgApp.filter:ps
 * @author Marius Bakowski  <marius.bakowski@flavia-it.de>
 * @author  AZDirect  <azdirect@allianz.it>
 * @returns {Object} Instance of given Filter
 */

'use strict';

angular.module('emptyNgApp')
    .filter('ps', function() {
        return function(text) {
            return Math.round(text * 1.3596216173039);
        };
    });