var App;
(function (App) {
    function loginController($scope, $rootScope, LoginService, $location) {
        $rootScope.title = "Nextgen Influence Login";
        $scope.formSubmit = function () {
            if (LoginService.login($scope.username, $scope.password)) {
                $scope.error = '';
                $scope.username = '';
                $scope.password = '';
                $location.path("/");
            }
            else {
                $scope.error = "Incorrect username/password !";
            }
        };
    }
    App.loginController = loginController;
})(App || (App = {}));
//# sourceMappingURL=loginController.js.map