/**
 * @ngdoc controller
 * @name emptyNgApp.controller:quoteCtrl
 * @author  AZDirect  <azdirect@allianz.it>
 * @description Creates the controller for the quote view
 * @requires $scope
 * @requires $location
 * @param {Number} quote The quote which is returned form the quoteService
 * @param {Object} $scope The scope of the controller, used to access the view
 * @param {Object} $location Gives you access to the location object (used to manipulate the current path)
 */

'use strict';

angular.module('emptyNgApp')
    .controller('emptyCtrl', function ($scope, $rootScope, $location, $timeout, fiscalCode,
                                       requestManagerService, $http) {
        /*$scope.$watchCollection('personalData.nome.$error',function(n,o){
            var errorLength = Object.keys(n).length;
            if ( errorLength )
                console.log("n length -->",  errorLength);
        });*/
        $scope.prosegui = function(e){
            //e.preventDefault();
            console.log(e);
            console.log("Is this form valid? ---> ", e.personalData.$valid );
        };
        var assignment = false;
        $scope.userForm = {
            // main attributes
            "sesso" : "M",
            "nome" : "",
            "cognome" : "",
            "datadinascita" : "",
            "comunenascita" : "",
            "codCatas" : "",
            "CF" : "",
            "dittaIndividuale" : "N"
        };
        var superFastquoteRequest = {
            name : "superFastquote",
            data : { "nome" : "Pippo"},
            dataType:'json',
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        };
        var aniaMock = {
            name : "superFastquote",
            method : "GET",
            dataType:'json',
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            path:"amoremio"
        };
        requestManagerService(superFastquoteRequest)
            .then(function(res){
                console.log("requestManagerService ok 1! Dichiara: \n" , res)
            })
            .catch(function(res){
                console.log("requestManagerService ko 1 ! Dichiara: \n" , res)
            });
        requestManagerService(superFastquoteRequest)
            .then(function(res){
                console.log("requestManagerService ok 2! Dichiara: \n" , res)
            })
            .catch(function(res){
                console.log("requestManagerService ko 2! Dichiara: \n" , res)
            });
        requestManagerService(superFastquoteRequest)
            .then(function(res){
                console.log("requestManagerService ok 3! Dichiara: \n" , res)
            })
            .catch(function(res){
                console.log("requestManagerService ko 3! Dichiara: \n" , res)
            });
        requestManagerService(superFastquoteRequest)
            .then(function(res){
                console.log("requestManagerService ok 4! Dichiara: \n" , res)
            })
            .catch(function(res){
                console.log("requestManagerService ko 4! Dichiara: \n" , res)
            });
        /*requestManagerService(aniaMock)
            .then(function(res){
                console.log("requestManagerService ok! Dichiara: \n" , res)
            })
            .catch(function(res){
                console.log("requestManagerService ko! Dichiara: \n" , res)
            });*/
        // jquery plugins bindings
        $('[data-datepicker]').datepicker({
            format: 'dd/mm/yyyy'
        })
        .on("changeDate", function(e){
            console.log("e! ", e);
            var sistemaMese = e.date.getMonth()+1;
            var dateSelected = e.date.getDate() + "/" + sistemaMese + "/" + e.date.getFullYear();
            var model = $(e.target).attr('ng-model');
            $scope.$apply(function(){
                $scope.userForm[model] = dateSelected;
            });
        });
        // Datepicker opener

        $(".datepicker-opener").click(function () {
            $(this).parent().find('input').focus();
        });

        $('[data-autocomplete-comune]').autocomplete({
            source: function(request, response) {
                var $this = $(this.element);
                $.getJSON($this.data('autocomplete-comune'), function(data) {
                    response($.map(data, function(item) {
                        return {
                            value: item.Descrizione,
                            code: item.dataCode
                        };
                    }));
                });
            },
            select: function( event, ui ) {
                //CodFiscale.dataCode = ui.item.code;
                $scope.$apply(function(){
                    $scope.userForm.codCatas = ui.item.code;
                    $scope.userForm.comunenascita = ui.item.value;
                });
                $(event.target).addClass('valid').trigger('keyup');
            },
            minLength: 2
        });
        //$('input.input_date:not(.no_mask)').mask('99/99/99?99', { placeholder:'' });
        $('.stickPoint').stickyControls();

        /*
            watching nome, cognome, datadinascita, codCatas in order to change CF
         */
        var nome = "",
            cognome = "",
            codCatas = "";
        var datadinascita = {
            day : "",
            month : "",
            year : ""
        };
        var controlError = function(el){
            $timeout(function(){
                var _root = el.parents("input-date");
                var errors = _root.find('.error');
                if ( !errors.length && el.hasClass('error') )
                    el.removeClass('error');
                else if ( errors.length  )
                    el.addClass('error');
            })
        };
        var controlCF = function(){
            var dateControl = datadinascita.day.length && datadinascita.month.length && datadinascita.year.length == 4;
            if ( nome && cognome && dateControl && codCatas ) {
                var cf = fiscalCode.calculate(nome,
                    cognome,
                    $scope.userForm.sesso,
                    datadinascita.day,
                    datadinascita.month,
                    datadinascita.year,
                    codCatas);
                $scope.userForm.CF = cf;
                //$("input[ng-model='CF']").val(cf);
            }
        };

        /*$http.get('rest-service/cities')
            .success(function(res){
                console.log("%c Funzia!", "color:red;font-size:20px;");
                console.log("res", res);
            });
        $http.post('oneweb/ajax/aspro/az-direct-IT-CISL-dispatcher-war/restservice/api/applicationlog', {msg:'hello word!'})
            .success(function(res){
                console.log("%c Funzia 2!", "color:blue;font-size:20px;");
                console.log("res", res);
            })
            .error(function(res){
                console.log("%c Error!", "color:blue;font-size:20px;");
                console.log("res", res);
            });*/
        $scope.$watch('userForm.nome',function(n,o){
            if ( n === undefined && o === undefined ) return;
            nome = n;
            var nameOfThis = $("input[ng-model='userForm.nome']").attr('name');
            console.warn( "$scope.personalData[nameOfThis].$error",
                $scope.personalData[nameOfThis].$error );
            //controlError( $("input[ng-model='personalData.nome']") );
            controlCF();
        });
        $scope.$watch('userForm.cognome',function(n,o){
            if ( n === undefined && o === undefined ) return;
            cognome = n;
            //controlError( $("input[ng-model='personalData.cognome']") );
            controlCF();
        });
        $scope.$watch('userForm.datadinascita',function(n,o){
            if ( n === undefined && o === undefined ) return;
            var dateSplit = n.split("/");
            datadinascita.day = dateSplit[0];
            datadinascita.month = String( Number( dateSplit[1] ) - 1 );
            datadinascita.year = dateSplit[2];
            //controlError( $("input[ng-model='personalData.datadinascita']") );
            controlCF();
        });
        $scope.$watch('userForm.codCatas',function(n,o){
            if ( n === undefined && o === undefined ) return;
            codCatas = n;
            //controlError( $("input[ng-model='personalData.codCatas']") );
            controlCF();
        });
        // watching CF
        $scope.$watch('userForm.CF',function(n,o){
            if ( n === undefined && o === undefined ) return;
            var nameOfThis = $("input[ng-model='userForm.CF']").attr('name');
            console.log( "$scope.personalData[nameOfThis].$error",
                $scope.personalData[nameOfThis].$error );
            //controlError( $("input[ng-model='personalData.CF']") );
        })
    });
