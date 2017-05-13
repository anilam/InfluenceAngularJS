module App {

    export function loginController($scope: IDiagnosticsScope, $rootScope: any, LoginService: any, $location:any) {
        $rootScope.title = "Nextgen Influence Login";

        $scope.formSubmit = function () {
            if (LoginService.login($scope.username, $scope.password)) {
                $scope.error = '';
                $scope.username = '';
                $scope.password = '';
                $location.path("/");
            } else {
                $scope.error = "Incorrect username/password !";
            }
        };

    }
}