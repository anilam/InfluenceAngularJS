/// <reference path="scripts/typings/angularjs/angular.d.ts" />
/// <reference path="scripts/typings/jstree/jstree.d.ts" />
var App;
/// <reference path="scripts/typings/angularjs/angular.d.ts" />
/// <reference path="scripts/typings/jstree/jstree.d.ts" />
(function (App) {
    function influenceController($scope, $http, $log, $filter, functionalDetailsBl, otherDetailsBl, dBDetailsBL, nodeBl, focus, $aside) {
        $scope.nodeData = [];
        $scope.editing = false;
        $scope.Funcdetailsediting = false;
        $scope.DBdetailsediting = false;
        $scope.Otherdetailsediting = false;
        $scope.settings = new Settings();
        $scope.editOtherDetailsValue = [];
        $scope.settings.expandTree = false;
        $scope.settings.collapseTree = false;
        $scope.settings.add = false;
        $scope.settings.delete = false;
        $scope.settings.edit = false;
        $scope.tabselected = 0;
        $scope.loading = false;
        $scope.loadingNode = false;
        $scope.exportList = new Array();
        $scope.id = 0;
        $scope.alerts = [];
        var findArrayObject = function (object, name) {
            return $filter('filter')(object, { Path: name }, true)[0];
        };
        $scope.updateExcelExport = function (path, name) {
            var foundItem = findArrayObject($scope.exportList, path.replace("search-", ""));
            if (document.getElementById(path) != null && document.getElementById(path).checked) {
                if (!foundItem) {
                    $scope.exportList.push({ Path: path.replace("search-", ""), Name: name });
                }
            }
            else {
                if (foundItem) {
                    var index = $scope.exportList.indexOf(foundItem);
                    if (index > -1)
                        $scope.exportList.splice(index, 1);
                }
            }
        };
        $scope.updateSearchExcelExport = function (path, name) {
            $scope.updateExcelExport("search-" + path, name);
        };
        $scope.init = function () {
            $scope.loadingNode = true;
            $scope.nodeData = [];
            ////aside
            $http({
                method: "GET",
                url: App.Config.Constants.default.url
            }).success(function (data) {
                var arraypush = new Array();
                arraypush.unshift(data);
                $scope.nodeData = arraypush;
                $scope.loadingNode = false;
            }).error(function () {
                $scope.loadingNode = false;
            });
        };
        $scope.init();
        //aside
        $scope.asideState = {
            open: false,
            position: 'left'
        };
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };
        $scope.openAside = function (position, backdrop) {
            $scope.asideState = {
                open: true,
                position: 'left'
            };
            function postClose() {
                $scope.asideState.open = false;
            }
            var modalInstance = $aside.open({
                templateUrl: 'shared/aside.html',
                placement: position,
                size: 'sm',
                backdrop: backdrop,
                resolve: {
                    selectedSettings: function () {
                        return $scope.settings;
                    }
                },
                controller: function ($scope, $uibModalInstance, selectedSettings) {
                    $scope.settings = selectedSettings;
                    $scope.ok = function (e) {
                        $uibModalInstance.close($scope.settings);
                        e.stopPropagation();
                    };
                    $scope.cancel = function (e) {
                        $uibModalInstance.dismiss();
                        e.stopPropagation();
                    };
                }
            });
            modalInstance.result.then(function (selectedSettings) {
                $scope.settings = selectedSettings;
                if ($scope.settings.expandTree) {
                    $scope.expandAll();
                }
                if ($scope.settings.collapseTree) {
                    $scope.collapseAll();
                }
            }, function () {
                $log.info('modal-component dismissed at: ' + new Date());
            });
        };
        $scope.toggle = function (scope) {
            scope.toggle();
        };
        $scope.moveLastToTheBeginning = function () {
            var a = $scope.nodeData.pop();
            $scope.nodeData.splice(0, 0, a);
        };
        $scope.checkDuplicateName = function (subMenuItems, name) {
            var found = false;
            if (subMenuItems) {
                for (var i = 0; i < subMenuItems.length; i++) {
                    if (subMenuItems[i].Name == name) {
                        return subMenuItems[i];
                    }
                    found = $scope.checkDuplicateName(subMenuItems[i].Children, name);
                    if (found)
                        return found;
                }
            }
        };
        $scope.searchDuplicateName = function (subMenuItems, name) {
            //   subMenuItems = subMenuItems.unshift(subMenuItems);
            var found = false;
            if (subMenuItems) {
                for (var i = 0; i < subMenuItems.length; i++) {
                    if (subMenuItems[i].Name.toLowerCase().indexOf(name.toLowerCase()) !== -1) {
                        return subMenuItems[i];
                    }
                    found = $scope.searchDuplicateName(subMenuItems[i].Children, name);
                    if (found)
                        $scope.filterSearchArray.unshift(found);
                }
            }
        };
        // Save all
        $scope.saveFuncDetails = function () {
            $scope.loading = true;
            $http({
                method: "Post",
                data: $scope.myDataTable,
                url: App.Config.Constants.default.url + '/' + $scope.activedata.Path + '/' + "detail"
            }).success(function (status) {
                console.log("success");
                $scope.alerts.push({ type: 'success', msg: 'Updated successfully' });
                $scope.loading = false;
            }).error(function (error, status) {
                $scope.alerts.push({ type: 'danger', msg: "Update Failed:" + error + " " + status });
                $scope.loading = false;
            });
        };
        //func details
        $scope.setFuncdetailsActive = function (index) {
            functionalDetailsBl.setFuncdetailsActive(index, $scope);
        };
        $scope.editFuncdetails = function (Funcdetails, index) {
            functionalDetailsBl.editFuncdetails(Funcdetails, index, $scope, focus);
        };
        $scope.editFuncdetailsOk = function (Funcdetails, index) {
            functionalDetailsBl.editFuncdetailsOk(Funcdetails, index, $scope);
        };
        $scope.removeFuncdetailsCancel = function (Funcdetails, index) {
            functionalDetailsBl.removeFuncdetailsCancel(Funcdetails, index, $scope);
        };
        $scope.removeFuncdetails = function (index) {
            functionalDetailsBl.removeFuncdetails(index, $scope);
        };
        $scope.addFuncdetails = function (scope) {
            functionalDetailsBl.addFuncdetails(scope, $scope, focus);
        };
        //DB Details
        $scope.setDBdetailsActive = function (index) {
            dBDetailsBL.setDBdetailsActive(index, $scope);
        };
        $scope.editDBdetails = function (DBdetails, index) {
            dBDetailsBL.editDBdetails(DBdetails, index, $scope, focus);
        };
        $scope.editDBdetailsOk = function (DBdetails, index) {
            dBDetailsBL.editDBdetailsOk(DBdetails, index, $scope);
        };
        $scope.removeDBdetailsCancel = function (DBdetails, index) {
            dBDetailsBL.removeDBdetailsCancel(DBdetails, index, $scope);
        };
        $scope.removeDBdetails = function (index) {
            dBDetailsBL.removeDBdetails(index, $scope);
        };
        $scope.addDBdetails = function (scope) {
            dBDetailsBL.addDBdetails(scope, $scope, focus);
        };
        //Other details
        $scope.setOtherdetailsActive = function (index) {
            otherDetailsBl.setOtherdetailsActive(index, $scope);
        };
        $scope.editOtherdetails = function (Otherdetails, index) {
            otherDetailsBl.editOtherdetails(Otherdetails, index, $scope, focus);
        };
        $scope.editOtherdetailsOk = function (Otherdetails, index) {
            otherDetailsBl.editOtherdetailsOk(Otherdetails, index, $scope);
        };
        $scope.removeOtherdetailsCancel = function (Otherdetails, index) {
            otherDetailsBl.removeOtherdetailsCancel(Otherdetails, index, $scope);
        };
        $scope.removeOtherdetails = function (index) {
            otherDetailsBl.removeOtherdetails(index, $scope);
        };
        $scope.addOtherdetails = function (scope) {
            otherDetailsBl.addOtherdetails(scope, $scope, focus);
        };
        //Node 
        $scope.newSubItem = function (scope) {
            nodeBl.newSubItem(scope, $scope, focus);
        };
        $scope.removeItem = function (scope) {
            nodeBl.removeItem(scope, $scope);
        };
        $scope.edit = function (scope) {
            nodeBl.edit(scope, $scope, focus);
        };
        $scope.editok = function (scope) {
            nodeBl.editok(scope, $scope);
        };
        $scope.editcancel = function (scope) {
            nodeBl.editcancel(scope, $scope);
        };
        $scope.saveNode = function () {
            nodeBl.saveNode($scope, $http);
        };
        $scope.setActive = function (menuItem) {
            $scope.loading = true;
            nodeBl.setActive(menuItem, $scope, $http, $log);
        };
        $scope.collapseAll = function () {
            nodeBl.collapseAll($scope);
        };
        $scope.expandAll = function () {
            nodeBl.expandAll($scope);
        };
        //serach
        $scope.search = function (name) {
            $scope.tabselected = 1;
            $scope.filterSearchArray = new Array();
            var found = $scope.searchDuplicateName($scope.nodeData, name);
            if (found) {
                $scope.filterSearchArray.unshift(found);
            }
        };
        $scope.searchCancel = function () {
            $scope.tabselected = 0;
            $scope.filterSearchArray = new Array();
            $scope.query = "";
        };
    }
    App.influenceController = influenceController;
    App.app = angular.module('myApp', ['ui.tree', 'ngRoute', 'ui.bootstrap', 'ngSanitize', 'ngAside']);
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
    App.app.controller("InfluenceController", influenceController);
})(App || (App = {}));
//# sourceMappingURL=app.js.map