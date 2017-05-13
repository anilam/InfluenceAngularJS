module App {

    export class FunctionalDetailsBl {

        constructor() {
            
        }

        setFuncdetailsActive = (index: number, $scope:IDiagnosticsScope) => {
            $scope.activeFuncdetailsId = index;
        }

        editFuncdetails = function (Funcdetails: FunctionalDetail, index: number, $scope: IDiagnosticsScope, focus:any) {
            if (!$scope.Funcdetailsediting) {
                $scope.Funcdetailsediting = true;
                $scope.editItemFuncdetailsId = index;
                focus("funcdetails-" + index);

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
            if ($scope.editFuncDetailsValue.ComplexityEdit == "" &&
                $scope.editFuncDetailsValue.ImpactEdit == "" &&
                $scope.editFuncDetailsValue.ProductEdit == "" &&
                $scope.editFuncDetailsValue.ModuleEdit == "") {
                alert("Please enter the details");

            } else {

                $scope.Funcdetailsediting = false;
                //Mapping
                $scope.myDataTable.Functional[index].Complexity = $scope.editFuncDetailsValue.ComplexityEdit;
                $scope.myDataTable.Functional[index].Impact = $scope.editFuncDetailsValue.ImpactEdit;
                $scope.myDataTable.Functional[index].Product = $scope.editFuncDetailsValue.ProductEdit;
                $scope.myDataTable.Functional[index].Module = $scope.editFuncDetailsValue.ModuleEdit;
            }
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

        addFuncdetails = function (scope: any, $scope: IDiagnosticsScope, focus:any) {
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
                focus("funcdetails-0");

            } else {
                alert("Please complete the editing");
            }
        }
    }
}