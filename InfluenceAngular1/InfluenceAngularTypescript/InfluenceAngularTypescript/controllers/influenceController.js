var App;
(function (App) {
    var Constants = App.Config.Constants;
    function influenceController($scope, $http, $log, $filter, functionalDetailsBl, otherDetailsBl, dBDetailsBL, nodeBl, focus, dBStore, LoginService, $rootScope, $aside) {
        $rootScope.authenticated = LoginService.isAuthenticated();
        $scope.nodeData = [];
        $scope.editing = false;
        $scope.Funcdetailsediting = false;
        $scope.DBdetailsediting = false;
        $scope.Otherdetailsediting = false;
        $scope.settings = new UserSetting();
        $scope.settings.Role = '';
        $scope.editOtherDetailsValue = [];
        $scope.settings = LoginService.userSettingsInfo().Setting;
        $scope.settings.Role = LoginService.userSettingsInfo().Role;
        Constants.runningMode = $scope.settings.DefaultSource;
        $scope.tabselected = 0;
        $scope.loading = false;
        $scope.loadingNode = false;
        $scope.exportList = new Array();
        $scope.id = 0;
        $scope.alerts = [];
        $scope.funcsortType = 'Impact';
        $scope.funcsortReverse = false;
        $scope.funcsearch = '';
        $scope.dbsortType = 'DbObject';
        $scope.dbsortReverse = false;
        $scope.dbsearch = '';
        $scope.OthersortType = 'Description';
        $scope.OthersortReverse = false;
        $scope.Othersearch = '';
        $scope.searchFuncDetails = ''; // set the default search/filter term
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
        $scope.exportToExcel = function () {
            var urllist = "";
            for (var i = 0; i < $scope.exportList.length; i++) {
                urllist = urllist + $scope.exportList[i].Path + ',';
            }
            urllist = urllist.slice(0, -1);
            dBStore.excelExport($scope, $http, urllist);
        };
        $scope.init = function () {
            $scope.exportList = new Array();
            $scope.filterSearchArray = new Array();
            dBStore.initNode($scope, $http);
        };
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
                controller: function ($scope, $uibModalInstance, selectedSettings, $http) {
                    $scope.settings = selectedSettings;
                    $scope.ok = function (e) {
                        $uibModalInstance.close($scope.settings);
                        e.stopPropagation();
                    };
                    $scope.cancel = function (e) {
                        $uibModalInstance.dismiss($scope.settings);
                        e.stopPropagation();
                    };
                }
            });
            modalInstance.result.then(function (selectedSettings) {
                $scope.settings = selectedSettings;
                //if ($scope.settings.ExpandTree) {
                //    $scope.expandAll();
                //} else {
                //    $scope.collapseAll();
                //}             
                dBStore.saveSettings($scope, $http, LoginService.getUserName());
                if (Constants.runningMode !== $scope.settings.DefaultSource) {
                    Constants.runningMode = $scope.settings.DefaultSource;
                    $scope.init();
                }
            }, function () {
                $log.info('modal-component dismissed at: ' + new Date());
            });
        };
        if (Constants.runningMode != null && Constants.runningMode != "") {
            $scope.init();
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
            if (menuItem.ParentPath != null) {
                $scope.myDataTable = new NodeDetail();
                $scope.activeMenu = menuItem.Path;
            }
            else {
                $scope.loading = true;
                nodeBl.setActive(menuItem, $scope, $http, $log);
            }
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
        //Load Settings
        if ($scope.settings.ExpandTree) {
            $scope.expandAll();
        }
        else {
            $scope.collapseAll();
        }
    }
    App.influenceController = influenceController;
})(App || (App = {}));
//# sourceMappingURL=influenceController.js.map