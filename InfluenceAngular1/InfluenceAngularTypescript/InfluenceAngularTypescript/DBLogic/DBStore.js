var App;
(function (App) {
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
                    $scope.alerts.push({ type: 'success', msg: 'Updated successfully' });
                    $scope.init();
                }).error(function (error, status) {
                    $scope.loadingNode = false;
                    $scope.alerts.push({ type: 'danger', msg: "Update Failed:" + error + " " + status });
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
                    $scope.alerts.push({ type: 'success', msg: 'Updated successfully' });
                    $scope.loading = false;
                }).error(function (error, status) {
                    $scope.alerts.push({ type: 'danger', msg: "Update Failed:" + error + " " + status });
                    $scope.loading = false;
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
                    $scope.loadingNode = false;
                }).error(function () {
                    $scope.loadingNode = false;
                });
            };
        }
        return DBStore;
    }());
    App.DBStore = DBStore;
})(App || (App = {}));
//# sourceMappingURL=DBStore.js.map