angular.
module('azDirectCore.payloadFactoryModule', [])

.factory('payloadFactory', ['$log', function($log) {


	return function (licensePlateNumber, dateOfBirth, socialLoginFlag) {
		if (socialLoginFlag == undefined) { socialLoginFlag = "N"; }
		else {
			if (socialLoginFlag) {
				socialLoginFlag = "S";
			}
			else {
				socialLoginFlag = "N";
			}
		}
		$log.log("<payloadFactory>: "+dateOfBirth+", "+socialLoginFlag+", "+licensePlateNumber);
		return {
			"payload": {
				"person": {
					"dateOfBirth": dateOfBirth,
					"socialLoginFlag": socialLoginFlag
				},
				"vehicle": {
					"licensePlateNumber": licensePlateNumber
				}
			}
		};

	};
 }]);
