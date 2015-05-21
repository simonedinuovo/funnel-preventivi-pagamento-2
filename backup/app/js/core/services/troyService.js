/*
var troyContext = {
    "APIBaseUrls": {
        "aspro": "/oneweb/ajax/aspro/",
        "contentAPI": "/oneweb/content-api/v1/",
        "contextAPI": "/oneweb/ajax/aspro/context-service/",
        "idmAPI": "/oneweb/idm/v1/"
    },
    "containerAlias": null,
    "containerId": "owid:ba-144c069cb1e",
    "language": "en",
    "pageGuid": "RENDERKIT:CONTENT:system/static/aspromanager.cms.xml",
    "portalGuid": "AZDE-XML:DIRECTORY:119186",
    "user": "fw"
};
*/

"use strict";

angular.module("azDirectCore.troyServiceModule", [])
	.provider("troyService", function () {
	    return {

	        $get: function () {
	            return {
	                getTroy: function () {
	                    if (troyContext) { return troyContext }
	                    else {
	                        return {
	                            "APIBaseUrls": null,
	                            "containerAlias": null,
	                            "containerId": null,
	                            // caricare il lang da config
	                            "language": "it",
	                            "pageGuid": null,
	                            "portalGuid": null,
	                            "user": null
	                        }
	                    }
	                }
	            }
	        }
	    }
	});
