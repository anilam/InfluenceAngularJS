var App;
(function (App) {
    function graphController($scope, LoginService, dBStore, $http) {
        $scope.graphmodel = {};
        $scope.labels = [];
        $scope.data = [];
        $scope.alerts = [];
        $scope.loading = true;
        dBStore.initGraph($scope, $http);
        var counts = {};
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };
        $scope.init = function () {
            $scope.labels = [];
            $scope.data = [];
        };
        $scope.generateGraph = function () {
            $scope.loading = true;
            $scope.labels = [];
            $scope.data = [];
            $scope.options = { cutoutPercentage: 75 };
            if ($scope.graphmodel.Dependencies.length > 0) {
                $scope.graphmodel.Dependencies.forEach(function (x) {
                    counts[x.ProductName] = (counts[x.ProductName] || 0) + 1;
                });
                for (var y in counts) {
                    $scope.data.push(counts[y]);
                    $scope.labels.push(y);
                }
            }
            else {
                $scope.alerts.push({ type: App.Config.ErrorType[App.Config.ErrorType.warning], msg: App.Config.Constants.errorMessage.grapherror });
            }
            $scope.loading = false;
        };
        //$scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        //$scope.series = ['Dependency'];
        //$scope.data = [
        //    [65, 59, 80, 81, 56, 55, 40],
        //    [28, 48, 40, 19, 86, 27, 90]
        //];
    }
    App.graphController = graphController;
})(App || (App = {}));
//# sourceMappingURL=graphController.js.map