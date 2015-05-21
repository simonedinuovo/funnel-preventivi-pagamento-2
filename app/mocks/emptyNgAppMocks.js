/**
 * @author  AZDirect  <azdirect@allianz.it>
 * @desc    this function will be automaticly append to the angular object in dev mode,
 *          you can use it to mock your backend, to develop without a backend, or for testing.
 */

//(function (ng) {
//    'use strict';
//
//    // default cities for quoteForm will be returned by cityService
//    var cities = {
//        "result": {
//            "cities": [
//                {
//                    "value": "NY",
//                    "text": "New York"
//                },
//                {
//                    "value": "Rio",
//                    "text": "Rio"
//                },
//                {
//                    "value": "Tokyo",
//                    "text": "Tokyo"
//                }
//            ]
//        }
//    },
//
//     quote = {"result": {"quote": "13.37"}}; //default quote, will be returned by quoteService after doQuote was called
//
//    var result = {
//        "pippo": 1302910291
//    };
//
//    var dataSend = {
//        "resultCode" : 0,
//        "data" : null
//    };
//
//    ng.module('emptyNgApp')
//        .config(function($provide) {
//            $provide.decorator('$httpBackend', ng.mock.e2e.$httpBackendDecorator);
//        })
//        .run(function($httpBackend) {
//            $httpBackend.whenGET('rest-service/cities').respond(cities);
//            $httpBackend.whenPOST('rest-service/doQuote').respond(quote);
//            $httpBackend.whenPOST("oneweb/ajax/aspro/az-direct-IT-CISL-dispatcher-war/restservice/api/applicationlog")
//                .respond(function(method, url, data) {
//                    console.log("method,url,data", method,url,data);
//                    return [result];
//                });
//
//            $httpBackend.whenPOST("http://192.168.33.10:8080/oneweb/ajax/aspro/az-direct-POC-it-cisl-dispatcher-war/extquotations/superfastquote")
//                .respond(function(method, url, data) {
//                    console.log("method,url,data", method,url,data);
//                    dataSend.data = data;
//                    console.log("this", this);
//                    return [dataSend];
//                })
//            // you need to pass through all not mocked rest calls, otherwise you will get a error
//            $httpBackend.whenGET(/.*/).passThrough();
//            $httpBackend.whenPOST(/.*/).passThrough();
//            $httpBackend.whenDELETE(/.*/).passThrough();
//            $httpBackend.whenPUT(/.*/).passThrough();
//        });
//})(angular);
