/// <reference path="scripts/typings/angularjs/angular.d.ts" />
/// <reference path="scripts/typings/jstree/jstree.d.ts" />
var App;
/// <reference path="scripts/typings/angularjs/angular.d.ts" />
/// <reference path="scripts/typings/jstree/jstree.d.ts" />
(function (App) {
    function influenceController($scope, $http, $log, $filter, $timeout, functionalDetailsBl, $aside) {
        $scope.nodeData = [];
        $scope.editing = false;
        $scope.Funcdetailsediting = false;
        $scope.DBdetailsediting = false;
        $scope.settings = new Settings();
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
        $scope.updateExcelExport = function (index, scope) {
            var exportData = $scope.nodeData;
            if (index) {
                $scope.exportList.push({
                    id: index,
                    Name: exportData.Name,
                    Path: exportData.Path
                });
            }
            else {
                var index = $scope.exportList.indexOf(index);
                if (index > -1) {
                    $scope.exportList.splice(index, 1);
                }
            }
        };
        $scope.init = function () {
            $scope.loadingNode = true;
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
                $scope.loading = false;
            }).error(function (status) {
                $scope.loading = false;
            });
        };
        //func details
        $scope.setFuncdetailsActive = function (index) {
            functionalDetailsBl.setFuncdetailsActive(index, $scope);
        };
        $scope.editFuncdetails = function (Funcdetails, index) {
            functionalDetailsBl.editFuncdetails(Funcdetails, index, $scope);
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
            functionalDetailsBl.addFuncdetails(scope, $scope);
        };
        //DB Details
        $scope.setDBdetailsActive = function (index) {
            $scope.activeDBdetailsId = index;
        };
        $scope.editDBdetails = function (DBdetails, index) {
            if (!$scope.DBdetailsediting) {
                $scope.DBdetailsediting = true;
                $scope.editItemDBdetailsId = index;
                //backup
                //$scope.editDBDetailsValue = new DBtionalDetail();
                $scope.editDBDetailsValue = new Array();
                $scope.editDBDetailsValue.DbObject = $scope.myDataTable.DatabaseDetails[index].DbObject;
                $scope.editDBDetailsValue.DbType = $scope.myDataTable.DatabaseDetails[index].DbType;
                $scope.editDBDetailsValue.Description = $scope.myDataTable.DatabaseDetails[index].Description;
            }
            else {
                alert("Please Complete the editiing");
            }
        };
        $scope.editDBdetailsOk = function (DBdetails, index) {
            $scope.DBdetailsediting = false;
            //Mapping
            $scope.myDataTable.DatabaseDetails[index].DbObject = $scope.editDBDetailsValue.DbObject;
            $scope.myDataTable.DatabaseDetails[index].DbType = $scope.editDBDetailsValue.DbType;
            $scope.myDataTable.DatabaseDetails[index].Description = $scope.editDBDetailsValue.Description;
        };
        $scope.removeDBdetailsCancel = function (DBdetails, index) {
            $scope.DBdetailsediting = false;
            if (DBdetails.DbObject == "" && DBdetails.DbType == "" && DBdetails.Description == "") {
                $scope.myDataTable.DatabaseDetails.splice(index, 1);
            }
        };
        $scope.removeDBdetails = function (index) {
            $scope.myDataTable.DatabaseDetails.splice(index, 1);
        };
        $scope.addDBdetails = function (scope) {
            if ($scope.DBdetailsediting != true) {
                $scope.myDataTable.DatabaseDetails.unshift({
                    DbObject: "",
                    Description: "",
                    DbType: "",
                    MachineName: "",
                    ModifyDtTm: "",
                    Modifyby: ""
                });
                $scope.editDBDetailsValue = new Array();
                $scope.editDBDetailsValue.DbObject = $scope.myDataTable.DatabaseDetails[0].DbObject;
                $scope.editDBDetailsValue.Description = $scope.myDataTable.DatabaseDetails[0].Description;
                $scope.editDBDetailsValue.DbType = $scope.myDataTable.DatabaseDetails[0].DbType;
                $scope.DBdetailsediting = true;
                $scope.editItemDBdetailsId = 0;
            }
            else {
                alert("Please complete the editing");
            }
        };
        $scope.visible = function (node) {
            return !($scope.query && $scope.query.length > 0
                && node.Name.indexOf($scope.query) == -1);
        };
        $scope.search = function (name) {
            $scope.tabselected = 1;
            $scope.filterSearchArray = new Array();
            $scope.searchDuplicateName($scope.nodeData, name);
        };
        $scope.searchCancel = function () {
            $scope.tabselected = 0;
            $scope.filterSearchArray = new Array();
            $scope.query = "";
        };
        //Node 
        $scope.newSubItem = function (scope) {
            $scope.id = $scope.id + 1;
            if ($scope.editing != true) {
                var nodeData = scope.$modelValue;
                if (nodeData.Children == null) {
                    nodeData.Children = [];
                }
                nodeData.Children.push({
                    //  id: nodeData.id * 10 + nodeData.nodes.length,
                    Name: "EnterDetails",
                    Path: nodeData.Path + "_NewNode" + scope.id,
                    ParentPath: nodeData.Path,
                    Status: 1,
                    Children: null
                });
                $scope.editing = true;
                $scope.editItem = nodeData.Path + "_NewNode" + scope.id;
                //backup
                $scope.editValue = "EnterDetails";
                $scope.activeMenu = nodeData.Path + "_NewNode" + scope.id;
            }
            else {
                alert("Please complete the editing");
            }
        };
        $scope.removeItem = function (scope) {
            var nodeData = scope.$modelValue;
            nodeData.Status = 3;
        };
        //Node ----- End
        $scope.edit = function (scope) {
            if (!$scope.editing) {
                $scope.editing = true;
                var nodeData = scope.$modelValue;
                $scope.editItem = nodeData.Path;
                //backup
                $scope.editValue = nodeData.Name;
            }
            else {
                $scope.activeMenu = "EnterDetails";
                alert("Please Complete the editiing");
            }
        };
        $scope.editok = function (scope) {
            var nodeData = scope.$modelValue;
            if (!$scope.checkDuplicateName($scope.nodeData, scope.editValue)) {
                $scope.editing = false;
                if (nodeData.Name == "EnterDetails") {
                    nodeData.Status = 1;
                }
                else {
                    nodeData.Status = 2;
                }
                nodeData.Name = scope.editValue;
                $scope.editValue = "";
                $scope.activeMenu = nodeData.Path;
            }
            else {
                if (nodeData.Name == "EnterDetails") {
                    alert("Please Rename the Node");
                }
                else {
                    alert("Duplicate Name Not allowed");
                }
            }
        };
        $scope.editcancel = function (scope) {
            scope.editValue = $scope.editValue;
            $scope.editing = false;
            var nodeData = scope.$modelValue;
            if (nodeData.Name == "EnterDetails") {
                scope.remove();
            }
        };
        $scope.saveNode = function () {
            $scope.loadingNode = true;
            var storedata = $scope.nodeData;
            $http({
                method: "Post",
                data: storedata.shift(),
                url: App.Config.Constants.default.url
            }).success(function (status) {
                console.log("success");
                $scope.init();
            }).error(function (status) {
                $scope.loadingNode = false;
            });
        };
        $scope.setActive = function (menuItem) {
            $scope.loading = true;
            $scope.activeMenu = menuItem.Path;
            $scope.activedata = menuItem;
            if (menuItem.Children == null)
                $log.info("Children data load");
            $http({
                method: "GET",
                url: App.Config.Constants.default.url + '/' + menuItem.Path
            }).success(function (data) {
                $scope.myDataTable = data;
                $scope.loading = false;
            }).error(function (status) {
                $scope.loading = false;
            });
            //    then(response => {
            //    $scope.myDataTable = response.data;
            //});
        };
        $scope.collapseAll = function () {
            $scope.$broadcast('angular-ui-tree:collapse-all');
        };
        $scope.expandAll = function () {
            $scope.$broadcast('angular-ui-tree:expand-all');
        };
    }
    App.influenceController = influenceController;
    App.app = angular.module('myApp', ['ui.tree', 'ngRoute', 'ui.bootstrap', 'ngSanitize', 'ngAside']);
    App.app.directive('focusMe', function ($timeout) {
        return {
            scope: { trigger: '=?focusMe' },
            link: function (scope, element) {
                scope.$watch('trigger', function (value) {
                    if (value === true) {
                        //console.log('trigger',value);
                        //$timeout(function() {
                        element[0].focus();
                        scope.trigger = false;
                        //});
                    }
                });
            }
        };
    });
    angular.module('myApp').factory('functionalDetailsBl', [function () {
            return new App.FunctionalDetailsBl();
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