var App;
(function (App) {
    function graphController($scope, LoginService, dBStore, $http) {
        $scope.graphmodel = {};
        $scope.labels = [];
        $scope.data = [];
        dBStore.initGraph($scope, $http);
        var counts = {};
        $scope.init = function () {
            $scope.labels = [];
            $scope.data = [];
        };
        $scope.generateGraph = function () {
            $scope.labels = [];
            $scope.data = [];
            $scope.options = { cutoutPercentage: 75 };
            $scope.graphmodel.Dependencies.forEach(function (x) {
                counts[x.ProductName] = (counts[x.ProductName] || 0) + 1;
            });
            for (var y in counts) {
                $scope.data.push(counts[y]);
                $scope.labels.push(y);
            }
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