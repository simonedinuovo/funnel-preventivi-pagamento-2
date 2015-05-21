/**
 * @ngdoc service
 * @name emptyNgApp.factory:quorteService
 * @author  AZDirect  <azdirect@allianz.it>
 * @description Serves the calculated quote for the quote view
 * @requires $http
 * @requires $log
 * @requires $q
 * @requires $window
 * @requires $filter
 * @returns {Object} Instance of given Service
 */

'use strict';

angular.module('emptyNgApp')
    .factory('quoteService', function ($http, $q, $log, $window, $filter) {
        var quoteCache = {
            age: 18,
            city: "NY",
            vehicle: "Small",
            power: 35

        };
        return {
            /**
             * @ngdoc method
             * @name setQuoteData
             * @methodOf emptyNgApp.factory:quorteService
             * @description Sets the quote data, to keep it in memory
             * @param {Object} quoteData Information of the user input
             */
            setQuoteData: function(quoteData){
                quoteCache = quoteData;
            },
            /**
             * @ngdoc method
             * @name getQuoteData
             * @methodOf emptyNgApp.factory:quorteService
             * @description Returns the quote data object from memory
             * @returns {Object} quoteData from memory
             */
            getQuoteData: function () {
                return quoteCache;
            },
            /**
             * @ngdoc method
             * @name getQuote
             * @methodOf emptyNgApp.factory:quorteService
             * @description Requests a quote with the given user input
             * @returns {Promise} The quoteData promise
             */
            getQuote: function () {
                var deferred = $q.defer();
                $http.post('rest-service/doQuote', quoteCache).success(function (data) {
                    if(data.result && data.result.quote){
                        deferred.resolve(data.result.quote);
                    } else {
                        deferred.reject($window.alert($filter('translate')('QUOTE_SERVICE_UNAVAILABLE')));
                    }
                }).error(function (data, status, headers, config) {
                    $log.error(data);
                    $log.error(status);
                    $log.error(headers);
                    $log.error(config);
                    deferred.reject($window.alert($filter('translate')('QUOTE_SERVICE_NO_QUOTE')));
                });
                return deferred.promise;
            }
        };
    });