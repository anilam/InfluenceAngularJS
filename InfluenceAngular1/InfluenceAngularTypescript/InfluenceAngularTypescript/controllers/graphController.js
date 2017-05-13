var App;
(function (App) {
    function graphController($scope) {
        $scope.graphmodel = {};
        $scope.labels = [];
        $scope.data = [];
        $scope.graphData = [
            {
                "ProductName": "PM",
                "Dependencies": [
                    {
                        "ProductName": "Patient Portal",
                        "Impact": "Appoinment will be created in Patient Portal Appoinment book",
                        "DependentOn": "Create Appointment"
                    },
                    {
                        "ProductName": "FM",
                        "Impact": "Impacted by Service item library configuration",
                        "DependentOn": "Create / Modify Charge"
                    },
                    {
                        "ProductName": "EHR",
                        "Impact": "Import charge from E H R through holding tank",
                        "DependentOn": "Create / Modify Charge"
                    },
                    {
                        "ProductName": "EHR",
                        "Impact": "Direct import of charge from E H R",
                        "DependentOn": "Create / Modify Charge"
                    },
                    {
                        "ProductName": "Rosetta",
                        "Impact": "Import charge from Rosetta through holding tank",
                        "DependentOn": "Create / Modify Charge"
                    },
                    {
                        "ProductName": "Rosetta",
                        "Impact": "Direct import of charge from Rosetta",
                        "DependentOn": "Create / Modify Charge"
                    },
                    {
                        "ProductName": "EHR",
                        "Impact": "Check EHR Procedure",
                        "DependentOn": "Holding Tank"
                    },
                    {
                        "ProductName": "EHR",
                        "Impact": "Encounter must diplay in EHR",
                        "DependentOn": "Create Encounter"
                    },
                    {
                        "ProductName": "FM",
                        "Impact": "Paper Claims generation is impacted by Payer Master setting",
                        "DependentOn": "EDI claim file "
                    },
                    {
                        "ProductName": "FM",
                        "Impact": " Paper Claims generation is impacted byService item library settings",
                        "DependentOn": "EDI claim file "
                    },
                    {
                        "ProductName": "FM",
                        "Impact": "  Paper Claims generation is impacted bySubmitter Profile setting",
                        "DependentOn": "EDI claim file "
                    },
                    {
                        "ProductName": "ICS",
                        "Impact": "When we add new column then whwn we search for Non person image in ICS then system should not throw error",
                        "DependentOn": "Patient Lookup"
                    },
                    {
                        "ProductName": "Patient Portal",
                        "Impact": "If a new column is added to Patient Lookup, check In Patient Portal MailBox, while composing mail, in the To field, while searching for a patient, Patient Lookup should return only the patients with enrollment status as Pending or Completed ",
                        "DependentOn": "Patient Lookup"
                    },
                    {
                        "ProductName": "Patient Portal",
                        "Impact": "If a new column is added to Patient Lookup, check In Patient Portal MailBox, When we open the Enrollment Request, if the patient is available in EPM then that patient should be automatically selected",
                        "DependentOn": "Patient Lookup"
                    }
                ]
            },
            {
                "ProductName": "EHR",
                "Dependencies": []
            },
            {
                "ProductName": "Patient Portal",
                "Dependencies": []
            },
            {
                "ProductName": "Optik",
                "Dependencies": []
            },
            {
                "ProductName": "File Maintenance",
                "Dependencies": [
                    {
                        "ProductName": "PM",
                        "Impact": "Charge Entry",
                        "DependentOn": "Contracts"
                    },
                    {
                        "ProductName": "FM, PM",
                        "Impact": "Copay",
                        "DependentOn": "Contracts"
                    },
                    {
                        "ProductName": "FM",
                        "Impact": "Contract Exception",
                        "DependentOn": "Contracts"
                    },
                    {
                        "ProductName": "FM",
                        "Impact": "\"Participating Provider contract Provider > Location > Payer Level\"",
                        "DependentOn": "Contracts"
                    }
                ]
            },
            {
                "ProductName": "System Admin",
                "Dependencies": []
            },
            {
                "ProductName": "Preference",
                "Dependencies": []
            },
            {
                "ProductName": "Document Management",
                "Dependencies": []
            },
            {
                "ProductName": "Rosetta",
                "Dependencies": []
            },
            {
                "ProductName": "KBM",
                "Dependencies": []
            }
        ];
        var counts = {};
        $scope.init = function () {
            $scope.labels = [];
            $scope.data = [];
        };
        $scope.generateGraph = function () {
            $scope.labels = [];
            $scope.data = [];
            $scope.options = { cutoutPercentage: 75 };
            $scope.graphmodel.Dependencies.forEach(function (x) {
                counts[x.ProductName] = (counts[x.ProductName] || 0) + 1;
            });
            for (var y in counts) {
                $scope.data.push(counts[y]);
                $scope.labels.push(y);
            }
        };
        //$scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        //$scope.series = ['Dependency'];
        //$scope.data = [
        //    [65, 59, 80, 81, 56, 55, 40],
        //    [28, 48, 40, 19, 86, 27, 90]
        //];
    }
    App.graphController = graphController;
})(App || (App = {}));
//# sourceMappingURL=graphController.js.map