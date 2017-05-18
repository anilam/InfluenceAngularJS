var App;
(function (App) {
    var DBDetailsBL = (function () {
        function DBDetailsBL() {
            this.setDBdetailsActive = function (index, $scope) {
                $scope.activeDBdetailsId = index;
            };
            this.editDBdetails = function (DBdetails, index, $scope, focus) {
                if (!$scope.DBdetailsediting) {
                    $scope.DBdetailsediting = true;
                    $scope.editItemDBdetailsId = index;
                    focus("DBdetails-" + index);
                    //backup
                    //$scope.editDBDetailsValue = new DBtionalDetail();
                    $scope.editDBDetailsValue = new Array();
                    $scope.editDBDetailsValue.DbObject = $scope.myDataTable.DatabaseDetails[index].DbObject;
                    $scope.editDBDetailsValue.DbType = $scope.myDataTable.DatabaseDetails[index].DbType;
                    $scope.editDBDetailsValue.Description = $scope.myDataTable.DatabaseDetails[index].Description;
                }
                else {
                    $scope.alerts.push({ type: App.Config.ErrorType[App.Config.ErrorType.warning], msg: App.Config.Constants.errorMessage.editing });
                }
            };
            this.editDBdetailsOk = function (DBdetails, index, $scope) {
                if ($scope.editDBDetailsValue.DbObject == "" && $scope.editDBDetailsValue.DbType == "" && $scope.editDBDetailsValue.Description == "") {
                    $scope.alerts.push({ type: App.Config.ErrorType[App.Config.ErrorType.warning], msg: App.Config.Constants.errorMessage.validateinput });
                }
                else {
                    $scope.DBdetailsediting = false;
                    //Mapping
                    $scope.myDataTable.DatabaseDetails[index].DbObject = $scope.editDBDetailsValue.DbObject;
                    $scope.myDataTable.DatabaseDetails[index].DbType = $scope.editDBDetailsValue.DbType;
                    $scope.myDataTable.DatabaseDetails[index].Description = $scope.editDBDetailsValue.Description;
                }
            };
            this.removeDBdetailsCancel = function (DBdetails, index, $scope) {
                $scope.DBdetailsediting = false;
                if (DBdetails.DbObject == "" && DBdetails.DbType == "" && DBdetails.Description == "") {
                    $scope.myDataTable.DatabaseDetails.splice(index, 1);
                }
            };
            this.removeDBdetails = function (index, $scope) {
                $scope.myDataTable.DatabaseDetails.splice(index, 1);
            };
            this.addDBdetails = function (scope, $scope, focus) {
                scope.dbsearch = '';
                if (!$scope.myDataTable.DatabaseDetails) {
                    $scope.myDataTable.DatabaseDetails = [];
                }
                if ($scope.DBdetailsediting != true) {
                    $scope.myDataTable.DatabaseDetails.unshift({
                        DbObject: "",
                        Description: "",
                        DbType: "",
                        MachineName: "",
                        ModifyDtTm: "",
                        Modifyby: ""
                    });
                    $scope.editDBDetailsValue = new Array();
                    $scope.editDBDetailsValue.DbObject = $scope.myDataTable.DatabaseDetails[0].DbObject;
                    $scope.editDBDetailsValue.Description = $scope.myDataTable.DatabaseDetails[0].Description;
                    $scope.editDBDetailsValue.DbType = $scope.myDataTable.DatabaseDetails[0].DbType;
                    $scope.DBdetailsediting = true;
                    $scope.editItemDBdetailsId = 0;
                    focus("DBdetails-0");
                }
                else {
                    $scope.alerts.push({ type: App.Config.ErrorType[App.Config.ErrorType.warning], msg: App.Config.Constants.errorMessage.editing });
                }
            };
        }
        return DBDetailsBL;
    }());
    App.DBDetailsBL = DBDetailsBL;
})(App || (App = {}));
//# sourceMappingURL=DBDetailsBL.js.map