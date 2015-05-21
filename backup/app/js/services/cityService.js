/**
 * @ngdoc service
 * @name emptyNgApp.factory:cityService
 * @author  AZDirect  <azdirect@allianz.it>
 * @description Serves the cities for the userData form
 * @requires $http
 * @requires $log
 * @requires $q
 * @requires $window
 * @requires $filter
 * @returns {Object} Instance of given Service
 */

'use strict';

angular.module('emptyNgApp')
    .factory('cityService', function($http, $log, $q, $window, $filter) {
        return {
            /**
             * @ngdoc method
             * @name getCities
             * @methodOf emptyNgApp.factory:cityService
             * @description Calls the REST backend for cities, and handles request errors
             * @returns {Promise} The cities promise
             */
            getCities: function() {
                var deferred = $q.defer();
                $http.get('rest-service/cities').success(function (data) {
                    if(data.result && data.result.cities){
                        deferred.resolve(data.result.cities);
                    } else {
                        deferred.reject($window.alert($filter('translate')('CITY_SERVICE_NO_CITIES')));
                    }
                }).error(function (data, status, headers, config) {
                    $log.error(data);
                    $log.error(status);
                    $log.error(headers);
                    $log.error(config);
                    deferred.reject($window.alert($filter('translate')('CITY_SERVICE_UNAVAILABLE')));
                });
                return deferred.promise;
            }
        };
    });