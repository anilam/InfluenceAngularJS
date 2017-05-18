module App {

    export function loginController($scope: IDiagnosticsScope, $rootScope: any, LoginService: any, $location: any, dBStore: DBStore) {

        $rootScope.menuItems = [];
        $rootScope.authenticated = false;
        $scope.loading = false;
        LoginService.logout();
        $rootScope.menuItems = JSON.parse(Config.Constants.getMenuList.menu);
        $rootScope.activeMenu = $rootScope.menuItems[0].Menu;

        $rootScope.setActiveMenu = function (menuItem:string) {
            $rootScope.activeMenu = menuItem;
        }

        $rootScope.title = "Nextgen Influence Login";
        $scope.logOnModel = new LogOnModel();
        $scope.logOnModel.Username = '';
        $scope.logOnModel.Password = ''; 

        $scope.formSubmit = function () {
            $scope.loading = true;
            LoginService.login(dBStore,$scope);
        }
    }
}