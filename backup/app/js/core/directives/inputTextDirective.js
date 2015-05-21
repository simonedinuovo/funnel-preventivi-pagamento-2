/**
 * @ngdoc overview
 * @name azDirectCore.validationModule
 * @description Angular Module containing all validation directives.
 */
var app = angular.module('azDirectCore.validationModule');


/**
 * @ngdoc directive
 * @name azDirectCore.validationModule.directive:inputText
 * @element input-text
 * @restrict E
 * @replace true
 * @requires azDirectCore.validationModule.validationFactory
 * @requires azDirectCore.validationModule.validationLabel
 * @requires $http
 * @requires $q
 * @requires azLog
 *
 * @description input directive, generates an input tag for plates with specific validation attached.
 */

app.directive('inputText',['validationFactory','$http',"$q", 'azLog',
	function(validationFactory,$http, $q, azLog)
	{
		return{
			restrict : 'E',
			replace : true,
			require : '^form',
			scope : true,
			compile : function($element, $attrs)
			{
				//All this Attributes will be moved from directive Tag to Input Tag
				var expectedInputAttrs =
				{
					'required' : 'required',
					'tabindex' : 'tabindex',
					'name' : 'name',
					'placeholder' : 'placeholder',
					'id' : 'id',
					'value' : 'value',
					'maxlength' : 'maxlength',
					'ng-model' : 'bindTo',
					"ng-model-options" : "ngModelOptions",
					"data-autocomplete-comune" : "autocompleteComune"
					//more Attributes to implements
				};
				//All this attribute will be added to input tag
				var customAttributes =
				{
					//'size' : "4"
					'type' : "text"
				};
				//customAttributes = validationFactory.validatePlate.normal();
				//I'm gona extends the validation object to validationObject Factory
				if(validationFactory.validateText[$attrs.validationType] !== undefined) {
					jQuery.extend(customAttributes, validationFactory.validateText[$attrs.validationType].config)

					//here I merge the class from tag's given class and validationFactory class
					if ($attrs.class !== undefined)
						customAttributes['class'] = customAttributes['class'] !== undefined ? customAttributes['class'] + " " + $attrs.class : $attrs.class;
					if ($attrs.style !== undefined)
						customAttributes['style'] = customAttributes['style'] !== undefined ? customAttributes['style'] + " " + $attrs.style : $attrs.style;
					//Extracting content from HTML
					var validationKeys = $element.find("validation");
					var presentValidationKeys = {};
					var inputName = $attrs.name;
					angular.forEach(validationKeys, function (validationKey) {
						validationKey = angular.element(validationKey);


						if(validationKey.attr("error-message") === undefined || validationKey.attr("error-message") == "")
							presentValidationKeys[validationKey.attr('key')] = validationKey.html();
						else
							presentValidationKeys[validationKey.attr('key')] = validationKey.attr("error-message");
					});
					//I'm gona remove the propertie from directive tag
					$element.removeAttr("id");
					$element.removeAttr("name");
					$element.removeAttr("value");
					$element.removeAttr("type");
					$element.removeAttr("style");
					$element.removeAttr("class");
					$element.removeAttr("tabindex");
					$element.removeAttr("data-autocomplete-comune");
					//I'm gona move attributes from Parent Directive TAG to Input Element
					var attrsRequired = "";
					for (var i in expectedInputAttrs) {
						if ($attrs[expectedInputAttrs[i]] !== undefined) {
							//azLog.info( ' ' + i + '="' + $attrs[expectedInputAttrs[i]] + '"');
							attrsRequired += ' ' + i + '="' + $attrs[expectedInputAttrs[i]] + '"';
						}
						$element.removeAttr(i);
					}
					//I'm gona add customAttributes
					for (var i in customAttributes) {
						//azLog.info( ' ' + i + '="' + customAttributes[i] + '"');
						attrsRequired += ' ' + i + '="' + customAttributes[i] + '"';
					}
					//azLog.info("attrsRequired : "+attrsRequired);
					var elementHtml =   '' + ($element.find("label-layout").html() !== undefined ? $element.find("label-layout").html() : "") + '\n' +
						'' + ($element.find("input-layout").html() !== undefined ? $element.find("input-layout").html() : "").replace(/(<input>|<\/input>|<input\/>)/gi,'<input  ' + attrsRequired + ' />') + '\n' +
						'' + ($element.find("error-layout").html() !== undefined ? $element.find("error-layout").html() : "");
					$element.html(elementHtml);


					return function ($scope, $element, $attrs, formCtrl) {
						$scope.formName = $element.parents("form").attr("name");
						$scope.validators = angular.copy(presentValidationKeys);


						/**
						 *
						 * @param key Error key from validators List ( into the ng-repet of validator take error key as required, pattern, etc. )
						 * @returns {boolean} true or false depending by $error array in the attribute
						 */
						$scope.hasError = function (key)
						{
							/**
							 * There are four cases of value :
							 * *real-time-validate is not present so isValidationInRealtime will be <b>true</b>
							 * *real-time-validate is present bat has invalid value, so isValidationInRealtime will be <b>true</b>
							 * *real-time-validate is present and has true value, so isValidationInRealtime will be <b>true</b>
							 * *real-time-validate is present and has false value, so isValidationInRealtime will be <b>false</b>
							 *
							 * @type {boolean} this rappresents the validation method if can be in realitime from begin.
							 */

							var isValidationInRealtime = ($element.parents("form[real-time-validate]").attr("real-time-validate") === undefined ?
								true : $element.parents("form[real-time-validate]").attr("real-time-validate").toLowerCase() != "false");

							return ((isValidationInRealtime | $scope[$scope.formName].$submitted ) && $scope[$scope.formName][$attrs.name]['$error'][key] ? ($attrs.errorClass !== undefined ? $attrs.errorClass : "") : ($attrs.defaultErrorClass !== undefined ? $attrs.defaultErrorClass : "ng-hide"));

						};
						/**
						 * @returns {string} errorMessage from validators array,
						 * this will be the first error found in the $error array in the attribute
						 */
						$scope.getErrorMessage = function ()
						{
							/**
							 * There are four cases of value :
							 * *real-time-validate is not present so isValidationInRealtime will be <b>true</b>
							 * *real-time-validate is present bat has invalid value, so isValidationInRealtime will be <b>true</b>
							 * *real-time-validate is present and has true value, so isValidationInRealtime will be <b>true</b>
							 * *real-time-validate is present and has false value, so isValidationInRealtime will be <b>false</b>
							 *
							 * @type {boolean} this rappresents the validation method if can be in realitime from begin.
							 */

							var isValidationInRealtime = ($element.parents("form[real-time-validate]").attr("real-time-validate") === undefined ?
								true : $element.parents("form[real-time-validate]").attr("real-time-validate").toLowerCase() != "false");

							var errorMessage = function ()
							{
								for(var key in $scope[$scope.formName][$attrs.name]['$error'])
								{
									if($scope[$scope.formName][$attrs.name]['$error'][key])
										return ($scope.resarr !== undefined ? $scope.resarr[$scope.validators[key]] : $scope.validators[key]);
								}

							};

							return ((isValidationInRealtime | $scope[$scope.formName].$submitted ) ? errorMessage() : $attrs.placeholder);

						};

						//Here we add a custom validation by function
						if (validationFactory.validateText[$attrs.validationType] !== undefined &&
							validationFactory.validateText[$attrs.validationType].validation !== undefined &&
							formCtrl !== undefined && formCtrl[$attrs.name].$validators !== undefined) {
							azLog.info("custom validate function has been found. I'm gona register it. Controller : " + formCtrl.$name + " Model : " + $attrs.name);
							// add a parser that will process each time the value is
							// parsed into the model when the user updates it.

							var customValidation = validationFactory.validateText[$attrs.validationType].validation;
							for (var validationName in customValidation) {
								formCtrl[$attrs.name].$validators[validationName] = function (modelValue, viewValue) {
									// test and set the validity after update.

									var valid = false;
									if($attrs.validationType == "codFisc")
									{
										var date = validationFactory.validateDate[$attrs.cfBirthDateLang].parseDate($scope.$eval($attrs.cfBirthDate));
										if ( date === undefined ) return;
										var CFdata = {
											name : $scope.$eval($attrs.cfName),
											surname : $scope.$eval($attrs.cfSurname),
											sex : $scope.$eval($attrs.cfSex),
											day : date.getDate(),
											month : date.getMonth(),
											year : date.getFullYear(),
											codCatas : $scope.$eval($attrs.cfCodCatas),
											CF : modelValue
										};
										valid = customValidation[validationName]($scope, $http, CFdata);
									}
									else
									{
										valid = customValidation[validationName]($scope, $http, modelValue);
									}
									azLog.info(validationName + "(" + modelValue + ") " + (valid ? "is valid" : "is invalid"));
									// if it's valid, return the value to the model,
									// otherwise return undefined.
									return valid;
								};
							}
						}


						//Here we add a custom asynchronous Validation by function
						if (validationFactory.validateText[$attrs.validationType] !== undefined &&
							validationFactory.validateText[$attrs.validationType].asyncValidation !== undefined &&
							formCtrl !== undefined && formCtrl[$attrs.name].$asyncValidators !== undefined) {
							azLog.info("custom validate function has been found. I'm gona register it. Controller : " + formCtrl.$name + " Model : " + $attrs.name);
							// add a parser that will process each time the value is
							// parsed into the model when the user updates it.

							var customAsyncValidation = validationFactory.validateText[$attrs.validationType].asyncValidation;
							for (var validationName in customAsyncValidation) {
								formCtrl[$attrs.name].$asyncValidators[validationName] = function (modelValue, viewValue) {
									// test and set the validity after update.
									var valid = false;
									if($attrs.validationType == "codFisc")
									{

										var date = $scope.$eval($attrs.cfBirthDate);

										var CFdata = {
											name : $scope.$eval($attrs.cfName),
											surname : $scope.$eval($attrs.cfSurname),
											sex : $scope.$eval($attrs.cfSex),
											day : date.getDay(),
											month : date.getMonth(),
											year : date.getYear(),
											codCatas : $scope.$eval($attrs.cfCodCatas),
											CF : modelValue
										};
										valid = customAsyncValidation[validationName]($scope, $http, $q, CFdata);
									}
									else
									{
										valid = customAsyncValidation[validationName]($scope, $http, $q, modelValue);
									}
									azLog.info(validationName + "(" + modelValue + ") " + (valid ? "is valid" : "is invalid"));
									// if it's valid, return the value to the model,
									// otherwise return undefined.
									return valid;
								};
							}
						}
					};
				}
			}
		};
	}]);


