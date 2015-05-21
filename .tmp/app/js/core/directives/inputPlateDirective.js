

/**
 * @ngdoc overview
 * @name azDirectCore.validationModule
 * @description Angular Module containing all validation directives.
 */
var app = angular.module('azDirectCore.validationModule');


/**
 * @ngdoc directive
 * @name azDirectCore.validationModule.directive:inputPlate
 * @element input-plate
 * @restrict E
 * @replace true
 * @requires azDirectCore.validationModule.validationFactory
 * @requires azDirectCore.validationModule.validationLabel
 * @requires $http
 * @requires $q
 * @requires azLog
 *
 * @description input directive, generates an input tag for plates with specific validation attached.
 *
 * <div class="alert alert-warning">
 * **Note** : The input custom directive must be included into a parent &#60;form&#62;, otherwise will not work as
 * expected.
 * </div>
 *
 * # How use it
 *
 * When you want include a input tag for plate validation , you can simply include the `InputPlate` directive and edit
 * in the {@link https://docs.angularjs.org/api/ng/directive/ngModelOptions `validationFactory`} the validation for your country ( normal, <strike>special</strike>, bike, moped )
 * and then use it performing the validation rules in the attribute **validationType**.
 *
 * <div class="alert alert-warning">
 * **Remember** : the validationFactory must be verified according with you country plate rules. You can add a regular expression,
 * or make more complex validation by calling a service. See more questions in the {@link azDirectCore.validationModule.validationFactory#Validation `validationFactory.validation`}
 * </div>
 *
 <pre>
 ...
 holland : {
         config : {
             'maxlength': '7',
             'placeholder': "49TPLT"
             'ng-pattern' : "...{PATTERN}..."
         },
         validation : { // array of custom validation

             "formatPlate": function (value) {
                 // Custom synchronous
                 return true;
             }
         },
         asyncValidation : { // array of custom validation

             "serviceValidation": function (value) {
                 // Custom asynchronous
                 return true;
             }
         }
   }
 ...
 </pre>
 *
 * As you can see, there is a new validation rules, and I just perform to ** inputPlate ** directive by attribute validationType
 *
 <pre>
 ...
 <input-plate    name="plate"
                 id="plate"
                 bind-to="plate.autoPlate"
                 required
                 class="ipt ipt_large input_car_plate form-control"
                 validation-type="holland"
                 error-class="error "
                 default-error-class="ng-hide">
     <validation key="required" error-message="errorMessage.plate.required"></validation>
     <validation key="pattern" error-message="errorMessage.plate.invalid"></validation>
     <validation key="formatPlate" > Invalid format Plate</validation>
     <validation key="serviceValidation"> Plate not valid for the service!</validation>
     <label-content>
        <label style="height: 13px;" for="form_auto_plate">Auto Plate</label>
     </label-content>
 </input-plate>
 ...
 </pre>
 *
 *
 *
 * # HTML Structure
 *
 * If we give a look into HTML rendered by above directive we can see what happens during the compile process.
 * *Some attribute of input-plate has been moved from root tag to input tag ( name, id, class) and more over
 *  also style, value and type would be moved if present from Root tag to input tag.
 * *All content of <label-content> has been placed close to the input tag
 * *The <validation> element has been elaborated in a list of error contents take from key error-message and wrapped
 *  text and passed to ng-repeat element to print it as a list of &#60;div&#62; with functio HasError(key) on ng-hide
 *  directive( this will able the DIV element to appear and desapper by error presence )
 *
 <pre>
 <input-plate bind-to="toQuote.plate"
              validation-type="holland"
              error-class="error"
              class="ng-scope">
     <div>
         <div style="display: inline-block;">
             <label style="height: 13px;" for="plate">Auto Plate</label>
             <input  required=""
                     name="plate"
                     id="plate"
                     ng-model="plate.autoPlate"
                     type="text"
                     placeholder="49TPLT"
                     maxlength="7"
                     ng-pattern="...{PATTERN}..."
                     class="ipt ipt_large input_car_plate form-control">
         </div>
         <div>
             <!-- ngRepeat: (key, text) in validators -->
             <div ng-repeat="(key, text) in validators" class="ng-hide" ng-bind="text">Plate is not valid.</div>
             <!-- end ngRepeat: (key, text) in validators -->
             <div ng-repeat="(key, text) in validators" class="ng-hide" ng-bind="text">Insert a plate.</div>
             <!-- end ngRepeat: (key, text) in validators -->
             <div ng-repeat="(key, text) in validators" class="ng-hide" ng-bind="text"> Invalid format Plate</div>
             <!-- end ngRepeat: (key, text) in validators -->
             <div ng-repeat="(key, text) in validators" class="ng-hide" ng-bind="text"> Plate not valid for the service!</div>
             <!-- end ngRepeat: (key, text) in validators -->
        </div>
     </div>
 </input-plate>
</pre>
 *
 * #Validation
 *
 * You can pass `<validation>` label to specify the key of properties to retrive in error-message attribute
 * <pre>
     <validation key="required" error-message="errorMessage.plate.required"></validation>
   </pre>
 *
 * or explicitly wrapped in the tag
 *
 * <pre>
      <validation key="">No binded message</validation>
   </pre>
 *
 * <div class="alert alert-warning">
 * **Note** : If you provide the error-message key the directive will ignore everything wrapped by the TAG
 *
 * **Also** : You cannot provide an expression as {{properties.name}} this will not evaluated by Angular
 * because the directive is in compile life cycle, so any expression will be ignored.
 * </div>
 *
 * You can also disable the `RealTimeValidation` by adding a parameter to the parent &#60;form&#62;:
 * ```js
 * <form action="" real-time-validation="false" ></form>
 * ```
 *
 * So the validation will be present only after the first submit of form.
 *
 *
 * @usage
 *
 <input-plate    name=""
                 id=""
                 bind-to=""
                 validation-type=""
                 ng-model-options=""
                 [maxlength=""]
                 [required]
                 [class=""]
                 [error-class=""]
                 [default-error-class=""]>
     <validation key="required" error-message="errormessage.plate.required"></validation>
     <validation key="pattern">No binded message</validation>
     <validation key="customValidation">Another no binded message</validation>
     <label-content>
        <label style="height: 13px;" for="nameOfInput">Some nice Text</label>
     </label-content>
 </input-plate>

 *
 *


 * @param {string} <b>name</b> Property name of the tag input that will be published.
 * @param {string} <b>id</b> Property ID of the tag input that will be published.
 * @param {string} <b>bind-to</b> Assignable angular expression to data-bind to
 * @param {string} <b>validation-type</b> Type of Plate to publish, it can be choosed between :
 * <ul>
 *     <li><b>normal</b> : Italian plate</li>
 *     <li><strike><b>special</b> : Special plate</strike></li>
 *     <li><b>bike</b> : Bike plate</li>
 *     <li><b>moped</b> : Moped plate</li>
 * </ul>
 * @param {object} <b>ng-model-options</b> The {@link ngModelOptions `ng-model-options`} attribute is a AngularJS directive
 * allows tuning how model updates are done.
 * @param {number=} <b>maxlength</b> This will limit the input filling to custom value. By default will be setted by
 * validationFactory configuration.
 * @param {string=} <b>required</b> This will make the input tag required and could generate the "required" error.
 * @param {string=} <b>class</b> This is the css Class that will be assigned to the input element.
 * @param {string=} <b>error-class</b> The css Class that will be assigned to the error
 * label whenever the error key `MATCHS`. By default will be empty.
 * @param {string=} <b>default-error-class</b> The css Class that will be assigned to the error
 * label whenever the error key `DOESNT MATCH`. By default will be <b>ng-hide</b>
 *
 *
 *
 *
 */

