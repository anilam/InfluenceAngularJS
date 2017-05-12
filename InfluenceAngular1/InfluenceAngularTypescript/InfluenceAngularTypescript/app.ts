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
        updateExcelExport: (index: number, scope: any) => void;
        exportList: any;
        id:number;
        UpdatePathNullToInsertedNode: (subMenuItems: any, status: number) => any;
    }

    export function influenceController($scope: IDiagnosticsScope,
        $http: angular.IHttpService,
        $log: angular.ILogService,
        $filter:any,
        $timeout: angular.ITimeoutService,
        functionalDetailsBl:FunctionalDetailsBl,
        $aside:any) {
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

        $scope.updateExcelExport = function (index: any, scope: any) {
            var exportData = $scope.nodeData;

            if (index) { //If it is checked
                $scope.exportList.push({
                    id: index,
                    Name: exportData.Name,
                    Path: exportData.Path
                });
            } else {
                var index = $scope.exportList.indexOf(index);
                if (index > -1) {
                    $scope.exportList.splice(index, 1);
                }
            }
        }

        $scope.init = function() {
            $scope.loadingNode = true;
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
                $scope.loading = false;
            }).error((status: Number) => {
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
                alert("Please Complete the editiing");
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
                alert("Please complete the editing");
            }
        }

        $scope.visible = function (node) {
            return !($scope.query && $scope.query.length > 0
                && node.Name.indexOf($scope.query) == -1);
        };

        $scope.search = function (name: string) {
            $scope.tabselected = 1;
            $scope.filterSearchArray = new Array();
            $scope.searchDuplicateName($scope.nodeData, name);
        }

        $scope.searchCancel = function() {
            $scope.tabselected = 0;
            $scope.filterSearchArray = new Array();
            $scope.query = "";
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

            } else {
                alert("Please complete the editing");
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

            } else {
                $scope.activeMenu = "EnterDetails";
                alert("Please Complete the editiing");
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
                    alert("Please Rename the Node");
                } else {
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
                url: Config.Constants.default.url
            }).success((status) => {
                console.log("success");
                $scope.init();
            }).error((status: Number) => {
                $scope.loadingNode = false;
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


    export var app = angular.module('myApp', ['ui.tree', 'ngRoute', 'ui.bootstrap', 'ngSanitize','ngAside']);

    app.directive('focusMe', <any>function ($timeout: any) {
        return {
            scope: { trigger: '=?focusMe' },
            link: function (scope:any, element:any) {
                scope.$watch('trigger', function (value:any) {
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

    angular.module('myApp').factory('functionalDetailsBl', [(): FunctionalDetailsBl => {
        return new FunctionalDetailsBl();
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















