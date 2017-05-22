var App;
(function (App) {
    var DBStore = (function () {
        function DBStore() {
            this.saveNode = function ($scope, $http) {
                $scope.loadingNode = true;
                var storedata = $scope.nodeData;
                console.log($scope.nodeData);
                $http({
                    method: "Post",
                    data: storedata.shift(),
                    url: App.Config.Constants.default.url
                }).success(function (status) {
                    console.log("success");
                    $scope.alerts.push({ type: App.Config.ErrorType[App.Config.ErrorType.success], msg: App.Config.Constants.errorMessage.success });
                    $scope.init();
                }).error(function (error, status) {
                    $scope.loadingNode = false;
                    $scope.alerts.push({ type: App.Config.ErrorType[App.Config.ErrorType.danger], msg: App.Config.Constants.errorMessage.failure + error + " " + status });
                });
            };
            this.saveNodeDetails = function ($scope, $http) {
                $scope.loading = true;
                $http({
                    method: "Post",
                    data: $scope.myDataTable,
                    url: App.Config.Constants.default.url + '/' + $scope.activedata.Path + '/' + "detail"
                }).success(function (status) {
                    console.log("success");
                    $scope.alerts.push({ type: App.Config.ErrorType[App.Config.ErrorType.success], msg: App.Config.Constants.errorMessage.success });
                    $scope.loading = false;
                }).error(function (error, status) {
                    $scope.alerts.push({ type: App.Config.ErrorType[App.Config.ErrorType.danger], msg: App.Config.Constants.errorMessage.failure + error + " " + status });
                    $scope.loading = false;
                });
            };
            this.excelExport = function ($scope, $http, urllist) {
                $http({
                    method: "GET",
                    url: App.Config.Constants.default.reportURL + urllist
                }).success(function (data, status, headers, config) {
                    var anchor = angular.element('<a/>');
                    anchor.attr({
                        href: App.Config.Constants.default.reportURL + urllist,
                        target: '_blank',
                        download: 'export.xlsx'
                    })[0].click();
                    $scope.alerts.push({ type: App.Config.ErrorType[App.Config.ErrorType.success], msg: App.Config.Constants.errorMessage.downloadSuccess });
                }).error(function (error, status) {
                    $scope.alerts.push({ type: App.Config.ErrorType[App.Config.ErrorType.danger], msg: App.Config.Constants.errorMessage.failure + error + " " + status });
                });
            };
            this.initNode = function ($scope, $http, $timeout) {
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
                    $scope.alerts.push({
                        type: App.Config.ErrorType[App.Config.ErrorType.success],
                        msg: App.Config.Constants.errorMessage.nodesuccess
                    });
                    //Expand Node
                    $timeout(function () {
                        var rootScope = getRootNodesScope();
                        //  rootScope.collapseAll();
                        expandNode('Nextgen');
                    }, 2);
                    $scope.loadingNode = false;
                }).error(function (error, status) {
                    $scope.loadingNode = false;
                    $scope.alerts.push({
                        type: App.Config.ErrorType[App.Config.ErrorType.danger],
                        msg: App.Config.Constants.errorMessage.failure + error + " " + status
                    });
                });
            };
            this.initGraph = function ($scope, $http) {
                $http({
                    method: "GET",
                    url: App.Config.Constants.default.graphURL
                }).success(function (data) {
                    $scope.graphData = data;
                    $scope.alerts.push({
                        type: App.Config.ErrorType[App.Config.ErrorType.success],
                        msg: App.Config.Constants.errorMessage.graphsuccess
                    });
                    $scope.loading = false;
                }).error(function (error, status) {
                    $scope.loading = false;
                    $scope.alerts.push({
                        type: App.Config.ErrorType[App.Config.ErrorType.danger],
                        msg: App.Config.Constants.errorMessage.loadingfailure + error + " " + status
                    });
                });
            };
            this.authenticate = function (logonmodel, $http) {
                return $http({
                    method: "POST",
                    data: logonmodel,
                    url: App.Config.Constants.default.authentication
                });
            };
            this.saveSettings = function ($scope, $http, userName) {
                $scope.loadingNode = true;
                $http({
                    method: "PUT",
                    data: $scope.settings,
                    url: App.Config.Constants.default.settings + userName
                }).success(function (data) {
                    $scope.loadingNode = false;
                    $scope.alerts.push({
                        type: App.Config.ErrorType[App.Config.ErrorType.success],
                        msg: App.Config.Constants.errorMessage.settingsuccess
                    });
                }).error(function (error, status) {
                    $scope.alerts.push({
                        type: App.Config.ErrorType[App.Config.ErrorType.danger],
                        msg: App.Config.Constants.errorMessage.failure + error + " " + status
                    });
                    $scope.loadingNode = false;
                });
            };
        }
        return DBStore;
    }());
    App.DBStore = DBStore;
    //Expand Node Functionality
    function getRootNodesScope() {
        return angular.element(document.getElementById("tree-root")).scope().$nodesScope.childNodes()[0];
    }
    function expandNode(nodeName) {
        // We need to get the whole path to the node to open all the nodes on the path
        var parentScopes = getScopePath(nodeName);
        for (var i = 0; i < parentScopes.length; i++) {
            parentScopes[i].expand();
        }
    }
    function getScopePath(nodeName) {
        return getScopePathIter(nodeName, getRootNodesScope(), []);
    }
    function getScopePathIter(nodeName, scope, parentScopeList) {
        if (!scope)
            return null;
        var newParentScopeList = parentScopeList.slice();
        newParentScopeList.push(scope);
        if (scope.$modelValue && scope.$modelValue.Name === nodeName)
            return newParentScopeList;
        var foundScopesPath = null;
        var childNodes = scope.childNodes();
        //  for (var i = 0; foundScopesPath === null && i < childNodes.length; i++) {
        return foundScopesPath = getScopePathIter(nodeName, childNodes[0], newParentScopeList);
    }
})(App || (App = {}));
//# sourceMappingURL=DBStore.js.map