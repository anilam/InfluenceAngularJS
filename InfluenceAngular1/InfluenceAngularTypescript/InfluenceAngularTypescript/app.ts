﻿/// <reference path="scripts/typings/angularjs/angular.d.ts" />
/// <reference path="scripts/typings/jstree/jstree.d.ts" />


module App {
    declare function unescape(s: string): string;

    export interface IDiagnosticsScope extends ng.IScope {
        treeData: any;
        loadData: string;
        remove: (scope: any) => void;
        toggle: (scope: any) => void;
        moveLastToTheBeginning: () => void;
        nodeData:any;
        newSubItem: (scope: any) => void;
        collapseAll: () => void;
        expandAll: () => void;
        loadDetails: (path: string) => void;
        myDataTable: NodeDetail;
        setActive: (menuItem: any) => void;
        activeMenu: string;
        exportToExcel: (tableId: any, sheetname: any) => void;
        edit: (scope: any) => void;
        editing: boolean;
        editItem: string;
        textChanged(event: Event): any;
        editValue: any;
        editFuncDetailsValue: any;
        editok: (scope: any) => void;
        editcancel: (scope: any) => void;
     //   checkDuplicateName:any;
        checkDuplicateName: (subMenuItems: any, name: string) => any;
        setFuncdetailsActive(index: any): any;
        activeFuncdetailsId: number;
        editFuncdetails: (Funcdetails: FunctionalDetail, index: number) => void;
        Funcdetailsediting: boolean;
        editItemFuncdetailsId: number;
        editFuncdetailsOk: (Funcdetails: FunctionalDetail, index: number) => void;
        removeFuncdetailsCancel: (Funcdetails: FunctionalDetail, index: number) => void;
        removeFuncdetails: (index: number) => void;
        addFuncdetails: (scope: any) => void;
        visible: (item: any) => boolean;
        findNodes: () => void;
        query: any;
        search: (name: string) => void;
        searchDuplicateName: (subMenuItems: any, name: string) => any;
        filterSearchArray: any;
        saveFuncDetails: () => void;
        activedata: any;
        asideState: { open: boolean, position:any};
        openAside: (position: any, backdrop: any) => void;
        settings: Settings;
        tabselected: number;
        searchCancel: () => any;
        setDBdetailsActive: (index: number) => void;
        activeDBdetailsId: number;
        editDBdetails: any;
        DBdetailsediting: any;
        editItemDBdetailsId: number;
        editDBDetailsValue: any;
        editDBdetailsOk: any;
        removeDBdetailsCancel: any;
        removeDBdetails: any;
        addDBdetails: (scope: any) => void;
        loading: boolean;
        loadServerData: any;
        removeItem: (scope: any) => void;
        saveNode: () => void;
        loadingNode: boolean;
        init: () => any;
        updateExcelExport: (path: string, name: string) => void;
        exportList: any;
        id:number;
        UpdatePathNullToInsertedNode: (subMenuItems: any, status: number) => any;
        document:any
        updateSearchExcelExport: (path: string, name: string) => void;
        alerts: any;
        closeAlert: (index: any) => void;
        activeOtherdetailsId: number;
        Otherdetailsediting: any;
        editItemOtherdetailsId: number;
        editOtherDetailsValue: any;
        setOtherdetailsActive: (index: number) => void;
        editOtherdetails: (Otherdetails: AdditionalDetail, index: number) => void;
        editOtherdetailsOk: (Otherdetails: AdditionalDetail, index: number) => void;
        removeOtherdetailsCancel: (Otherdetails: AdditionalDetail, index: number) => void;
        
        removeOtherdetails: (index: number) => void;
        addOtherdetails: (scope: any) => void;
     
    }

