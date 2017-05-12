module App {

    export class FunctionalDetailsBl {

        constructor() {
            
        }

        setFuncdetailsActive = (index: number, $scope:IDiagnosticsScope) => {
            $scope.activeFuncdetailsId = index;
        }

        editFuncdetails = function (Funcdetails: FunctionalDetail, index: number, $scope: IDiagnosticsScope) {
            if (!$scope.Funcdetailsediting) {
                $scope.Funcdetailsediting = true;
                $scope.editItemFuncdetailsId = index;

                //backup
                //$scope.editFuncDetailsValue = new FunctionalDetail();
                $scope.editFuncDetailsValue = new Array();
                $scope.editFuncDetailsValue.ComplexityEdit = $scope.myDataTable.Functional[index].Complexity;
                $scope.editFuncDetailsValue.ImpactEdit = $scope.myDataTable.Functional[index].Impact;
                $scope.editFuncDetailsValue.ProductEdit = $scope.myDataTable.Functional[index].Product;
                $scope.editFuncDetailsValue.ModuleEdit = $scope.myDataTable.Functional[index].Module;

            } else {
                alert("Please Complete the editiing");
            }
        }

        editFuncdetailsOk = function (Funcdetails: FunctionalDetail, index: number, $scope: IDiagnosticsScope) {
            $scope.Funcdetailsediting = false;
            //Mapping
            $scope.myDataTable.Functional[index].Complexity = $scope.editFuncDetailsValue.ComplexityEdit;
            $scope.myDataTable.Functional[index].Impact = $scope.editFuncDetailsValue.ImpactEdit;
            $scope.myDataTable.Functional[index].Product = $scope.editFuncDetailsValue.ProductEdit;
            $scope.myDataTable.Functional[index].Module = $scope.editFuncDetailsValue.ModuleEdit;
        }

        removeFuncdetailsCancel = function (Funcdetails: FunctionalDetail, index: number, $scope: IDiagnosticsScope) {
            $scope.Funcdetailsediting = false;
            if (Funcdetails.Module == "" && Funcdetails.Complexity == "" && Funcdetails.Impact == "" && Funcdetails.Product == "") {
                $scope.myDataTable.Functional.splice(index, 1);
            }
        }

        removeFuncdetails = function (index: number, $scope: IDiagnosticsScope) {
            $scope.myDataTable.Functional.splice(index, 1);
        }

        addFuncdetails = function (scope: any, $scope: IDiagnosticsScope) {
            if (!$scope.myDataTable.Functional) {
                $scope.myDataTable.Functional = [];
            }

            if ($scope.Funcdetailsediting != true) {
                $scope.myDataTable.Functional.unshift({
                    Module: "",
                    Product: "",
                    Impact: "",
                    Complexity: ""
                });
                $scope.editFuncDetailsValue = new Array();
                $scope.editFuncDetailsValue.ComplexityEdit = $scope.myDataTable.Functional[0].Complexity;
                $scope.editFuncDetailsValue.ImpactEdit = $scope.myDataTable.Functional[0].Impact;
                $scope.editFuncDetailsValue.ProductEdit = $scope.myDataTable.Functional[0].Product;
                $scope.editFuncDetailsValue.ModuleEdit = $scope.myDataTable.Functional[0].Module;
                $scope.Funcdetailsediting = true;

                $scope.editItemFuncdetailsId = 0;

            } else {
                alert("Please complete the editing");
            }
        }
    }


    export class OtherDetailsBl {

        constructor() {

        }

        setOtherdetailsActive = (index: number, $scope: IDiagnosticsScope) => {
            $scope.activeOtherdetailsId = index;
        }

        editOtherdetails = function (Otherdetails: AdditionalDetail, index: number, $scope: IDiagnosticsScope) {
            if (!$scope.Otherdetailsediting) {
                $scope.Otherdetailsediting = true;
                $scope.editItemOtherdetailsId = index;

                //backup
                //$scope.editOtherDetailsValue = new AdditionalDetailsDetail();
                $scope.editOtherDetailsValue = new Array();
                $scope.editOtherDetailsValue.DescriptionEdit = $scope.myDataTable.AdditionalDetails[index].Description;
                $scope.editOtherDetailsValue.TypeEdit = $scope.myDataTable.AdditionalDetails[index].Type;
                $scope.editOtherDetailsValue.ModuleEdit = $scope.myDataTable.AdditionalDetails[index].Module;
                $scope.editOtherDetailsValue.ComplexityEdit = $scope.myDataTable.AdditionalDetails[index].Complexity;

            } else {
                alert("Please Complete the editiing");
            }
        }

        editOtherdetailsOk = function (Otherdetails: AdditionalDetail, index: number, $scope: IDiagnosticsScope) {
            $scope.Otherdetailsediting = false;
            //Mapping
            $scope.myDataTable.AdditionalDetails[index].Description = $scope.editOtherDetailsValue.DescriptionEdit;
            $scope.myDataTable.AdditionalDetails[index].Type = $scope.editOtherDetailsValue.TypeEdit;
            $scope.myDataTable.AdditionalDetails[index].Module = $scope.editOtherDetailsValue.ModuleEdit;
            $scope.myDataTable.AdditionalDetails[index].Complexity = $scope.editOtherDetailsValue.ComplexityEdit;
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

        addOtherdetails = function (scope: any, $scope: IDiagnosticsScope) {
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

            } else {
                alert("Please complete the editing");
            }
        }
    }
}