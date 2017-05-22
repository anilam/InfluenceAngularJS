var App;
(function (App) {
    function loginController($scope, $rootScope, LoginService, $location, dBStore) {
        $rootScope.menuItems = [];
        $rootScope.authenticated = false;
        $scope.loading = false;
        LoginService.logout();
        $rootScope.menuItems = JSON.parse(App.Config.Constants.getMenuList.menu);
        $rootScope.activeMenu = $rootScope.menuItems[0].Menu;
        $rootScope.setActiveMenu = function (menuItem) {
            $rootScope.activeMenu = menuItem;
        };
        $rootScope.title = "NextGen Influence Login";
        $scope.logOnModel = new LogOnModel();
        $scope.logOnModel.Username = '';
        $scope.logOnModel.Password = '';
        $scope.formSubmit = function () {
            $scope.loading = true;
            LoginService.login(dBStore, $scope);
        };
    }
    App.loginController = loginController;
})(App || (App = {}));
//# sourceMappingURL=loginController.js.map