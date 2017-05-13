var App;
(function (App) {
    var Mode = App.Config.Mode;
    var Constants = App.Config.Constants;
    function influenceController($scope, $http, $log, $filter, functionalDetailsBl, otherDetailsBl, dBDetailsBL, nodeBl, focus, dBStore, $aside) {
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
        var s = new Array();
        s.push({ Label: "", count: "" });
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
            dBStore.initNode($scope, $http);
        };
        // $scope.init();
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
                Constants.runningMode = $scope.settings.runningMode;
                if ($scope.settings.runningMode == Mode.Pm) {
                    $scope.init();
                }
            }, function () {
                $log.info('modal-component dismissed at: ' + new Date());
            });
        };
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
        // Save all
        $scope.saveNodeDetails = function () {
            dBStore.saveNodeDetails($scope, $http);
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
            nodeBl.saveNode($scope, $http, dBStore);
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
    }
    App.influenceController = influenceController;
})(App || (App = {}));
//# sourceMappingURL=influenceController.js.map