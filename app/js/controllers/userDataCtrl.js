/**
 * @ngdoc controller
 * @name emptyNgApp.controller:userDataCtrl
 * @author  AZDirect  <azdirect@allianz.it>
 * @description Creates the controller for the quote view
 * @requires $scope
 * @requires $location
 * @requires quoteService
 * @param {Object} cities Available cities form the REST service
 */

'use strict';

angular.module('emptyNgApp')
    .controller('userDataCtrl', function($scope, cities, $location, quoteService) {
        $("#age").popover({content:"Please enter your age (18-99)", trigger:'manual'});
        $("#city").popover({content:"Please select a city", trigger:'manual'});
        $("#vehicle").popover({content:"Please select a vehicle", trigger:'manual'});
        $("#power").popover({content:"Please set the power of your vehicle", trigger:'manual'});

        $scope.error = function(id){
            if($scope.quoteForm[id].$invalid){
                $("#" + id).popover('show');
            } else{
                $("#" + id).popover('hide');
            }
        };

        $scope.quote = quoteService.getQuoteData();
        $scope.cities = cities;

        $scope.vehicles = [
            {value: "Small", text: 'Small'},
            {value: "Medium", text: 'Medium'},
            {value: "Upper", text: 'Upper'}
        ];

        $scope.quoteRequest = function(){
            if(!$scope.quoteForm.$invalid){
                quoteService.setQuoteData($scope.quote);
                $location.path("/quote");
            }
        };
    });




