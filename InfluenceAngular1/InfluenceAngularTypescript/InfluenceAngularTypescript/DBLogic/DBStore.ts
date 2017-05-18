module App {

    export class DBStore {
        constructor() {

        }

        saveNode = function($scope: IDiagnosticsScope, $http: angular.IHttpService) {
            $scope.loadingNode = true;
            var storedata = $scope.nodeData;
            console.log($scope.nodeData);
            $http({
                method: "Post",
                data: storedata.shift(),
                url: Config.Constants.default.url
            }).success((status: any) => {
                console.log("success");
                $scope.alerts.push({ type: Config.ErrorType[Config.ErrorType.success], msg: Config.Constants.errorMessage.success });
                $scope.init();
            }).error((error: any, status: any) => {
                $scope.loadingNode = false;
                $scope.alerts.push({ type: Config.ErrorType[Config.ErrorType.danger], msg: Config.Constants.errorMessage.failure + error + " " + status });
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
                $scope.alerts.push({ type: Config.ErrorType[Config.ErrorType.success], msg: Config.Constants.errorMessage.success });
                $scope.loading = false;
            }).error((error, status) => {
                $scope.alerts.push({ type: Config.ErrorType[Config.ErrorType.danger], msg: Config.Constants.errorMessage.failure + error + " " + status });
                $scope.loading = false;
            });
        }


        excelExport = function ($scope: IDiagnosticsScope, $http: angular.IHttpService,urllist:string) {
            $http({
                method: "GET",
                url: Config.Constants.default.reportURL + urllist
            }).success(function (data:any, status:any, headers:any, config:any) {
                var anchor = angular.element('<a/>');
                anchor.attr({
                    href: Config.Constants.default.reportURL + urllist,
                    target: '_blank',
                    download: 'export.xlsx'
                })[0].click();
                $scope.alerts.push({ type: Config.ErrorType[Config.ErrorType.success], msg: Config.Constants.errorMessage.downloadSuccess });
            }).error((error, status) => {
                $scope.alerts.push({ type: Config.ErrorType[Config.ErrorType.danger], msg: Config.Constants.errorMessage.failure + error + " " + status });
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
                    $scope.alerts.push({
                        type: Config.ErrorType[Config.ErrorType.success],
                        msg: Config.Constants.errorMessage.nodesuccess
                    });
                    $scope.loadingNode = false;
                }).error((error, status) => {
                    $scope.loadingNode = false;
                    $scope.alerts.push({
                        type: Config.ErrorType[Config.ErrorType.danger],
                        msg: Config.Constants.errorMessage.failure + error + " " + status
                    });
                });
        }

        initGraph = function ($scope: IDiagnosticsScope, $http: angular.IHttpService) {
            $http({
                method: "GET",
                url: Config.Constants.default.graphURL
            }).success((data:any) => {
                $scope.graphData = data;
                $scope.alerts.push({
                    type: Config.ErrorType[Config.ErrorType.success],
                    msg: Config.Constants.errorMessage.graphsuccess
                });
            }).error((error, status) => {
                $scope.loadingNode = false;
                $scope.alerts.push({
                    type: Config.ErrorType[Config.ErrorType.danger],
                    msg: Config.Constants.errorMessage.loadingfailure + error + " " + status
                });
            });
        }

        authenticate = function (logonmodel: LogOnModel, $http: angular.IHttpService) {
            return $http({
                method: "POST",
                data: logonmodel,
                url: Config.Constants.default.authentication
            });
        }

        saveSettings = function ($scope: IDiagnosticsScope, $http: angular.IHttpService,userName:string) {
            $scope.loadingNode = true;
            $http({
                method: "PUT",
                data:$scope.settings,
                url: Config.Constants.default.settings + userName
            }).success((data: any) => {
                $scope.loadingNode = false;
                $scope.alerts.push({
                    type: Config.ErrorType[Config.ErrorType.success],
                    msg: Config.Constants.errorMessage.settingsuccess
                });
                }).error((error, status) => {
                    $scope.alerts.push({
                        type: Config.ErrorType[Config.ErrorType.danger],
                        msg: Config.Constants.errorMessage.failure + error + " " + status
                    });
                $scope.loadingNode = false;
            });
        }
    }
}