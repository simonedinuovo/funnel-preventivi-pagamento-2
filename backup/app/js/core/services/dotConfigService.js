angular.module("azDirectCore.dotConfigServiceModule", [])

    .provider("dotConfigService", function () {
        var baseUrl = "";
        return {

            $get: function ($http, $q, $log, $window) {
                return {
                    getConfiguration: function (fileName, restEndpoint) {
                        var deferObj = $q.defer();
                        var lang = "";
                        var portalName = "";
                        if (!angular.isDefined($window.troyContext)) {
                            deferObj.resolve("{'error':'no oneWebContext'}");
                            return deferObj.promise;
                        }
                        else {
                            restEndpoint = $window.troyContext.APIBaseUrls.configBase;
                            $http.get(restEndpoint + fileName)
                                .success(function (data) {
                                    deferObj.resolve(data);
                                })
                                .error(function (data, status) {
                                    $log.error("<dotConfigService> dot config error: "+fileName+"("+status+")");
                                    deferObj.reject("dot config error on getting "+fileName);
                                });
                            return deferObj.promise;
                        }
                    }
                };
            }
        };
    });
