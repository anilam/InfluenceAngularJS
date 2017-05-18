var App;
(function (App) {
    var OtherDetailsBl = (function () {
        function OtherDetailsBl() {
            this.setOtherdetailsActive = function (index, $scope) {
                $scope.activeOtherdetailsId = index;
            };
            this.editOtherdetails = function (Otherdetails, index, $scope, focus) {
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
                }
                else {
                    $scope.alerts.push({ type: App.Config.ErrorType[App.Config.ErrorType.warning], msg: App.Config.Constants.errorMessage.editing });
                }
            };
            this.editOtherdetailsOk = function (Otherdetails, index, $scope) {
                if ($scope.editOtherDetailsValue.DescriptionEdit == "" &&
                    $scope.editOtherDetailsValue.TypeEdit == "" &&
                    $scope.editOtherDetailsValue.ModuleEdit == "" &&
                    $scope.editOtherDetailsValue.ComplexityEdit == "") {
                    $scope.alerts.push({ type: App.Config.ErrorType[App.Config.ErrorType.warning], msg: App.Config.Constants.errorMessage.validateinput });
                }
                else {
                    $scope.Otherdetailsediting = false;
                    //Mapping
                    $scope.myDataTable.AdditionalDetails[index].Description = $scope.editOtherDetailsValue.DescriptionEdit;
                    $scope.myDataTable.AdditionalDetails[index].Type = $scope.editOtherDetailsValue.TypeEdit;
                    $scope.myDataTable.AdditionalDetails[index].Module = $scope.editOtherDetailsValue.ModuleEdit;
                    $scope.myDataTable.AdditionalDetails[index].Complexity = $scope.editOtherDetailsValue.ComplexityEdit;
                }
            };
            this.removeOtherdetailsCancel = function (Otherdetails, index, $scope) {
                $scope.Otherdetailsediting = false;
                if (Otherdetails.Module == "" && Otherdetails.Description == "" && Otherdetails.Type == "" && Otherdetails.Complexity == "") {
                    $scope.myDataTable.AdditionalDetails.splice(index, 1);
                }
            };
            this.removeOtherdetails = function (index, $scope) {
                $scope.myDataTable.AdditionalDetails.splice(index, 1);
            };
            this.addOtherdetails = function (scope, $scope, focus) {
                scope.Othersearch = '';
                if (!$scope.myDataTable.AdditionalDetails) {
                    $scope.myDataTable.AdditionalDetails = [];
                }
                if ($scope.Otherdetailsediting != true) {
                    $scope.myDataTable.AdditionalDetails.unshift({
                        Description: "",
                        Type: "",
                        Module: "",
                        Complexity: ""
                    });
                    $scope.editOtherDetailsValue = new Array();
                    $scope.editOtherDetailsValue.DescriptionEdit = $scope.myDataTable.AdditionalDetails[0].Description;
                    $scope.editOtherDetailsValue.TypeEdit = $scope.myDataTable.AdditionalDetails[0].Type;
                    $scope.editOtherDetailsValue.ModuleEdit = $scope.myDataTable.AdditionalDetails[0].Module;
                    $scope.editOtherDetailsValue.ComplexityEdit = $scope.myDataTable.AdditionalDetails[0].Complexity;
                    $scope.Otherdetailsediting = true;
                    $scope.editItemOtherdetailsId = 0;
                    focus("Otherdetails-0");
                }
                else {
                    $scope.alerts.push({ type: App.Config.ErrorType[App.Config.ErrorType.warning], msg: App.Config.Constants.errorMessage.editing });
                }
            };
        }
        return OtherDetailsBl;
    }());
    App.OtherDetailsBl = OtherDetailsBl;
})(App || (App = {}));
//# sourceMappingURL=OtherDetailsBl.js.map