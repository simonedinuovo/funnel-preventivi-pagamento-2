/**
 * @ngdoc overview
 * @name azDirectCore.validationModule
 * @description Angular Module containing all validation directives.
 */
var app = angular.module('azDirectCore.validationModule',[]);


/**
 * @ngdoc directive
 * @name azDirectCore.validationModule.directive:inputDate
 * @element input-date
 * @restrict E
 * @replace true
 * @requires azDirectCore.validationModule.validationFactory
 * @requires azDirectCore.validationModule.dateDiff
 * @requires $http
 * @requires $q
 * @requires azLog
 *
 * @description input directive
 */
app.directive('inputDate',['validationFactory','dateDiff','$http','$q', 'azLog',
					function(validationFactory, dateDiff, $http, $q, azLog )
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
                'ng-pattern' : 'ng-pattern',
                'placeholder' : 'placeholder',
                'name' : 'name',
                'id' : 'id',
                'value' : 'value',
                'maxlength' : 'maxlength',
                'ng-model' : 'bindTo',
                "ng-model-options" : "ngModelOptions",
                'ng-lang' : 'lang',
                "data-datepicker" : "datepicker",
                "model-bind" : "modelBind"
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
            if(validationFactory.validateDate[$attrs.lang] !== undefined)
            {
                jQuery.extend(customAttributes, validationFactory.validateDate[$attrs.lang].config)

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

                $element.removeAttr("id");
                $element.removeAttr("name");
                $element.removeAttr("value");
                $element.removeAttr("type");
                $element.removeAttr("style");
				$element.removeAttr("class");
				$element.removeAttr("tabindex");
                $element.removeAttr("data-datepicker");
                $element.removeAttr("model-bind");
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


                    //Here we add a custom asynchronous Validation by function
                    if (validationFactory.validateDate[$attrs.lang] !== undefined &&
                        validationFactory.validateDate[$attrs.lang].asyncValidation !== undefined &&
                        formCtrl !== undefined && formCtrl[$attrs.name].$asyncValidators !== undefined) {
                        // add a parser that will process each time the value is
                        // parsed into the model when the user updates it.

                        var customAsyncValidation = validationFactory.validateDate[$attrs.lang].asyncValidation;
                        for (var validationName in customAsyncValidation) {
                            formCtrl[$attrs.name].$asyncValidators[validationName] = function (modelValue, viewValue) {
                                // test and set the validity after update.
                                var valid = customAsyncValidation[validationName]($scope, $http, $q, modelValue);

                                azLog.info(validationName + "(" + modelValue + ") " + (valid ? "is valid" : "is invalid"));
                                // if it's valid, return the value to the model,
                                // otherwise return undefined.
                                return valid;
                            };
                        }
                    }

                    //Here we add a custom validation by function
                    if (validationFactory.validateDate[$attrs.lang] !== undefined &&
                        validationFactory.validateDate[$attrs.lang].validation !== undefined &&
                        formCtrl !== undefined && formCtrl[$attrs.name].$validators !== undefined) {
                        // add a parser that will process each time the value is
                        // parsed into the model when the user updates it.

                        var customValidation = validationFactory.validateDate[$attrs.lang].validation;
                        for (var validationName in customValidation) {
                            formCtrl[$attrs.name].$validators[validationName] = function (modelValue, viewValue) {
                                // test and set the validity after update.
                                var valid = customValidation[validationName]($scope, $http, modelValue);
                                azLog.info(validationName + "(" + modelValue + ") " + (valid ? "is valid" : "is invalid"));
                                // if it's valid, return the value to the model,
                                // otherwise return undefined.
                                return valid;
                            };
                        }
                    }
                    //setting validation, date MUS BE BIGGER THAN ( ATTRIBUTES IN DAYS )
                    if($attrs.max !== undefined)
                    {
                        formCtrl[$attrs.name].$validators.invalidMax = function (modelValue, viewValue)
                        {
                            //validation enabled just if there are no error OR JUST ONE ( TOOSMALL error )
                            /*if(Object.keys(formCtrl[$attrs.name]['$error']).length == 0 ||
                             (Object.keys(formCtrl[$attrs.name]['$error']).length == 1
                             && Object.keys(formCtrl[$attrs.name]['$error']).indexOf('tooSmall') != -1))*/

                            // test and set the validity after update.
                            var isBiggerThen = function(dateToCompare, times)
                            {
                                if( dateToCompare === undefined )
                                    return;
                                var today = new Date();
                                var equalsOperator = false;
                                if(times.substr(0,1) == "=")
                                {
                                    equalsOperator = true;
                                    times =  times.substr(1,times.length);
                                }
                                var method = (!angular.isNumber(times.substr(times.length-1,1)) ? times.substr(times.length-1,1) : false);
                                var times =  times.substr(0,times.length-1);
                                azLog.info("isBiggerThen - DATE : "+dateToCompare+" TODAY : "+today+ " ");
                                switch (method.toLowerCase())
                                {
                                    case "y": {
                                        var diff = dateDiff.inYears(today,dateToCompare);
                                        azLog.info("isBiggerThen - DIFF : " +diff + " YEARS : " + times);
                                        break;
                                    }
                                    case "m": {
                                        var diff = dateDiff.inMonths(today,dateToCompare);
                                        azLog.info("isBiggerThen - DIFF : " +diff + " MONTHS : " + times);
                                        break;
                                    }
                                    default: {
                                        var diff = dateDiff.inDays(today,dateToCompare);
                                        azLog.info("isBiggerThen - DIFF : " +diff + " DAYS : " + times);
                                        break;
                                    }
                                }
                                if(equalsOperator)
                                    return diff<=times;
                                else
                                    return diff<times
                            };

                            var valid = isBiggerThen(validationFactory.validateDate[$attrs.lang].parseDate(modelValue),$attrs.max);
                            azLog.info("invalidMax (" + modelValue + ") " + (valid ? "is valid" : "is invalid"));
                            return valid;
                        };
                    }

                    //setting validation, date MUS BE SMALLER THAN ( ATTRIBUTES IN DAYS )
                    if($attrs.min !== undefined)
                    {
                        formCtrl[$attrs.name].$validators.invalidMin = function (modelValue, viewValue)
                        {
                            //validation enabled just if there are no error OR JUST ONE ( TOOBIG error )
                            /*if(Object.keys(formCtrl[$attrs.name]['$error']).length == 0 ||
                             (Object.keys(formCtrl[$attrs.name]['$error']).length == 1
                             && Object.keys(formCtrl[$attrs.name]['$error']).indexOf('tooBig') != -1))*/

                            // test and set the validity after update.
                            var isSmallerThen = function(dateToCompare, times)
                            {
                                var today = new Date();
                                var equalsOperator = false;
                                if(times.substr(0,1) == "=")
                                {
                                    equalsOperator = true;
                                    times =  times.substr(1,times.length);
                                }
                                var method = (!angular.isNumber(times.substr(times.length-1,1)) ? times.substr(times.length-1,1) : false);
                                times =  times.substr(0,times.length-1);
                                azLog.info("isSmallerThen - TODAY : "+today+ " DATE : "+dateToCompare);
                                switch (method.toLowerCase())
                                {
                                    case "y": {
                                        var diff = dateDiff.inYears(dateToCompare,today)
                                        azLog.info("isSmallerThen - DIFF : " +diff + " YEARS : " + times);
                                        break;
                                    }
                                    case "m": {
                                        var diff = dateDiff.inMonths(dateToCompare,today)
                                        azLog.info("isSmallerThen - DIFF : " +diff + " MONTHS : " + times);
                                        break;
                                    }
                                    default: {
                                        var diff = dateDiff.inDays(dateToCompare,today)
                                        azLog.info("isSmallerThen - DIFF : " +diff + " DAYS : " + times);
                                        break;
                                    }
                                }
                                //azLog.info("TODAY : "+today+ " DATE : "+dateToCompare);
                                //azLog.info("DIFF : " +diff + " DAYS : " + days);
                                if(equalsOperator)
                                    return diff<=times;
                                else
                                    return diff<times
                            }

                            var valid = isSmallerThen(validationFactory.validateDate[$attrs.lang].parseDate(modelValue),$attrs.min);
                            azLog.info("invalidMin (" + modelValue + ") " + (valid ? "is valid" : "is invalid"));
                            return valid;
                        };
                    }
                };
            }
        }
    };
}]);
