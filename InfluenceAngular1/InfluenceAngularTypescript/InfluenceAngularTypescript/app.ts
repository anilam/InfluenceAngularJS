/// <reference path="scripts/typings/angularjs/angular.d.ts" />
/// <reference path="scripts/typings/jstree/jstree.d.ts" />


module App {
    declare function unescape(s: string): string;

    export var app = angular.module('myApp', ['ui.tree', 'ngRoute', 'ui.bootstrap', 'ngSanitize', 'ngAside', 'chart.js']);


    angular.module("myApp").config(function ($locationProvider:any) {
        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        });
        $locationProvider.hashPrefix('!');
    });

    app.factory('LoginService', function () {
        var admin = 'admin';
        var pass = 'admin';
        var isAuthenticated = false;

        return {
            login: function (username:any, password:any) {
                isAuthenticated = username === admin && password === pass;
                return isAuthenticated;
            },
            isAuthenticated: function () {
                return isAuthenticated;
            }
        };

    });

    app.config(($routeProvider: any, ChartJsProvider: any) => {
        $routeProvider
            .when('/', {
                controller: 'InfluenceController',
                templateUrl: 'templates/main.html'
            })
            .when('/graph', {
                controller: 'graphController',
                templateUrl: 'templates/graph.html'
            })
            .when('/login', {
                controller: 'loginController',
                templateUrl: 'templates/login.html'
            })

            .otherwise({ redirectTo: '/' });
        ChartJsProvider.setOptions({ colors: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
    });



    app.run(function ($rootScope: any, $location: any, LoginService: any) {

        $rootScope.$on('$locationChangeStart',
            (event:any, next:any, current:any) => {
                var publicPages = ['/login'];
                var restrictedPage = publicPages.indexOf($location.path()) === -1;
                //if (restrictedPage && !LoginService.isAuthenticated()) {
                //    $location.path('/login');
                //}
            });
    });

    angular.module('myApp').directive('focusOn', function () {
        return function (scope, elem, attr) {
            scope.$on('focusOn', function (e, name) {
                if (name === attr.focusOn) {
                    elem[0].focus();
                }
            });
        };
    });

    angular.module('myApp').factory('focus', function ($rootScope: any, $timeout: any) {
        return function (name:any) {
            $timeout(function () {
                $rootScope.$broadcast('focusOn', name);
            });
        }
    });

    angular.module('myApp').factory('functionalDetailsBl', [(): FunctionalDetailsBl => {
        return new FunctionalDetailsBl();
    }]);

    angular.module('myApp').factory('otherDetailsBl', [(): OtherDetailsBl => {
        return new OtherDetailsBl();
    }]);

    angular.module('myApp').factory('dBDetailsBL', [(): DBDetailsBL => {
        return new DBDetailsBL();
    }]);

    angular.module('myApp').factory('nodeBl', [(): NodeBl => {
        return new NodeBl();
    }]);

    angular.module('myApp').factory('dBStore', [(): DBStore => {
        return new DBStore();
    }]);

    app.factory('Excel',
        function ($window: any) {
            var uri = 'data:application/vnd.ms-excel;base64,',
                template =
                    '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
                base64 = function (s: any) { return $window.btoa(unescape(encodeURIComponent(s))); },
                format = function (s: any, c: any) { return s.replace(/{(\w+)}/g, function (m: any, p: any) { return c[p]; }) };
            return {
                tableToExcel: function (tableId: any, worksheetName: any) {
                    var table = $(tableId),
                        ctx = { worksheet: worksheetName, table: table.html() },
                        href = uri + base64(format(template, ctx));
                    return href;
                }
            };
        })
        .controller('MyCtrl',
        function (Excel: any, $timeout: any, $scope: any) {
            $scope.exportToExcel = function (tableId: any, sheetname: any) { // ex: '#my-table'
                var exportHref = Excel.tableToExcel(tableId, sheetname);
                $timeout(function () { location.href = exportHref; }, 100); // trigger download
            }
        });

    
    app.controller("graphController", graphController);
    app.controller("InfluenceController", influenceController);
    app.controller("loginController", loginController);

}















