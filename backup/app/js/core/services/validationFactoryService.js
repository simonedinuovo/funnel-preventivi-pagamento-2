/*
 ------------------------------------------
 commento inserito per prova
 ------------------------------------------
 */
angular.module('azDirectCore.validationModule')

/**
 * @ngdoc service
 * @name azDirectCore.validationModule.validationFactory
 *
 * @requires azDirectCore.validationModule.fiscalCode
 *
 * @description The ValidationFactory contains the validation settings for all custom validation directive of module
 * {@link azDirectCore.validationModule `validationModule`}.
 * There are defineds validation rules of :
 * <ul>
 *     <li>
 *         Plate :
 *          <ul>
 *              <li>normal</li>
 *              <li><strike>special</strike></li>
 *              <li>bike</li>
 *              <li>moped</li>
 *          </ul>
 *     </li>
 *     <li>
 *         Date
 *          <ul>
 *              <li>it-IT</li>
 *              <li>en-GB</li>
 *              <li>en-US</li>
 *          </ul>
 *     </li>
 *     <li>
 *         Text
 *          <ul>
 *               <li>piva</li>
                 <li>username</li>
                 <li>password</li>
                 <li>alphanum</li>
                 <li>alpha</li>
                 <li>asyncValidation</li>
                 <li>email</li>
                 <li>number</li>
                 <li>cap</li>
                 <li>capEarthquake</li>
                 <li>address</li>
                 <li>name</li>
                 <li>companyName</li>
                 <li>codFisc</li>
 *          </ul>
 *     </li>
 * </ul>
 *
 * #Customized Validation
 *
 *
 * You can add more validation function synchronous or asynchronous. According with custom directive {@link azDirectCore.validationModule.directive:inputPlate inputPlate}
 * {@link azDirectCore.validationModule.directive:inputDate inputDate}
 * {@link azDirectCore.validationModule.directive:inputText inputText} the structure of validation rules must be :
 * <pre>
 *     ...
 *  validatePlate :// for inputPlate
 *  {
 *      validationType : // example normale, bike, moped etc..
 *      {
 *          config :
 *          {
 *
 *          },
 *          validation : // list of custom validation that will be execute Synchronous
 *          {
 *
 *          },
 *          asyncValidation :
 *          {
 *
 *          }
 *      }
 *  }
 *
 * </pre>
 *
 *
 * #Validation Settings
 *
 <pre>
 validatePlate :
 {
    normal :
    {
        config : {
            'maxlength': '7',
                //'size' : '12',
                'ng-pattern': '/^(([a-zA-Z]{2}\\s{0,}\\d{3}\\s{0,}[a-zA-Z]{2})|(([a-zA-Z]{2}|roma)\\s{0,}(\\d{5}|\\d{6})))$/i',
                'class': 'form-control',
                'placeholder': "AB123CD"
        }
    },
    special :
    {
        config : {
            'maxlength': '7',
                //'size' : '12',
                'placeholder': "AB12345"
        },
        validation : // array of custom validation
        {
            "formatPlate": function (value)
        {
            return true;
        }
        }
    },
    bike :
    {
        config : {
            'maxlength': '8',
                //'size' : '6',
                'placeholder': "AB123456"
        },
        validation :// array of custom validation
        {
            "formatPlate": function ($scope, $http, $value)
        {
            if($value === undefined)return false
            var pfx = $value.slice(0, 3).toUpperCase();
            if (pfx == 'RSM' || pfx == 'SCV') return true;
            var pattern = /(^)([a-zA-Z]{2} *\d{6}|[a-zA-Z]{2} *\d{5})($)/;
            return pattern.test($value);
        }
        }
    },
    moped :
    {
        config : {
            'maxlength': '6',
                //'size' : '6',
                'placeholder': "123456"
        },
        validation :// array of custom validation
        {
            "formatPlate" : function ($scope, $http, $value) {
                    if($value === undefined)return false
                    var pfx = $value.slice(0,3).toUpperCase();
                    if (pfx == 'RSM' || pfx == 'SCV') return true;
                    var pattern = /(^)([a-zA-Z0-9]{6})($)/;
                    return pattern.test($value);
            }
        }

    }
    },
    validateDate :
    {
        "it-IT" :
        {
            parseDate : function(dateString)
            {
                try
                {
                    //var pattern = /((\d{1})|(\d{2}))\/((\d{1})|(\d{2}))\/(\d{4})/;
                    //var matchedDate = dateString.match(pattern).slice(1);//just removing total Element
                    var matchedDate = dateString.split("/");
                    console.log(matchedDate[2]+" "+ (matchedDate[1]-1) +"  " +matchedDate[0]);
                    return new Date(matchedDate[2], matchedDate[1]-1, matchedDate[0]);
                }
                catch (e)
                {
                    console.error("Error while parsing date it-IT. Error :" +e);
                    return undefined;
                }
            },
            config : {
                'maxlength': '10',
                    //'size' : '6',
                    'placeholder': "dd/mm/yyyy",
                    'ng-pattern': '/^\\d\\d?\/\\d\\d?\/\\d\\d\\d\\d$/'
            },
            validation : {}
        },
        "en-GB" :
        {
            parseDate : function(dateString)
            {
                try
                {
                    //var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
                    //var matchedDate = dateString.match(pattern).slice(1);//just removing total Element
                    var matchedDate = dateString.split("/");
                    return new Date(matchedDate[2], matchedDate[0]-1, matchedDate[1]);
                }
                catch (e)
                {
                    console.error("Error while parsing date en-GB. Error :" + e);
                    return undefined;
                }
            },
            config : {
                'maxlength': '10',
                    //'size' : '6',
                    'placeholder': "mm/dd/yyyy",
                    'ng-pattern': '/^\\d\\d?\/\\d\\d?\/\\d\\d\\d\\d$/'
            },
            validation : {"test":function(){console.log("ahah");}}
        },
        "en-US" :
        {
            parseDate : function(dateString)
            {
                try
                {
                    //var pattern = /(\d{4})\/(\d{2})\/(\d{2})/;
                    //var matchedDate = dateString.match(pattern).slice(1);//just removing total Element
                    var matchedDate = dateString.split("/");
                    return new Date(matchedDate[0], matchedDate[2]-1, matchedDate[1]);
                }
                catch (e)
                {
                    console.error("Error while parsing date en-US. Error :" +e);
                    return undefined;
                }
            },
            config : {
                'maxlength': '10',
                    //'size' : '6',
                    'placeholder': "yyyy/dd/mm",
                    'ng-pattern': '/^\\d\\d\\d\\d\/\\d\\d?\/\\d\\d?$/'
            },
            validation : {}
        }
    },
    validateText :
    {
        piva :
        {
            config :
            {
                'maxlength': '11'
            },
            asyncValidation :
            {
                "pivaValidate" : function ($scope, $http, $q,  $value)
            {

                validatePiva = function(piva)
                {
                    var validPIVA = false;
                    var session_id = "asdasdadadada"; //TODO - REMOVE IT
                    var call = "jsonFactory.isValidPIVA";
                    var request = {id: 4, params: [piva, session_id], method: call};

                    return $http.post("http://demo5373996.mockable.io/validityPiva", request)
                        .then(function(response)
                        {
                            if (!response) return $q.reject(response);

                            $.map(response.data.result.risultato, function(item) {
                                validPIVA = item.isValidIVA;
                            });
                            if(validPIVA) return true
                            else return $q.reject(response.data)
                        },
                        function(response){

                            return $q.reject(response);
                        }
                    );
                };
                return validatePiva($value);
            }
            }
        },
        username :
        {
            config :
            {
                'maxlength': '50',
                'ng-pattern': '/^[^§ç=;^]*$/'
            },
            validation : {}
        },
        password :
        {
            config :
            {
                'maxlength': '50',
                'type' : 'password',
                'ng-pattern': '/^[a-zA-Z0-9]*$/'
            },
            validation : {}
        },
        alphanum :
        {
            config :
            {
                'ng-pattern': '/^[a-zA-Z0-9]*$/'
            },
            validation : {}
        },
        alpha :
        {
            config :
            {
                'ng-pattern': '/^[a-z]+$/i'
            },
            validation : {}
        },
        asyncValidation : {},
        email :
        {
            config :
            {
                'maxlength': '100',
                'ng-pattern': '/^[a-zA-Z0-9][\\w\\.-]*[a-zA-Z0-9_]@[a-zA-Z0-9][\\w\\.-]*[a-zA-Z0-9]\\.[a-zA-Z][a-zA-Z\\.]*[a-zA-Z]$/'
            },
            validation : {}
        },
        number :
        {
            config :
            {
                'maxlength': '10',
                'ng-pattern': '/^[0-9]/i'
            },
            validation : {}
        },
        cap :
        {
            config :
            {
                'maxlength': '5',
                'ng-pattern': '/^\\d{2}[01589]\\d{2}$/'
            },
            validation : {

            }
        },
        capEarthquake :
        {
            config :
            {
                'maxlength': '5'
            },
            asyncValidation : {
                "capValidation": function($scope, $http, $q, $value)
                {
                    checkCapZonato = function(zip) {

                        var checkZonato = false;
                        var call = "jsonFactory.isCapZonato";
                        var session_id = "asdasdadadada"; //TODO - REMOVE IT
                        var request = {id: 3,params: [zip, session_id], method:call};

                        return $http.post("http://demo5373996.mockable.io/capZonato", request)
                            .then(function(response) {

                                if (!response) {
                                    return $q.reject(response);
                                }


                                $.map(response.data.result.isZon, function(item) {
                                    checkZonato = item.isZonato;
                                });
                                if(checkZonato)
                                {
                                    if(response.config.data.params[0].substr(3)=='00')
                                        return $q.reject("cap Zonato");
                                    else
                                        return true
                                }
                                else
                                {
                                    return $q.reject(response.data)
                                }
                            },
                            function(response){
                                console.log("errror THEN");
                                return $q.reject(response);
                            }
                        );
                    };

                    return checkCapZonato($value);
                }
            }
        },
        address :
        {
            config :
            {
                'maxlength': '100',
                'ng-pattern': '/^[a-zA-Zàòèéùì0-9\' ,.]*$/'
            },
            asyncValidation : {},
            validation : {}
        },
        name :
        {
            config :
            {
                'maxlength': '200',
                'ng-pattern': '/^[a-zA-Zàòèéùì\' ,.-]+$/'
            },
            asyncValidation : {},
            validation : {}
        },
        companyName :
        {
            config :
            {
                'maxlength': '500',
                'ng-pattern': '/^[a-zA-Zàòèéùì0-9&\' ,.-]*$/'
            },
            asyncValidation : {},
            validation : {}
        },
        codFisc :
        {
            config :
            {
                'maxlength' : '16',
                'ng-pattern' : '/^[a-zA-Z]{6}\\d{2}[a-zA-Z]{1}\\d{2}[a-zA-Z]{1}\\d{3}[a-zA-Z]{1}$/'
            },
            validation : {
                'complexCheck': function($scope, $http, $data)
                {

                    var calc = CodFiscale.calcola($data.name, $data.surname, $data.sex, $data.day, $data.month, $data.year, $data.codCatas);
                    console.log("Codife fiscale calcolato : "+calc+" == "+$data.CF);
                    if (calc.toUpperCase() != $data.CF.toUpperCase()) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        }
    }
 </pre>
 */
    .factory('validationFactory',['fiscalCode', function(fiscalCode) {

        return {
            validatePlate :
            {
                normal :
                {
                    config : {
                        'maxlength': '7',
                        //'size' : '12',
                        'ng-pattern': '/^(([a-zA-Z]{2}\\s{0,}\\d{3}\\s{0,}[a-zA-Z]{2})|(([a-zA-Z]{2}|roma)\\s{0,}(\\d{5}|\\d{6})))$/i',
                        'class': 'form-control',
                        'placeholder': "AB123CD"
                    }
                    /*validate : function(value)
                     {
                     var pfx = value.slice(0,3).toUpperCase();
                     if (pfx == 'RSM' || pfx == 'SCV') return true;
                     var pattern = /(^)([a-zA-Z]{2} *\d{6}|[a-zA-Z]{2} *\d{3} *[a-zA-Z]{2}|[a-zA-Z]{2}[a-zA-Z]{2}[0-9]{6}|[a-zA-Z]{2}[0-9]{1}[a-zA-Z]{5}|[a-zA-Z]{2}[a-zA-Z]{1}[0-9]{5}|[a-zA-Z]{2}[0-9]{1}[a-zA-Z]{1}[0-9]{4}|[a-zA-Z]{2}[0-9]{5}[a-zA-Z]{1}|[a-zA-Z]{2}[0-9]{2}[a-zA-Z]{1}[0-9]{3})($)/;
                     return pattern.test(value);
                     }*/
                },
                special :
                {
                    config : {
                        'maxlength': '7',
                        //'size' : '12',
                        'placeholder': "AB12345"
                    },
                    validation : // array of custom validation
                    {
                        "formatPlate": function (value)
                        {
                            return true;
                        }
                    }
                },
                bike :
                {
                    config : {
                        'maxlength': '8',
                        //'size' : '6',
                        'placeholder': "AB123456"
                    },
                    validation :// array of custom validation
                    {
                        "formatPlate": function ($scope, $http, $value)
                        {
                            if($value === undefined)return false
                            var pfx = $value.slice(0, 3).toUpperCase();
                            if (pfx == 'RSM' || pfx == 'SCV') return true;
                            var pattern = /(^)([a-zA-Z]{2} *\d{6}|[a-zA-Z]{2} *\d{5})($)/;
                            return pattern.test($value);
                        }
                    }
                },
                moped :
                {
                    config : {
                        'maxlength': '6',
                        //'size' : '6',
                        'placeholder': "123456"
                    },
                    validation :// array of custom validation
                    {
                        "formatPlate" : function ($scope, $http, $value) {
                            if($value === undefined)return false
                            var pfx = $value.slice(0,3).toUpperCase();
                            if (pfx == 'RSM' || pfx == 'SCV') return true;
                            var pattern = /(^)([a-zA-Z0-9]{6})($)/;
                            return pattern.test($value);
                        }
                        /*"lengthPlate" : function (value) {
                         return (value.length > 6);
                         }*/
                    }

                }
            },
            validateDate :
            {
                "it-IT" :
                {
                    parseDate : function(dateString)
                    {
						if ( dateString === undefined )
							return;
                        try
                        {
                            //var pattern = /((\d{1})|(\d{2}))\/((\d{1})|(\d{2}))\/(\d{4})/;
                            //var matchedDate = dateString.match(pattern).slice(1);//just removing total Element
                            var matchedDate = dateString.split("/");
                            console.log(matchedDate[2]+" "+ (matchedDate[1]-1) +"  " +matchedDate[0]);
                            return new Date(matchedDate[2], matchedDate[1]-1, matchedDate[0]);
                        }
                        catch (e)
                        {
                            console.error("Error while parsing date it-IT. Error :" +e);
                            return undefined;
                        }
                    },
                    config : {
                        'maxlength': '10',
                        //'size' : '6',
                        'placeholder': "dd/mm/yyyy",
                        'ng-pattern': '/^\\d\\d?\/\\d\\d?\/\\d\\d\\d\\d$/'
                    },
                    validation : {}
                },
                "en-GB" :
                {
                    parseDate : function(dateString)
                    {
                        try
                        {
                            //var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
                            //var matchedDate = dateString.match(pattern).slice(1);//just removing total Element
                            var matchedDate = dateString.split("/");
                            return new Date(matchedDate[2], matchedDate[0]-1, matchedDate[1]);
                        }
                        catch (e)
                        {
                            console.error("Error while parsing date en-GB. Error :" + e);
                            return undefined;
                        }
                    },
                    config : {
                        'maxlength': '10',
                        //'size' : '6',
                        'placeholder': "mm/dd/yyyy",
                        'ng-pattern': '/^\\d\\d?\/\\d\\d?\/\\d\\d\\d\\d$/'
                    },
                    validation : {"test":function(){console.log("ahah");}}
                },
                "en-US" :
                {
                    parseDate : function(dateString)
                    {
                        try
                        {
                            //var pattern = /(\d{4})\/(\d{2})\/(\d{2})/;
                            //var matchedDate = dateString.match(pattern).slice(1);//just removing total Element
                            var matchedDate = dateString.split("/");
                            return new Date(matchedDate[0], matchedDate[2]-1, matchedDate[1]);
                        }
                        catch (e)
                        {
                            console.error("Error while parsing date en-US. Error :" +e);
                            return undefined;
                        }
                    },
                    config : {
                        'maxlength': '10',
                        //'size' : '6',
                        'placeholder': "yyyy/dd/mm",
                        'ng-pattern': '/^\\d\\d\\d\\d\/\\d\\d?\/\\d\\d?$/'
                    },
                    validation : {}
                }
            },
            validateText :
            {
                piva :
                {
                    config :
                    {
                        'maxlength': '11'
                    },
                    asyncValidation :
                    {
                        "pivaValidate" : function ($scope, $http, $q,  $value)
                        {

                            validatePiva = function(piva)
                            {
                                var validPIVA = false;
                                var session_id = "asdasdadadada"; //TODO - REMOVE IT
                                var call = "jsonFactory.isValidPIVA";
                                var request = {id: 4, params: [piva, session_id], method: call};

                                return $http.post("http://demo5373996.mockable.io/validityPiva", request)
                                    .then(function(response)
                                    {
                                        if (!response) return $q.reject(response);

                                        $.map(response.data.result.risultato, function(item) {
                                            validPIVA = item.isValidIVA;
                                        });
                                        if(validPIVA) return true
                                        else return $q.reject(response.data)
                                    },
                                    function(response){

                                        return $q.reject(response);
                                    }
                                );
                            };
                            return validatePiva($value);
                        }
                    }
                },
                username :
                {
                    config :
                    {
                        'maxlength': '50',
                        'ng-pattern': '/^[^§ç=;^]*$/'
                    },
                    validation : {}
                },
                password :
                {
                    config :
                    {
                        'maxlength': '50',
                        'type' : 'password',
                        'ng-pattern': '/^[a-zA-Z0-9]*$/'
                    },
                    validation : {}
                },
                alphanum :
                {
                    config :
                    {
                        'ng-pattern': '/^[a-zA-Z0-9]*$/'
                    },
                    validation : {}
                },
                alpha :
                {
                    config :
                    {
                        'ng-pattern': '/^[a-z]+$/i'
                    },
                    validation : {}
                },
                asyncValidation : {},
                email :
                {
                    config :
                    {
                        'maxlength': '100',
                        'ng-pattern': '/^[a-zA-Z0-9][\\w\\.-]*[a-zA-Z0-9_]@[a-zA-Z0-9][\\w\\.-]*[a-zA-Z0-9]\\.[a-zA-Z][a-zA-Z\\.]*[a-zA-Z]$/'
                    },
                    validation : {}
                },
                number :
                {
                    config :
                    {
                        'maxlength': '10',
                        'ng-pattern': '/^[0-9]/i'
                    },
                    validation : {}
                },
                cap :
                {
                    config :
                    {
                        'maxlength': '5',
                        'ng-pattern': '/^\\d{2}[01589]\\d{2}$/'
                    },
                    validation : {

                    }
                },
                capEarthquake :
                {
                    config :
                    {
                        'maxlength': '5'
                    },
                    asyncValidation : {
                        "capValidation": function($scope, $http, $q, $value)
                        {
                            checkCapZonato = function(zip) {

                                var checkZonato = false;
                                var call = "jsonFactory.isCapZonato";
                                var session_id = "asdasdadadada"; //TODO - REMOVE IT
                                var request = {id: 3,params: [zip, session_id], method:call};

                                return $http.post("http://demo5373996.mockable.io/capZonato", request)
                                    .then(function(response) {

                                        if (!response) {
                                            return $q.reject(response);
                                        }


                                        $.map(response.data.result.isZon, function(item) {
                                            checkZonato = item.isZonato;
                                        });
                                        if(checkZonato)
                                        {
                                            if(response.config.data.params[0].substr(3)=='00')
                                                return $q.reject("cap Zonato");
                                            else
                                                return true
                                        }
                                        else
                                        {
                                            return $q.reject(response.data)
                                        }
                                    },
                                    function(response){
                                        console.log("errror THEN");
                                        return $q.reject(response);
                                    }
                                );
                            };

                            return checkCapZonato($value);
                        }
                    }
                },
                address :
                {
                    config :
                    {
                        'maxlength': '100',
                        'ng-pattern': '/^[a-zA-Zàòèéùì0-9\' ,.]*$/'
                    },
                    asyncValidation : {},
                    validation : {}
                },
                name :
                {
                    config :
                    {
                        'maxlength': '200',
                        'ng-pattern': '/^[a-zA-Zàòèéùì\' ,.-]+$/'
                    },
                    asyncValidation : {},
                    validation : {}
                },
                companyName :
                {
                    config :
                    {
                        'maxlength': '500',
                        'ng-pattern': '/^[a-zA-Zàòèéùì0-9&\' ,.-]*$/'
                    },
                    asyncValidation : {},
                    validation : {}
                },
                codFisc :
                {
                    config :
                    {
                        'maxlength' : '16',
                        'ng-pattern' : '/^[a-zA-Z]{6}\\d{2}[a-zA-Z]{1}\\d{2}[a-zA-Z]{1}\\d{3}[a-zA-Z]{1}$/'
                    },
                    validation : {
                        'complexCheck': function($scope, $http, $data)
                        {

                            var calc = fiscalCode.calculate($data.name, $data.surname, $data.sex, $data.day, $data.month, $data.year, $data.codCatas);
                            console.log("Codife fiscale calcolato : "+calc+" == "+$data.CF);
                            if (calc.toUpperCase() != $data.CF.toUpperCase()) {
                                return false;
                            } else {
                                return true;
                            }
                        }
                    }
                }
            }

        };
    }]);
