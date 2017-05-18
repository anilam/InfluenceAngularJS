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
            this.initNode = function ($scope, $http) {
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
})(App || (App = {}));
//# sourceMappingURL=DBStore.js.map