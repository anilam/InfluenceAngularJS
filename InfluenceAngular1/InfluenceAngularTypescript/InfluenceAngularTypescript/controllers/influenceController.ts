module App {
    import Mode = App.Config.Mode;
    import Constants = App.Config.Constants;

    export function influenceController($scope: IDiagnosticsScope,
        $http: angular.IHttpService,
        $log: angular.ILogService,
        $filter: any,
        functionalDetailsBl: FunctionalDetailsBl,
        otherDetailsBl: OtherDetailsBl,
        dBDetailsBL: DBDetailsBL,
        nodeBl: NodeBl,
        focus: any,
        dBStore: DBStore,
        $aside: any) {




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
        $scope.settings.runningMode = Mode.Select;
        $scope.tabselected = 0;
        $scope.loading = false;
        $scope.loadingNode = false;
        $scope.exportList = new Array();
        $scope.id = 0;
        $scope.alerts = [];

        var findArrayObject = function (object: any, name: string) {
            return $filter('filter')(object, { Path: name }, true)[0];
        }

        $scope.updateExcelExport = function (path: string, name: string) {
         
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
        }


        $scope.updateSearchExcelExport = function (path: string, name: string) {
            $scope.updateExcelExport("search-" + path, name);
        }

        $scope.init = function () {
           dBStore.initNode($scope,$http);
        }

       // $scope.init();
        //aside
        $scope.asideState = {
            open: false,
            position: 'left'
        }

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
                controller: function ($scope: any, $uibModalInstance: any, selectedSettings: Settings) {
                    $scope.settings = selectedSettings;

                    $scope.ok = function (e: any) {
                        $uibModalInstance.close($scope.settings);
                        e.stopPropagation();
                    };
                    $scope.cancel = function (e: any) {
                        $uibModalInstance.dismiss();
                        e.stopPropagation();
                    };
                }
            });
            modalInstance.result.then(function (selectedSettings: Settings) {
                $scope.settings = selectedSettings;
                if ($scope.settings.expandTree) {
                    $scope.expandAll();
                }
                if ($scope.settings.collapseTree) {
                    $scope.collapseAll();
                }
                Constants.runningMode = $scope.settings.runningMode;
                if ($scope.settings.runningMode == Mode.Pm) {
                    $scope.init();
                }

            }, function () {
                $log.info('modal-component dismissed at: ' + new Date());
            });
        }

        $scope.toggle = function (scope) {
            scope.toggle();
        };

        $scope.toggleOpen = function (scope) {
            if (scope.collapsed) {
                scope.toggle();
            }
        };

        $scope.moveLastToTheBeginning = function () {
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
        }  

        // Save all
        $scope.saveNodeDetails = function () {
            dBStore.saveNodeDetails($scope,$http);
        }

        //func details
        $scope.setFuncdetailsActive = (index: number) => {
            functionalDetailsBl.setFuncdetailsActive(index, $scope);
        }

        $scope.editFuncdetails = function (Funcdetails: FunctionalDetail, index: number) {
            functionalDetailsBl.editFuncdetails(Funcdetails, index, $scope, focus);
        }

        $scope.editFuncdetailsOk = function (Funcdetails: FunctionalDetail, index: number) {
            functionalDetailsBl.editFuncdetailsOk(Funcdetails, index, $scope);
        }

        $scope.removeFuncdetailsCancel = function (Funcdetails: FunctionalDetail, index: number) {
            functionalDetailsBl.removeFuncdetailsCancel(Funcdetails, index, $scope);
        }

        $scope.removeFuncdetails = function (index: number) {
            functionalDetailsBl.removeFuncdetails(index, $scope);
        }

        $scope.addFuncdetails = function (scope: any) {
            functionalDetailsBl.addFuncdetails(scope, $scope, focus);
        }

        //DB Details
        $scope.setDBdetailsActive = (index: number) => {
            dBDetailsBL.setDBdetailsActive(index, $scope);
        }

        $scope.editDBdetails = function (DBdetails: DatabaseDetail, index: number) {
            dBDetailsBL.editDBdetails(DBdetails, index, $scope, focus);
        }

        $scope.editDBdetailsOk = function (DBdetails: DatabaseDetail, index: number) {
            dBDetailsBL.editDBdetailsOk(DBdetails, index, $scope);
        }

        $scope.removeDBdetailsCancel = function (DBdetails: DatabaseDetail, index: number) {
            dBDetailsBL.removeDBdetailsCancel(DBdetails, index, $scope);
        }

        $scope.removeDBdetails = function (index: number) {
            dBDetailsBL.removeDBdetails(index, $scope);
        }

        $scope.addDBdetails = function (scope: any) {
            dBDetailsBL.addDBdetails(scope, $scope, focus);
        }

        //Other details
        $scope.setOtherdetailsActive = (index: number) => {
            otherDetailsBl.setOtherdetailsActive(index, $scope);
        }

        $scope.editOtherdetails = function (Otherdetails: AdditionalDetail, index: number) {
            otherDetailsBl.editOtherdetails(Otherdetails, index, $scope, focus);
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
            otherDetailsBl.addOtherdetails(scope, $scope, focus);
        }

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
            nodeBl.saveNode($scope, $http, dBStore);
        }

        $scope.setActive = function (menuItem: any) {
            $scope.loading = true;
            nodeBl.setActive(menuItem, $scope, $http, $log);
        }

        $scope.collapseAll = function () {
            nodeBl.collapseAll($scope);
        };

        $scope.expandAll = function () {
            nodeBl.expandAll($scope);
        };


        //serach

        $scope.search = function (name: string) {
            $scope.tabselected = 1;
            $scope.filterSearchArray = new Array();
            var found = $scope.searchDuplicateName($scope.nodeData, name);
            if (found) {
                $scope.filterSearchArray.unshift(found);
            }
        }

        $scope.searchCancel = function () {
            $scope.tabselected = 0;
            $scope.filterSearchArray = new Array();
            $scope.query = "";
        }

        $scope.searchDuplicateName = (subMenuItems: any, name: string) => {
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
        }

    }
}