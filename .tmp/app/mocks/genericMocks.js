/**
 * @author  AZDirect  <azdirect@allianz.it>
 * @desc    this function will be automaticly append to the angular object in dev mode,
 *          you can use it to mock your backend, to develop without a backend, or for testing.
 */

(function (ng) {
    'use strict';
	ng.module('emptyNgApp')
        .config(function($provide) {
            $provide.decorator('$httpBackend', ng.mock.e2e.$httpBackendDecorator);
        })
        .run(function($httpBackend,$http) {

			jQuery.ajax({
				url:'app/mocks/configMocks.json',
				success: function(result) {

					for(var index in result.mocks)
					{
						if(result.mocks[index].enabled)
						{
							jQuery.ajax({
								url: result.mocks[index].file,
								success: function (resultMocked) {
									if (resultMocked) {
										$httpBackend["when" + result.mocks[index].method](new RegExp(result.mocks[index].match)).respond(resultMocked);
										console.log(result.mocks[index].file + " moked up.");
									}
								},
								async: false
							});
						}
					}
				},
				async:   false
			});

            // you need to pass through all not mocked rest calls, otherwise you will get a error
			$httpBackend.whenGET(/.*/).passThrough();
            $httpBackend.whenPOST(/.*/).passThrough();
            $httpBackend.whenDELETE(/.*/).passThrough();
            $httpBackend.whenPUT(/.*/).passThrough();
        });
})(angular);



/**
 *
 *
 (function (ng) {
    'use strict';
	ng.module('azDirectITQUOTEOffer')
        .config(function($provide) {
            $provide.decorator('$httpBackend', ng.mock.e2e.$httpBackendDecorator);
        })
        .run(function($httpBackend,$http) {
			$http.get("app/mocks/config/dotConfig/log4javascript.json").then(function(config)
			{
				$httpBackend.whenGET(/(.*\/)?log4javascript\.json/).respond(config.data);
				console.log("log4javascript.json moked up.");

			}).then(function(){
				$http.get("app/mocks/config/dotConfig/technicalHeader.json").then(function(config)
				{
					$httpBackend.whenGET(/(.*\/)?technicalHeader\.json/).respond(config.data);
					console.log("technicalHeader.json moked up.");

				});
			}).then(function() {
				$http.get("app/mocks/config/dotConfig/configServices.json").then(function (config) {
					$httpBackend.whenGET(/(.*\/)?configServices\.json/).respond(config.data);
					console.log("configServices.json moked up.");

				});
			}).then(function(){
				// you need to pass through all not mocked rest calls, otherwise you will get a error
				$httpBackend.whenGET(/.* /).passThrough();
				$httpBackend.whenPOST(/.* /).passThrough();
				$httpBackend.whenDELETE(/.* /).passThrough();
				$httpBackend.whenPUT(/.* /).passThrough();
			});
		});
})(angular);
 */
