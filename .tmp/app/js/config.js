/**
 * @ngdoc overview
 * @name emptyNgApp.config:config
 * @author  AZDirect  <azdirect@allianz.it>
 * @description Configures which controller and view should be loaded on a specific path
 * @requires $translateProvider
 */

'use strict';

angular.module("emptyNgApp")
    .config(function ($translateProvider) {
        $translateProvider.translations('default', {
            'QUOTE_HEADER': 'YOUR CAR COSTS PER MONTH',
            'PRICE_INFO': 'Click on the price to get more information about the insurance.',
            'QUOTE_ERROR_MESSAGE': 'A error accure at the calculation. Please try again later.',
            'PER_DAY': 'per day',
            'CHANGE_PARAMS': 'Change parameters',
            'COPYRIGHT': 'Allianz 2014',
            'USERDATA_HEADER': 'FIND OUT WHAT YOUR CAR COSTS YOU',
            'CALCULATE_INFO': 'Calculate your insurance in a few secounds',
            'AGE_LABEL': 'Age',
            'CITY_LABEL': 'City',
            'VEHICLE_LABEL': 'Vehicle',
            'POWER_LABEL': 'Power',
            'GET_QUOTE': 'Get quote',
            'CITY_SERVICE_UNAVAILABLE': 'The city service is temporary not available.\n Please try it again later.',
            'CITY_SERVICE_NO_CITIES': 'No cities available.',
            'QUOTE_SERVICE_UNAVAILABLE':'The quote service is temporary not available.\n Please try it again later.',
            'QUOTE_SERVICE_NO_QUOTE': 'No quote available for your input.',
            'HP':'HP',
            'KW':'kW'
        });

        $translateProvider.translations('de', {
            'QUOTE_HEADER': 'MONATLICHE FAHRZEUG KOSTEN',
            'PRICE_INFO': 'Klicken Sie auf den Preis um mehr Informationen über die Versicherung zu bekommen.',
            'QUOTE_ERROR_MESSAGE': 'Es ist ein Fehler bei der Kalkulation aufgetreten. Bitte versuchen Sie es später.',
            'PER_DAY': 'pro Tag',
            'CHANGE_PARAMS': 'Eingabe ändern',
            'COPYRIGHT': 'Allianz 2014',
            'USERDATA_HEADER': 'FINDEN SIE HERAUS WAS SIE IHR FAHRZEUG KOSTET',
            'CALCULATE_INFO': 'Berechnen Sie ihre Versicherung in ein paar Sekunden',
            'AGE_LABEL': 'Alter',
            'CITY_LABEL': 'Stadt',
            'VEHICLE_LABEL': 'Fahrzeug',
            'POWER_LABEL': 'Leistung',
            'GET_QUOTE': 'Angebot anfordern',
            'CITY_SERVICE_UNAVAILABLE': 'Der city service ist momentan nicht verfügbar.\n Bitte versuchen sie es später nochmal.',
            'CITY_SERVICE_NO_CITIES': 'Es sind kein Städte verfügbar.',
            'QUOTE_SERVICE_UNAVAILABLE':'Der quote service ist momentan nicht verfügbar.\n Bitte versuchen sie es später nochmal.',
            'QUOTE_SERVICE_NO_QUOTE': 'Es gibt keine Angebote für Ihre Eingabe.',
            'HP':'PS',
            'KW':'kW'
        });


        /** JUST NEEDED IF YOU WANT TO USE THE DOTCONFIG SERVIVE
            $translateProvider.useLoader('$translatePartialLoader', {
                urlTemplate: '/oneweb/content-api/v1/config/document;pageId/ngDemoApp.json'
            });
         */
        var preferredLanguage = window.localStorage.getItem('oneweb.workbench.language') || "default";
        $translateProvider.preferredLanguage(preferredLanguage);
    });