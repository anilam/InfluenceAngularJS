module App {
    export class OtherDetailsBl {

        constructor() {

        }

        setOtherdetailsActive = (index: number, $scope: IDiagnosticsScope) => {
            $scope.activeOtherdetailsId = index;
        }

        editOtherdetails = function (Otherdetails: AdditionalDetail, index: number, $scope: IDiagnosticsScope,focus:any) {
            if (!$scope.Otherdetailsediting) {
                $scope.Otherdetailsediting = true;
                $scope.editItemOtherdetailsId = index;
                focus("Otherdetails-" + index);
                //backup
                //$scope.editOtherDetailsValue = new AdditionalDetailsDetail();
                $scope.editOtherDetailsValue = new Array();
                $scope.editOtherDetailsValue.DescriptionEdit = $scope.myDataTable.AdditionalDetails[index].Description;
                $scope.editOtherDetailsValue.TypeEdit = $scope.myDataTable.AdditionalDetails[index].Type;
                $scope.editOtherDetailsValue.ModuleEdit = $scope.myDataTable.AdditionalDetails[index].Module;
                $scope.editOtherDetailsValue.ComplexityEdit = $scope.myDataTable.AdditionalDetails[index].Complexity;

            } else {
                $scope.alerts.push({ type: Config.ErrorType[Config.ErrorType.warning], msg: Config.Constants.errorMessage.editing });
            }
        }

        editOtherdetailsOk = function (Otherdetails: AdditionalDetail, index: number, $scope: IDiagnosticsScope) {
            if ($scope.editOtherDetailsValue.DescriptionEdit == "" &&
                $scope.editOtherDetailsValue.TypeEdit == "" &&
                $scope.editOtherDetailsValue.ModuleEdit == "" &&
                $scope.editOtherDetailsValue.ComplexityEdit == "") {
                $scope.alerts.push({type:Config.ErrorType[Config.ErrorType.warning], msg:Config.Constants.errorMessage.validateinput});
            } else {

                $scope.Otherdetailsediting = false;
                //Mapping
                $scope.myDataTable.AdditionalDetails[index].Description = $scope.editOtherDetailsValue.DescriptionEdit;
                $scope.myDataTable.AdditionalDetails[index].Type = $scope.editOtherDetailsValue.TypeEdit;
                $scope.myDataTable.AdditionalDetails[index].Module = $scope.editOtherDetailsValue.ModuleEdit;
                $scope.myDataTable.AdditionalDetails[index].Complexity = $scope.editOtherDetailsValue.ComplexityEdit;
            }
        }

        removeOtherdetailsCancel = function (Otherdetails: AdditionalDetail, index: number, $scope: IDiagnosticsScope) {
            $scope.Otherdetailsediting = false;
            if (Otherdetails.Module == "" && Otherdetails.Description == "" && Otherdetails.Type == "" && Otherdetails.Complexity == "") {
                $scope.myDataTable.AdditionalDetails.splice(index, 1);
            }
        }

        removeOtherdetails = function (index: number, $scope: IDiagnosticsScope) {
            $scope.myDataTable.AdditionalDetails.splice(index, 1);
        }

        addOtherdetails = function (scope: any, $scope: IDiagnosticsScope, focus: any) {
            scope.Othersearch = '';
            if (!$scope.myDataTable.AdditionalDetails) {
                $scope.myDataTable.AdditionalDetails = [];
            }

            if ($scope.Otherdetailsediting != true) {
                $scope.myDataTable.AdditionalDetails.unshift({
                    Description: "",
                    Type: "",
                    Module: "",
                    Complexity:""
                });
                $scope.editOtherDetailsValue = new Array();
                $scope.editOtherDetailsValue.DescriptionEdit = $scope.myDataTable.AdditionalDetails[0].Description;
                $scope.editOtherDetailsValue.TypeEdit = $scope.myDataTable.AdditionalDetails[0].Type;
                $scope.editOtherDetailsValue.ModuleEdit = $scope.myDataTable.AdditionalDetails[0].Module;
                $scope.editOtherDetailsValue.ComplexityEdit = $scope.myDataTable.AdditionalDetails[0].Complexity;
                $scope.Otherdetailsediting = true;

                $scope.editItemOtherdetailsId = 0;
                focus("Otherdetails-0");

            } else {
                    $scope.alerts.push({ type: Config.ErrorType[Config.ErrorType.warning], msg: Config.Constants.errorMessage.editing });
            }
        }
    }
}