module App {

    export function loginController($scope: IDiagnosticsScope, $rootScope: any, LoginService: any, $location: any, dBStore: DBStore) {

        $rootScope.menuItems = [];
        $rootScope.authenticated = false;
        LoginService.logout();
        $rootScope.menuItems.push({ Menu: "Home", Url: "#!/" });
        $rootScope.menuItems.push({ Menu: "Graph", Url: "#!/graph" });
        $rootScope.menuItems.push({ Menu: "Logout", Url: "#!/login" });
        $rootScope.activeMenu = $rootScope.menuItems[0].Menu;

        $rootScope.setActiveMenu = function (menuItem:string) {
            $rootScope.activeMenu = menuItem;
        }

        $rootScope.title = "Nextgen Influence Login";
        $scope.logOnModel = new LogOnModel();
        $scope.logOnModel.Username = '';
        $scope.logOnModel.Password = ''; 

        $scope.formSubmit = function() {
            LoginService.login(dBStore,$scope);
        }
    }
}