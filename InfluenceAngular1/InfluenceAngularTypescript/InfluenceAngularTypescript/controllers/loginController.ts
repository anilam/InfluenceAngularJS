module App {

    export function loginController($scope: IDiagnosticsScope, $rootScope: any, LoginService: any, $location: any, dBStore: DBStore) {
        $rootScope.title = "Nextgen Influence Login";
        $scope.logOnModel = new LogOnModel();
        $scope.logOnModel.Username = '';
        $scope.logOnModel.Password = ''; 

        $scope.formSubmit = function() {
            LoginService.login(dBStore,$scope);
        }
    }
}