app.directive('inputPlate',['validationFactory','$http','$q', 'azLog',
    function(validationFactory, $http, $q, azLog)
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
                'placeholder' : 'placeholder',
                'name' : 'name',
                'id' : 'id',
                'value' : 'value',
                'maxlength' : 'maxlength',
                'ng-model' : 'bindTo',
                "ng-model-options" : "ngModelOptions"
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
            if(validationFactory.validatePlate[$attrs.validationType] !== undefined)
            {
                jQuery.extend(customAttributes, validationFactory.validatePlate[$attrs.validationType].config)

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
                    if (validationFactory.validatePlate[$attrs.validationType] !== undefined &&
                        validationFactory.validatePlate[$attrs.validationType].asyncValidation !== undefined &&
                        formCtrl !== undefined && formCtrl[$attrs.name].$asyncValidators !== undefined) {
                        // add a parser that will process each time the value is
                        // parsed into the model when the user updates it.

                        var customAsyncValidation = validationFactory.validatePlate[$attrs.validationType].asyncValidation;
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
                    if (validationFactory.validatePlate[$attrs.validationType] !== undefined &&
                        validationFactory.validatePlate[$attrs.validationType].validation !== undefined &&
                        formCtrl !== undefined && formCtrl[$attrs.name].$validators !== undefined) {
                        // add a parser that will process each time the value is
                        // parsed into the model when the user updates it.
                        var customValidation = validationFactory.validatePlate[$attrs.validationType].validation;
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
                };
            }
        }
    };
}]);
