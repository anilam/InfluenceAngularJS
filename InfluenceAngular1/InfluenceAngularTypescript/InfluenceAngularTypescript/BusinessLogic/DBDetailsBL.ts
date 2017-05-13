module App {
    export class  DBDetailsBL {
        constructor() {


        }

        setDBdetailsActive = (index: number, $scope:IDiagnosticsScope) => {
            $scope.activeDBdetailsId = index;
        }

        editDBdetails = function (DBdetails: DatabaseDetail, index: number, $scope: IDiagnosticsScope, focus:any) {
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

            } else {
                $scope.alerts.push({ type: 'warning', msg: 'Please complete the edit operation' });
            }
        }

        editDBdetailsOk = function (DBdetails: DatabaseDetail, index: number, $scope: IDiagnosticsScope) {
            if ($scope.editDBDetailsValue.DbObject == "" && $scope.editDBDetailsValue.DbType =="" && $scope.editDBDetailsValue.Description == "") {
                alert("Please enter the details");
            } else {

                $scope.DBdetailsediting = false;

                //Mapping
                $scope.myDataTable.DatabaseDetails[index].DbObject = $scope.editDBDetailsValue.DbObject;
                $scope.myDataTable.DatabaseDetails[index].DbType = $scope.editDBDetailsValue.DbType;
                $scope.myDataTable.DatabaseDetails[index].Description = $scope.editDBDetailsValue.Description;
            }
        }

        removeDBdetailsCancel = function (DBdetails: DatabaseDetail, index: number, $scope: IDiagnosticsScope) {
            $scope.DBdetailsediting = false;
            if (DBdetails.DbObject == "" && DBdetails.DbType == "" && DBdetails.Description == "") {
                $scope.myDataTable.DatabaseDetails.splice(index, 1);
            }
        }

        removeDBdetails = function (index: number, $scope: IDiagnosticsScope) {
            $scope.myDataTable.DatabaseDetails.splice(index, 1);
        }

        addDBdetails = function (scope: any, $scope: IDiagnosticsScope, focus:any) {
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
            } else {
                $scope.alerts.push({ type: 'warning', msg: 'Please complete the edit operation' });
            }
        }




    }
}