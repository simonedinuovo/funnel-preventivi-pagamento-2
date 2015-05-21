/**
 * @ngdoc overview
 * @name emptyNgApp.config:routes
 * @author  AZDirect  <azdirect@allianz.it>
 * @description Configures which controller and view should be loaded on a specific path
 * @requires $routeProvider
 * @requires $locationProvider
 */

'use strict';

angular.module("emptyNgApp")
.config(function ($routeProvider, $locationProvider) {
    $routeProvider

    .when("/", {
        templateUrl: "app/partials/preventivo-001-dati-polizza.html",
        controller: "emptyCtrl"
    })
    .when("/dati-polizza", {
        templateUrl: "app/partials/preventivo-001-dati-polizza.html",
        controller: "emptyCtrl"
    })
    .when("/contatti", {
        templateUrl: "app/partials/preventivo-002-contatti.html",
        controller: "emptyCtrl"
    })
    .when("/riepilogo", {
        templateUrl: "app/partials/preventivo-003.1-riepilogo.html",
        controller: "emptyCtrl"
    })
    .when("/riepilogo-registrato", {
        templateUrl: "app/partials/preventivo-003.2-riepilogo-registrato.html",
        controller: "emptyCtrl"
    })
    .when("/tipo-pagamento", {
        templateUrl: "app/partials/funnel-pagamento-001-tipo-pagamento.html",
        controller: "emptyCtrl"
    })
    .when("/conferma-acquisto", {
        templateUrl: "app/partials/funnel-pagamento-003-conferma-acquisto.html",
        controller: "emptyCtrl"
    })


    .when("/offerta", {
        templateUrl: "app/partials/offerta.html",
        controller: "emptyCtrl"
    })

    .otherwise({
        redirectTo: "/"
    });
});
