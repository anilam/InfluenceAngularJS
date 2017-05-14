var App;
(function (App) {
    var Mode = App.Config.Mode;
    var DBStore = (function () {
        function DBStore() {
            this.saveNode = function ($scope, $http) {
                $scope.loadingNode = true;
                var storedata = $scope.nodeData;
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
            this.initNode = function ($scope, $http) {
                $scope.loadingNode = true;
                $scope.nodeData = [];
                ////aside
                if (App.Config.Constants.runningMode == Mode.Pm) {
                    $http({
                        method: "GET",
                        url: App.Config.Constants.default.url
                    }).success(function (data) {
                        var arraypush = new Array();
                        arraypush.unshift(data);
                        $scope.nodeData = arraypush;
                        $scope.alerts.push({
                            type: App.Config.ErrorType[App.Config.ErrorType.success],
                            msg: App.Config.Constants.errorMessage.success
                        });
                        $scope.loadingNode = false;
                    }).error(function (error, status) {
                        $scope.loadingNode = false;
                        $scope.alerts.push({
                            type: App.Config.ErrorType[App.Config.ErrorType.danger],
                            msg: App.Config.Constants.errorMessage.failure + error + " " + status
                        });
                    });
                }
                else {
                    $scope.loadingNode = false;
                }
            };
        }
        return DBStore;
    }());
    App.DBStore = DBStore;
})(App || (App = {}));
//# sourceMappingURL=DBStore.js.map