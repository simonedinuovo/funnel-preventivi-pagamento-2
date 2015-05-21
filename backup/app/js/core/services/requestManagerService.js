/**
 * @ngdoc overview
 * @name azDirectCore
 * @description Modulo Angular cisl Service
 */
angular.module('azDirectCore.requestManagerServiceModule', [])
/**
 * @ngdoc service
 * @name azDirectCore.requestManagerService
 * @description Manager di chiamate ajax
 */
    .factory('requestManagerService', ["$http", "$q", "azLog", "$timeout", "$rootScope", "dotConfigService", "technicalHeaderFactory", "troyService", "$document",
                               function($http, $q, azLog, $timeout, $rootScope,dotConfigService, technicalHeaderFactory, troyService, $document) {
        var counter = null;
        var undefined = undefined;
        var services = {};
        var FATAL = "FATAL";
        var ERROR = "ERROR";
        var configServicePromise = dotConfigService.getConfiguration("configServices.json");
        var sfqPromise=  dotConfigService.getConfiguration('SFQ.json');


        /**
         * @ngdoc method
         * @name requestManagerService
         * @methodOf azDirectCore.requestManagerService
         * @description Manager di chiamate ajax
         * @param {object} params
         *  oggetto con i parametri della chiamata. Se i dati sono presenti sul file di configurazione, sarà possibile richiamare solamente il nome del servizio per attuare la chiamata.
         *  <br/> <b><i>Example:</i><b/>
         *  <pre>
         {
                "name" : "superFastquote",
                "method" : "POST",
                "path" : "extquotations/superfastquote/",
                "timeout" : 20,
                "isMocked" : false,
                "uriSuffix" : "",
                "callerController": null,
                "techHeader" : null,
                "endPointPath" : "/oneweb/ajax/aspro/az-direct-POC-it-cisl-dispatcher/"
            };
         *  </pre>
         * @return {promise} oggetto 'promise' della chiamata. Per maggiori informazioni :
         * <ul>
         * <li>
         *  <a target="_blank" href="https://github.com/kriskowal/q/wiki/API-Reference#promisefinallycallback">Promise Wiki</a>
         * </li>
         * <li>
         *     <a target="_blank" href="https://docs.angularjs.org/api/ng/service/$q">Angular Promise</a>
         * </li>
         * <li>
         *     <a target="_blank" href="https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Promise">Promise documentazione Mozilla</a>
         * </li>
         * </ul>
         * @example
         * <pre>
         * var request = {
                "name" : "superFastquote",
                "method" : "GET",
                "path" : "configServices.json"
            };
         requestManagerService(request)
         .then(function(res){
                        console.log("ok " , res)
                     })
         .catch(function(res){
                        console.log("no" , res)
                    })
         </pre>
         <pre>
         var superFastquoteRequest = {
            name : "superFastquote",
            data : JSON.stringify(inputProvarequestManagerService),
            dataType:'json',
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            path:"http://192.168.33.10:8080/oneweb/ajax/aspro/az-direct-POC-it-cisl-dispatcher-war/extquotations/superfastquote"
        };
         requestManagerService(superFastquoteRequest)
         .then(function(res){
                console.log("requestManagerService ok! Dichiara: \n" , res)
            })
         .catch(function(res){
                console.log("requestManagerService ko! Dichiara: \n" , res)
            });
         </pre>
         */
        return function ajaxServiceFunction(input){
        	var exitPromise = $q.defer();

        	$q.all([configServicePromise, sfqPromise]).then(function(res){
        		//recupero le info da .config
                    try
                    {

                        var groups = res[0].data;//ricrea i servizi da configservices.json
                        groups.forEach(function(value,index,array){
                            for(var k in value.services) {
                                services[k] = value.services[k];
                                services[k].path = value.endPointPath + value.services[k].path;
                            }
                        });

                        var settings = angular.extend({},services[input.name],input);//payload + config del servizio recuperato da configservices
                       // azLog.info("<requestManagerService> settings: ");azLog.info(settings);
                        var sfqData=res[1];

                        //costruisco il technicalheader
                        technicalHeaderFactory({language: troyService.getTroy.language === undefined? "IT":troyService.getTroy.language,
                            channel : "7",
                            mock: sfqData.cislParameters.mock === undefined? false: sfqData.cislParameters.mock,
                            error: sfqData.cislParameters.error === undefined? false: sfqData.cislParameters.error})
                            .then(function(resTH){
                                var jsonTH = {};
                                jsonTH.technicalHeader= resTH;
                                //aggiungo le info di location e il payload
                                jsonTH.technicalHeader.httpReferrer= $document.referrer;
                                jsonTH.technicalHeader.currentLocation= location.href;

                                var dataToSend=angular.extend({},settings.data, jsonTH);

                                //eseguo la chiamata
                                //azLog.info("<requestManagerService> dataToSend: ");
                                //azLog.info(dataToSend);
                                azLog.info("<requestManagerService> dataToSend: ");
                                azLog.info(dataToSend);
                                $http({
                                    method: settings.method,
                                    url: settings.path,
                                    data: dataToSend,
                                    dataType:settings.dataType,
                                    headers:settings.headers,
                                    timeout : settings.timeout * 1000
                                })
                                    .success(function(data, status, headers, config){
                                        if (data.messages && data.messages[0].severity == FATAL){
                                            azLog.info("<requestManagerService> result after http request: ");
                                            azLog.info(data);
                                            exitPromise.reject(data);
                                            return;
                                        }
                                        if (data.messages && data.messages[0].severity == ERROR){
                                            azLog.info("<requestManagerService> result after http request: ");
                                            azLog.info(data);
                                            exitPromise.reject(data);
                                            return;
                                        }
                                            azLog.info("<requestManagerService> result after http request: ");
                                            azLog.info(data);
                                            exitPromise.resolve(data);
                                            return;
                                    })
                                    .error(function(data, status, headers, config){
                                        if ( $rootScope.debug ) {
                                            azLog.warn("\nrequestManagerService %cERROR "+ "color:red;font-style:italic;font-weight:bold;"+ " su url:" + settings.path+
                                            "\ndata:"+ data+
                                            "\nstatus:"+ status+
                                            "\nheaders:"+ headers()+
                                            "\nconfig:"+config);
                                        }
                                        azLog.error("<requestManagerService> ERROR - result after http request: ");azLog.error(data);
                                        exitPromise.reject(data);
                                        return;
                                    })
                            },
                            function(reason){
                                azLog.error("<requestManagerService> thechnicalHeader get in error!");
                                exitPromise.reject(reason);
                                return;
                            });
                    }
                    catch(e)
                    {
                        azLog.error("Error in requestManagerSerivce : "+e+ " RESPONSE : "+res);
                    }



        	},
        	function(reason) {
        		azLog.error("<requestManagerService> Error getting config files from .config");
        		exitPromise.reject(reason);
        		return;
			});

        	return exitPromise.promise;
        }
    }]);
