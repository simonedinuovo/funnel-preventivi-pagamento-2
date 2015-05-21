/**
 * @ngdoc overview
 * @name azDirectCore
 * @description Modulo Angular technical Header
 */
angular.module('azDirectCore.technicalHeaderFactoryModule', [])
/**
 * @ngdoc service
 * @name azDirectCore.technicalHeaderFactory
 * @description Manager della chiamata al technical Header
 */
    .factory('technicalHeaderFactory', ["$http", "$q", "$timeout", "$rootScope", "dotConfigService", "$log",
        function($http, $q, $timeout, $rootScope, dotConfigService, $log) {

            var undefined = undefined;
            var promise = dotConfigService.getConfiguration("technicalHeader.json")
            var iterateObjectWithKey = function(obj, key, subst){
                var newObj = Array.isArray(obj) ? [] : {};
                for(var k in obj){
                    if(k == key){
                        newObj[k] = subst;
                    }
                    else if(obj[k] && typeof obj[k] == "object") {
                        newObj[k] = Array.isArray(obj[k]) ? [] : {};
                        var value = iterateObjectWithKey(obj[k],key, subst);
                        if (value) {
                            newObj[k] = value;
                        }
                    }
                }
                return newObj;
            }
            /**
             * @ngdoc method
             * @name technicalHeader
             * @methodOf azDirectCore.technicalHeaderFactory
             * @description factory technicalHeader
             * @param {object} params
             *  oggetto con i parametri technical header.
             *  <br/> <b><i>Example:</i><b/>
             *  <pre>
             {
                    language:"DE",
                    channel : "10a"
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
             var tech = technicalHeaderFactory({language:"DE", channel : "10a"});
             // returns
             //  $$state: Object
             //    status: 1
             //    value: Object // value
             //      classes: Array[3]
             //      locale: Object
             //      mock: false
             //      origin: Object
             //      user: Object
             // value is in tech.$$state.value
             </pre>
             @example
             <pre>
             technicalHeaderFactory({language:"BO", channel : "08h"})
             .then(function(res){
                console.log("technicalHeaderFactory declares" , res);
            })
             .catch(function(res){
                console.log("Oh no!");
            })
             </pre>
             */
            return function(input){
                var exitPromise= $q.defer();

                promise.then(function(res){
                    for(var k in input){
                        var value = iterateObjectWithKey(res,k, input[k]);
                        res = $.extend(true,{},res,value);
                    };
                    exitPromise.resolve(res);

                },function(reason){
                    $log.error("<technicalHeaderFactory> error getting file");
                    exitPromise.reject(reason);
                })

                return exitPromise.promise;
            }
        }]);
