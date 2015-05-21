/**
 * @author  AZDirect  <azdirect@allianz.it>
 * @desc    this function will be automaticly append to the angular object in dev mode,
 *          you can use it to mock your backend, to develop without a backend, or for testing.
 */

(function (ng) {
    'use strict';

    // default cities for quoteForm will be returned by cityService
    var cities = {
        "result": {
            "cities": [
                {
                    "value": "NY",
                    "text": "New York"
                },
                {
                    "value": "Rio",
                    "text": "Rio"
                },
                {
                    "value": "Tokyo",
                    "text": "Tokyo"
                }
            ]
        }
    },

    quote = {"result": {"quote": "13.37"}}; //default quote, will be returned by quoteService after doQuote was called

    ng.module('emptyNgApp')
        .config(function($provide) {
            $provide.decorator('$httpBackend', ng.mock.e2e.$httpBackendDecorator);
        })
        .run(function($httpBackend) {
            $httpBackend.whenGET('rest-service/cities').respond(cities);
            $httpBackend.whenPOST('rest-service/doQuote').respond(quote);

            // you need to pass through all not mocked rest calls, otherwise you will get a error
            $httpBackend.whenGET(/.*/).passThrough();
            $httpBackend.whenPOST(/.*/).passThrough();
            $httpBackend.whenDELETE(/.*/).passThrough();
            $httpBackend.whenPUT(/.*/).passThrough();
        });
})(angular);