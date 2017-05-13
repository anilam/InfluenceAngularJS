/// <reference path="scripts/typings/angularjs/angular.d.ts" />
/// <reference path="scripts/typings/jstree/jstree.d.ts" />
var App;
/// <reference path="scripts/typings/angularjs/angular.d.ts" />
/// <reference path="scripts/typings/jstree/jstree.d.ts" />
(function (App) {
    App.app = angular.module('myApp', ['ui.tree', 'ngRoute', 'ui.bootstrap', 'ngSanitize', 'ngAside']);
    angular.module("myApp").config(function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        });
        $locationProvider.hashPrefix('!');
    });
    App.app.config(function ($routeProvider) {
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
            controller: 'LoginController',
            templateUrl: 'templates/login.html'
        })
            .otherwise({ redirectTo: '/' });
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
    angular.module('myApp').factory('focus', function ($rootScope, $timeout) {
        return function (name) {
            $timeout(function () {
                $rootScope.$broadcast('focusOn', name);
            });
        };
    });
    angular.module('myApp').factory('functionalDetailsBl', [function () {
            return new App.FunctionalDetailsBl();
        }]);
    angular.module('myApp').factory('otherDetailsBl', [function () {
            return new App.OtherDetailsBl();
        }]);
    angular.module('myApp').factory('dBDetailsBL', [function () {
            return new App.DBDetailsBL();
        }]);
    angular.module('myApp').factory('nodeBl', [function () {
            return new App.NodeBl();
        }]);
    angular.module('myApp').factory('dBStore', [function () {
            return new App.DBStore();
        }]);
    App.app.factory('Excel', function ($window) {
        var uri = 'data:application/vnd.ms-excel;base64,', template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>', base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); }, format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }); };
        return {
            tableToExcel: function (tableId, worksheetName) {
                var table = $(tableId), ctx = { worksheet: worksheetName, table: table.html() }, href = uri + base64(format(template, ctx));
                return href;
            }
        };
    })
        .controller('MyCtrl', function (Excel, $timeout, $scope) {
        $scope.exportToExcel = function (tableId, sheetname) {
            var exportHref = Excel.tableToExcel(tableId, sheetname);
            $timeout(function () { location.href = exportHref; }, 100); // trigger download
        };
    });
    App.app.controller("graphController", App.graphController);
    App.app.controller("InfluenceController", App.influenceController);
})(App || (App = {}));
//# sourceMappingURL=app.js.map