    export function influenceController($scope: IDiagnosticsScope,
        $http: angular.IHttpService,
        $log: angular.ILogService,
        $filter: any,
        functionalDetailsBl: FunctionalDetailsBl,
        otherDetailsBl: OtherDetailsBl,
        focus:any,
        $aside:any) {
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

        //$scope.updateExcelExport = function (Path: any, Name: any) {
        //    if (angular.element('Path')[0]) { //If it is checked
        //        $scope.exportList.push({ Path: Path, Name: Name});
        //    } else {
        //        var exportdData = $scope.exportList.indexOf({ Path: Path, Name: Name});
        //        if (exportdData > -1) {
        //            $scope.exportList.splice(exportdData, 1);
        //        }
        //    }
        //}

        var findArrayObject = function(object: any, name: string) {
            return $filter('filter')(object, { Path: name }, true)[0];
        }

        $scope.updateExcelExport = function (path: string, name: string) {
            var foundItem = findArrayObject($scope.exportList, path.replace("search-", ""));
            if (document.getElementById(path) != null && document.getElementById(path).checked) {
                if (!foundItem) {
                    $scope.exportList.push({ Path: path.replace("search-",""), Name: name });
                }
            }
            else {            
                if (foundItem) {
                    var index = $scope.exportList.indexOf(foundItem);
                    if (index > -1)
                        $scope.exportList.splice(index, 1);
                }
            }
        }


        $scope.updateSearchExcelExport = function (path: string, name: string) {
            $scope.updateExcelExport("search-" + path, name);
        }

        $scope.init = function() {
            $scope.loadingNode = true;
            $scope.nodeData = [];
            ////aside
            $http({
                method: "GET",
                url: Config.Constants.default.url
            }).success((data) => {
                var arraypush = new Array();
                arraypush.unshift(data);
                $scope.nodeData = arraypush;
                $scope.loadingNode = false;
            }).error(() => {
                $scope.loadingNode = false;
            });
        }
        $scope.init();
        //aside
        $scope.asideState = {
            open: false,
            position:'left'
        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.openAside = function (position, backdrop) {
            $scope.asideState = {
                open: true,
                position:'left'
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
                controller: function ($scope:any, $uibModalInstance:any, selectedSettings:Settings) {
                    $scope.settings = selectedSettings;

                    $scope.ok = function(e:any) {
                        $uibModalInstance.close($scope.settings);
                        e.stopPropagation();
                    };
                    $scope.cancel = function(e:any) {
                        $uibModalInstance.dismiss();
                        e.stopPropagation();
                    };
                }
            });
            modalInstance.result.then(function (selectedSettings:any) {
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
        }
   
        $scope.toggle = function(scope) {
            scope.toggle();
        };

        $scope.moveLastToTheBeginning = function() {
            var a = $scope.nodeData.pop();
            $scope.nodeData.splice(0, 0, a);
        };

        $scope.checkDuplicateName = (subMenuItems: any, name: string) => {
            var found = false;
            if (subMenuItems) {
                for (var i = 0; i < subMenuItems.length; i++) {
                    if (subMenuItems[i].Name == name) {
                        return subMenuItems[i];
                    }
                    found = $scope.checkDuplicateName(subMenuItems[i].Children, name);
                    if (found) return found;
                }
            }
        };

        $scope.searchDuplicateName = (subMenuItems: any, name: string) => {
         //   subMenuItems = subMenuItems.unshift(subMenuItems);
            var found = false;
            if (subMenuItems) {
                for (var i = 0; i < subMenuItems.length; i++) {
                    if (subMenuItems[i].Name.toLowerCase().indexOf(name.toLowerCase()) !== -1)
                    {
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
                data:$scope.myDataTable,
                url: Config.Constants.default.url + '/' + $scope.activedata.Path + '/' + "detail"
            }).success((status) => {
                console.log("success");
                $scope.alerts.push({ type: 'success', msg: 'Updated successfully' });
                $scope.loading = false;
                }).error((error, status) => {
                    $scope.alerts.push({ type: 'danger', msg: "Update Failed:" + error + " " + status });
                    $scope.loading = false;
            });
        }

        //func details
        $scope.setFuncdetailsActive = (index: number) => {
            functionalDetailsBl.setFuncdetailsActive(index,$scope);
        }

        $scope.editFuncdetails = function (Funcdetails: FunctionalDetail, index: number) {
            functionalDetailsBl.editFuncdetails(Funcdetails,index,$scope);
        }

        $scope.editFuncdetailsOk = function (Funcdetails: FunctionalDetail, index: number) {
            functionalDetailsBl.editFuncdetailsOk(Funcdetails, index,$scope);
        }

        $scope.removeFuncdetailsCancel = function (Funcdetails: FunctionalDetail, index: number) {
            functionalDetailsBl.removeFuncdetailsCancel(Funcdetails, index, $scope);
        }

        $scope.removeFuncdetails = function (index: number) {
            functionalDetailsBl.removeFuncdetails(index,$scope);
        }

        $scope.addFuncdetails = function (scope: any) {
            functionalDetailsBl.addFuncdetails(scope,$scope);          
        }

        //DB Details
        $scope.setDBdetailsActive = (index: number) => {
            $scope.activeDBdetailsId = index;
        }

        $scope.editDBdetails = function(DBdetails: DatabaseDetail, index: number) {
            if (!$scope.DBdetailsediting) {
                $scope.DBdetailsediting = true;
                $scope.editItemDBdetailsId = index;

                //backup
                //$scope.editDBDetailsValue = new DBtionalDetail();
                $scope.editDBDetailsValue = new Array();
                $scope.editDBDetailsValue.DbObject = $scope.myDataTable.DatabaseDetails[index].DbObject;
                $scope.editDBDetailsValue.DbType = $scope.myDataTable.DatabaseDetails[index].DbType;
                $scope.editDBDetailsValue.Description = $scope.myDataTable.DatabaseDetails[index].Description;

            } else {
                $scope.alerts.push({ type: 'warning', msg: 'Please complete the edit operation' });
            }
        }

        $scope.editDBdetailsOk = function (DBdetails: DatabaseDetail, index: number) {
            $scope.DBdetailsediting = false;
            //Mapping
            $scope.myDataTable.DatabaseDetails[index].DbObject = $scope.editDBDetailsValue.DbObject;
            $scope.myDataTable.DatabaseDetails[index].DbType=$scope.editDBDetailsValue.DbType;
            $scope.myDataTable.DatabaseDetails[index].Description = $scope.editDBDetailsValue.Description;
        }

        $scope.removeDBdetailsCancel = function (DBdetails: DatabaseDetail, index: number) {
            $scope.DBdetailsediting = false;
            if (DBdetails.DbObject == "" && DBdetails.DbType == "" && DBdetails.Description == "" ) {
                $scope.myDataTable.DatabaseDetails.splice(index, 1);
            }
        }

        $scope.removeDBdetails = function(index: number) {
            $scope.myDataTable.DatabaseDetails.splice(index, 1);
        }

        $scope.addDBdetails = function (scope: any) {
            if (!$scope.myDataTable.DatabaseDetails) {
                $scope.myDataTable.DatabaseDetails = [];
            }
            if ($scope.DBdetailsediting != true) {
                $scope.myDataTable.DatabaseDetails.unshift({
                    DbObject: "",
                    Description: "",
                    DbType: "",
                    MachineName: "",
                    ModifyDtTm: "",
                    Modifyby:""
                });
                $scope.editDBDetailsValue = new Array();
                $scope.editDBDetailsValue.DbObject = $scope.myDataTable.DatabaseDetails[0].DbObject;
                $scope.editDBDetailsValue.Description = $scope.myDataTable.DatabaseDetails[0].Description;
                $scope.editDBDetailsValue.DbType = $scope.myDataTable.DatabaseDetails[0].DbType;
              
                $scope.DBdetailsediting = true;

                $scope.editItemDBdetailsId = 0;

            } else {
                $scope.alerts.push({ type: 'warning', msg: 'Please complete the edit operation' });
            }
        }

        $scope.visible = function (node) {
            return !($scope.query && $scope.query.length > 0
                && node.Name.indexOf($scope.query) == -1);
        };

        $scope.search = function (name: string) {
            $scope.tabselected = 1;
            $scope.filterSearchArray = new Array();
            var found = $scope.searchDuplicateName($scope.nodeData, name);
            if (found) {
                $scope.filterSearchArray.unshift(found);
            }
        }

        $scope.searchCancel = function() {
            $scope.tabselected = 0;
            $scope.filterSearchArray = new Array();
            $scope.query = "";
        }


        //Other details
        $scope.setOtherdetailsActive = (index: number) => {
            otherDetailsBl.setOtherdetailsActive(index, $scope);
        }

        $scope.editOtherdetails = function (Otherdetails: AdditionalDetail, index: number) {
            otherDetailsBl.editOtherdetails(Otherdetails, index, $scope);
        }

        $scope.editOtherdetailsOk = function (Otherdetails: AdditionalDetail, index: number) {
            otherDetailsBl.editOtherdetailsOk(Otherdetails, index, $scope);
        }

        $scope.removeOtherdetailsCancel = function (Otherdetails: AdditionalDetail, index: number) {
            otherDetailsBl.removeOtherdetailsCancel(Otherdetails, index, $scope);
        }

        $scope.removeOtherdetails = function (index: number) {
            otherDetailsBl.removeOtherdetails(index, $scope);
        }

        $scope.addOtherdetails = function (scope: any) {
            otherDetailsBl.addOtherdetails(scope, $scope);
        }

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
                    Status:1,
                    Children: null
                });
                $scope.editing = true;

                $scope.editItem = nodeData.Path + "_NewNode" + scope.id;

                //backup
                $scope.editValue = "EnterDetails";

                $scope.activeMenu = nodeData.Path + "_NewNode" + scope.id;

                focus(nodeData.Path + "_NewNode" + scope.id);

            } else {
                $scope.alerts.push({ type:'warning',msg: 'Please complete the edit operation' });
            }

        };

