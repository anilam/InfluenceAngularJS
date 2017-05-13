module App {
    export class DBStore {
        constructor() {

        }

        saveNode = function($scope: IDiagnosticsScope, $http: angular.IHttpService) {
            $scope.loadingNode = true;
            var storedata = $scope.nodeData;
            $http({
                method: "Post",
                data: storedata.shift(),
                url: Config.Constants.default.url
            }).success((status: any) => {
                console.log("success");
                $scope.alerts.push({ type: 'success', msg: 'Updated successfully' });
                $scope.init();
            }).error((error: any, status: any) => {
                $scope.loadingNode = false;
                $scope.alerts.push({ type: 'danger', msg: "Update Failed:" + error + " " + status });
            });
        }

        saveNodeDetails = function($scope: IDiagnosticsScope, $http: angular.IHttpService) {
            $scope.loading = true;
            $http({
                method: "Post",
                data: $scope.myDataTable,
                url: Config.Constants.default.url + '/' + $scope.activedata.Path + '/' + "detail"
            }).success((status) => {
                console.log("success");
                $scope.alerts.push({ type: 'success', msg: 'Updated successfully' });
                $scope.loading = false;
            }).error((error, status) => {
                $scope.alerts.push({ type: 'danger', msg: "Update Failed:" + error + " " + status });
                $scope.loading = false;
            });
        }

        initNode = function ($scope: IDiagnosticsScope, $http: angular.IHttpService) {
            $scope.loadingNode = true;
            $scope.nodeData = [];
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
    }
}