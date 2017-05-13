module App {
    export class NodeBl {
        constructor() {
          
        }

        newSubItem = function (scope: any, $scope: IDiagnosticsScope, focus:any) {
            $scope.id = $scope.id + 1;

            if ($scope.editing != true) {

                $scope.toggleOpen(scope);

                var nodeData = scope.$modelValue;
                if (nodeData.Children == null) {
                    nodeData.Children = [];
                }
                nodeData.Children.push({
                    //  id: nodeData.id * 10 + nodeData.nodes.length,
                    Name: "EnterDetails",
                    Path: nodeData.Path + "_NewNode" + scope.id,
                    ParentPath: nodeData.Path,
                    Status: 1,
                    Children: null
                });
                $scope.editing = true;

                $scope.editItem = nodeData.Path + "_NewNode" + scope.id;

                //backup
                $scope.editValue = "EnterDetails";

                $scope.activeMenu = nodeData.Path + "_NewNode" + scope.id;

                focus(nodeData.Path + "_NewNode" + scope.id);



            } else {
                $scope.alerts.push({ type: 'warning', msg: 'Please complete the edit operation' });
            }

        };

        removeItem = function (scope: any, $scope: IDiagnosticsScope) {
            var nodeData = scope.$modelValue;
            nodeData.Status = 3;
        };

        edit = function (scope: any, $scope: IDiagnosticsScope,focus:any) {

            if (!$scope.editing) {

                $scope.editing = true;
                var nodeData = scope.$modelValue;
                $scope.editItem = nodeData.Path;

                //backup
                $scope.editValue = nodeData.Name;

                //focus
                focus(nodeData.Path);

            } else {
                $scope.activeMenu = "EnterDetails";
                $scope.alerts.push({ type: 'warning', msg: 'Please complete the edit operation' });
            }

        };

        editok = function (scope: any, $scope: IDiagnosticsScope) {
            var nodeData = scope.$modelValue;
            if (!$scope.checkDuplicateName($scope.nodeData, scope.editValue)) {
                $scope.editing = false;
                if (nodeData.Name == "EnterDetails") {
                    nodeData.Status = 1;
                } else {
                    nodeData.Status = 2;
                }
                nodeData.Name = scope.editValue;
                $scope.editValue = "";
                $scope.activeMenu = nodeData.Path;
            } else {
                if (nodeData.Name == "EnterDetails") {
                    $scope.alerts.push({ type: 'warning', msg: 'Please rename the newly added node' });
                } else {
                    alert("Duplicate Name Not allowed");
                    $scope.alerts.push({ type: 'warning', msg: 'Node name already exist, please rename' });
                }

            }
        };

        editcancel = function (scope: any, $scope: IDiagnosticsScope) {
            scope.editValue = $scope.editValue;
            $scope.editing = false;
            var nodeData = scope.$modelValue;
            if (nodeData.Name == "EnterDetails") {
                scope.remove();
            }
        };

        saveNode = function ($scope: IDiagnosticsScope, $http: angular.IHttpService, dBStore:DBStore) {
            dBStore.saveNode($scope, $http);
        }

        setActive = function (menuItem: any, $scope: IDiagnosticsScope, $http: angular.IHttpService,$log:angular.ILogService) {
            $scope.loading = true;
            $scope.activeMenu = menuItem.Path;

            $scope.activedata = menuItem;
            if (menuItem.Children == null)
                $log.info("Children data load");
            $http({
                method: "GET",
                url: Config.Constants.default.url + '/' + menuItem.Path
            }).success((data: NodeDetail) => {
                $scope.myDataTable = data;
                $scope.loading = false;
            }).error((status: any) => {
                $scope.loading = false;
            });
        }

        collapseAll = function ($scope: IDiagnosticsScope) {
            $scope.$broadcast('angular-ui-tree:collapse-all');
        };

        expandAll = function ($scope: IDiagnosticsScope) {
            $scope.$broadcast('angular-ui-tree:expand-all');
        };


    }
}