        $scope.removeItem = function (scope) {
            var nodeData = scope.$modelValue;
            nodeData.Status=3;
        };
        //Node ----- End

        $scope.edit = function (scope) {

            if (!$scope.editing) {

                $scope.editing = true;
                var nodeData = scope.$modelValue;
                $scope.editItem = nodeData.Path;
               
                //backup
                $scope.editValue = nodeData.Name;

                //focus
                focus(nodeData.Path);

            } else {
                $scope.activeMenu = "EnterDetails";
                $scope.alerts.push({ type: 'warning', msg: 'Please complete the edit operation' });
            }
           
        };

        $scope.editok = function(scope) {        
            var nodeData = scope.$modelValue;
            if (!$scope.checkDuplicateName($scope.nodeData, scope.editValue)) {
                $scope.editing = false;            
                if (nodeData.Name == "EnterDetails") {
                    nodeData.Status = 1;
                } else {
                    nodeData.Status = 2;
                }
                nodeData.Name = scope.editValue;
                $scope.editValue = "";
                $scope.activeMenu = nodeData.Path;
            } else {
                if (nodeData.Name == "EnterDetails") {
                    $scope.alerts.push({ type: 'warning', msg: 'Please rename the newly added node' });
                } else {
                    alert("Duplicate Name Not allowed");
                    $scope.alerts.push({ type: 'warning', msg: 'Node name already exist, please rename' });
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
                url: Config.Constants.default.url
            }).success((status) => {
                console.log("success");
                $scope.alerts.push({ type: 'success', msg: 'Updated successfully' });
                $scope.init();
                }).error((error, status) => {
                    $scope.loadingNode = false;
                    $scope.alerts.push({ type: 'danger', msg: "Update Failed:"+ error +" " + status });
            });
        }

        $scope.setActive = function (menuItem: any) {
            $scope.loading = true;
            $scope.activeMenu = menuItem.Path;

            $scope.activedata = menuItem;
            if (menuItem.Children == null)
            $log.info("Children data load");
            $http({
                method: "GET",
                url: Config.Constants.default.url + '/' + menuItem.Path
            }).success((data: NodeDetail) => {
                $scope.myDataTable = data;
                $scope.loading = false;
            }).error((status:any) =>
            {
                $scope.loading = false;
            });


            //    then(response => {
            //    $scope.myDataTable = response.data;
            //});
        }

        $scope.collapseAll = function () {
            $scope.$broadcast('angular-ui-tree:collapse-all');
        };

        $scope.expandAll = function () {
            $scope.$broadcast('angular-ui-tree:expand-all');
        };      
    }


    export var app = angular.module('myApp', ['ui.tree', 'ngRoute', 'ui.bootstrap', 'ngSanitize', 'ngAside']);


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
    app.controller("InfluenceController", influenceController);
}















