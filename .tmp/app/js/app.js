/**
 * @ngdoc overview
 * @name emptyNgApp
 * @author  AZDirect  <azdirect@allianz.it>
 * @description Creates the emptyNgApp module and injects all dpendencies
 * @requires ngRoute
 * @requires ngAnimate
 * @requires ngResource
 * @requires ngCookies
 * @requires pascalprecht.translate
 */

'use strict';

angular.module('emptyNgApp', [
    'ngRoute',
    'ngAnimate',
    'ngResource',
    'ngCookies',
    'pascalprecht.translate',
    'azDirectCore.loggerModule',
    'azDirectCore.validationModule',
    'azDirectCore.technicalHeaderFactoryModule',
    'azDirectCore.dotConfigServiceModule',
    'azDirectCore.requestManagerServiceModule',
    "azDirectCore.troyServiceModule"
]);
