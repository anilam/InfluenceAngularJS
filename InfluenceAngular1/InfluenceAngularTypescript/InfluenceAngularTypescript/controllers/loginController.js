var App;
(function (App) {
    function loginController($scope, $rootScope, LoginService, $location, dBStore) {
        $rootScope.title = "Nextgen Influence Login";
        $scope.logOnModel = new LogOnModel();
        $scope.logOnModel.Username = '';
        $scope.logOnModel.Password = '';
        $scope.formSubmit = function () {
            LoginService.login(dBStore, $scope);
        };
    }
    App.loginController = loginController;
})(App || (App = {}));
//# sourceMappingURL=loginController.js.map