/// <reference path="scripts/typings/angularjs/angular.d.ts" />
/// <reference path="scripts/typings/jstree/jstree.d.ts" />


module App {
    declare function unescape(s: string): string;

    export interface IDiagnosticsScope extends ng.IScope {
        treeData: any;
        loadData: string;
        remove: (scope: any) => void;
        toggle: (scope: any) => void;
        moveLastToTheBeginning: () => void;
        data:any;
        newSubItem: (scope: any) => void;
        collapseAll: () => void;
        expandAll: () => void;
        loadDetails: (path: string) => void;
        myDataTable: any;
        setActive: (menuItem: any) => void;
        activeMenu: string;
        exportToExcel: (tableId: any, sheetname: any) => void;
    }

    export function influenceController($scope: IDiagnosticsScope,
        $http: angular.IHttpService,
        $log: angular.ILogService,
        $timeout: angular.ITimeoutService) {
        $scope.data = [];

        $http({
            method: "GET",
            url: Config.Constants.default.url
        }).then(response => {
            var stringified = JSON.stringify(response.data);
            stringified = stringified.replace(new RegExp('Name', 'g'), "text");
            stringified = stringified.replace(new RegExp('Children', 'g'), "children");
            stringified = stringified.replace(new RegExp('Path', 'g'), "id");
         //   $scope.data = JSON.parse(stringified);
            });


        //Copy Tree Code
        $scope.remove = function (scope) {
            scope.remove();
        };

        $scope.toggle = function (scope) {
            scope.toggle();
        };

        $scope.moveLastToTheBeginning = function () {
            var a = $scope.data.pop();
            $scope.data.splice(0, 0, a);
        };

        $scope.newSubItem = function (scope) {
            var nodeData = scope.$modelValue;
          

            if (nodeData.Children == null) {
                nodeData.Children = [];
            }
            nodeData.Children.unshift({
              //  id: nodeData.id * 10 + nodeData.nodes.length,
                Name: "EnterDetails",
                Children: null
            });

            $scope.activeMenu = "EnterDetails";
        };

        $scope.setActive = function (menuItem:any) {
            $scope.activeMenu = menuItem.Name;

            if (menuItem.Children == null)
            $log.info("Children data load");
            $http({
                method: "GET",
                url: Config.Constants.default.url + '/' + menuItem.Path
            }).then(response => {
                $scope.myDataTable = response.data;
            });
        }

        $scope.collapseAll = function () {
            $scope.$broadcast('angular-ui-tree:collapse-all');
        };

        $scope.expandAll = function () {
            $scope.$broadcast('angular-ui-tree:expand-all');
        };

        $scope.data = [{
            "Name": "Nextgen", "Path": <any>null, "Children": [{ "Name": "PM", "Path": "Nextgen^Node|0-", "Children": [{ "Name": "Appointment", "Path": "Nextgen^Node|0-^Node|0-", "Children": [{ "Name": "Create Appointment", "Path": "Nextgen^Node|0-^Node|0-^Node|0-", "Children": null }, { "Name": "Copy Paste Appointment", "Path": "Nextgen^Node|0-^Node|0-^Node|1-", "Children": <any>null }, { "Name": "Cut Paste Appointment", "Path": "Nextgen^Node|0-^Node|0-^Node|2-", "Children": <any>null }, { "Name": "Checkin", "Path": "Nextgen^Node|0-^Node|0-^Node|3-", "Children": <any>null }, { "Name": "Delete Appointment", "Path": "Nextgen^Node|0-^Node|0-^Node|4-", "Children": <any>null }, { "Name": "Modify Appoitment", "Path": "Nextgen^Node|0-^Node|0-^Node|5-", "Children": <any>null }] }, { "Name": "Person", "Path": "Nextgen^Node|0-^Node|1-", "Children": <any>null }, { "Name": "Patient", "Path": "Nextgen^Node|0-^Node|2-", "Children": [{ "Name": "Create Patient", "Path": "Nextgen^Node|0-^Node|2-^Node|0-", "Children": <any>null }, { "Name": "Add / Modify Patient Demographics", "Path": "Nextgen^Node|0-^Node|2-^Node|1-", "Children": <any>null }, { "Name": "Chart Details Tab", "Path": "Nextgen^Node|0-^Node|2-^Node|2-", "Children": <any>null }, { "Name": "Marketing Plan, Marketing Details and Marketing Comment", "Path": "Nextgen^Node|0-^Node|2-^Node|3-", "Children": <any>null }] }, { "Name": "Chart", "Path": "Nextgen^Node|0-^Node|3-", "Children": <any>null }, { "Name": "Charge", "Path": "Nextgen^Node|0-^Node|4-", "Children": [{ "Name": "Create / Modify Charge", "Path": "Nextgen^Node|0-^Node|4-^Node|0-", "Children": <any>null }, { "Name": "Holding Tank", "Path": "Nextgen^Node|0-^Node|4-^Node|1-", "Children": <any>null }, { "Name": "Discount", "Path": "Nextgen^Node|0-^Node|4-^Node|2-", "Children": [{ "Name": "Encouter Level Disount", "Path": "Nextgen^Node|0-^Node|4-^Node|2-^Node|0-", "Children": <any>null }, { "Name": "Charge Level Discount", "Path": "Nextgen^Node|0-^Node|4-^Node|2-^Node|1-", "Children": <any>null }] }, { "Name": "Void Charge", "Path": "Nextgen^Node|0-^Node|4-^Node|3-", "Children": <any>null }, { "Name": "Delete Charge", "Path": "Nextgen^Node|0-^Node|4-^Node|4-", "Children": <any>null }, { "Name": "Invoice", "Path": "Nextgen^Node|0-^Node|4-^Node|5-", "Children": <any>null }, { "Name": "Taxes", "Path": "Nextgen^Node|0-^Node|4-^Node|6-", "Children": <any>null }] }, { "Name": "Transaction", "Path": "Nextgen^Node|0-^Node|5-", "Children": [{ "Name": "Payments Self pay", "Path": "Nextgen^Node|0-^Node|5-^Node|0-", "Children": <any>null }, { "Name": "Adjustments", "Path": "Nextgen^Node|0-^Node|5-^Node|1-", "Children": <any>null }, { "Name": "Refund", "Path": "Nextgen^Node|0-^Node|5-^Node|2-", "Children": <any>null }, { "Name": "Payments Insurance", "Path": "Nextgen^Node|0-^Node|5-^Node|3-", "Children": <any>null }] }, { "Name": "Accounts", "Path": "Nextgen^Node|0-^Node|6-", "Children": <any>null }, { "Name": "Encounters", "Path": "Nextgen^Node|0-^Node|7-", "Children": [{ "Name": "Create Encounter", "Path": "Nextgen^Node|0-^Node|7-^Node|0-", "Children": <any>null }, { "Name": "Sliding Fee", "Path": "Nextgen^Node|0-^Node|7-^Node|1-", "Children": <any>null }, { "Name": "Rendering provider Change", "Path": "Nextgen^Node|0-^Node|7-^Node|2-", "Children": <any>null }] }, { "Name": "Letters", "Path": "Nextgen^Node|0-^Node|8-", "Children": <any>null }, { "Name": "Claims", "Path": "Nextgen^Node|0-^Node|9-", "Children": [{ "Name": "CSC(Anesthesia Concurrency)", "Path": "Nextgen^Node|0-^Node|9-^Node|0-", "Children": <any>null }, { "Name": "Paper Claim", "Path": "Nextgen^Node|0-^Node|9-^Node|1-", "Children": <any>null }, { "Name": "EDI claim file ", "Path": "Nextgen^Node|0-^Node|9-^Node|2-", "Children": <any>null }, { "Name": "EDI Segment Code", "Path": "Nextgen^Node|0-^Node|9-^Node|3-", "Children": <any>null }] }, { "Name": "Lookup", "Path": "Nextgen^Node|0-^Node|10-", "Children": [{ "Name": "Patient Lookup", "Path": "Nextgen^Node|0-^Node|10-^Node|0-", "Children": <any>null }, { "Name": "Person Lookup", "Path": "Nextgen^Node|0-^Node|10-^Node|1-", "Children": <any>null }, { "Name": "Encounter Lookup", "Path": "Nextgen^Node|0-^Node|10-^Node|2-", "Children": <any>null }] }, { "Name": "Billing", "Path": "Nextgen^Node|0-^Node|11-", "Children": <any>null }, { "Name": "ERA", "Path": "Nextgen^Node|0-^Node|12-", "Children": <any>null }, { "Name": "Worklog", "Path": "Nextgen^Node|0-^Node|13-", "Children": <any>null }, { "Name": "Reports", "Path": "Nextgen^Node|0-^Node|14-", "Children": [{ "Name": "Daily Encounter Report", "Path": "Nextgen^Node|0-^Node|14-^Node|0-", "Children": <any>null }, { "Name": "Billed Encounter Report", "Path": "Nextgen^Node|0-^Node|14-^Node|1-", "Children": <any>null }, { "Name": "Appointment Listing Report", "Path": "Nextgen^Node|0-^Node|14-^Node|2-", "Children": <any>null }, { "Name": "Un duplicated patient Report", "Path": "Nextgen^Node|0-^Node|14-^Node|3-", "Children": <any>null }, { "Name": "UnBilled Encounter Report", "Path": "Nextgen^Node|0-^Node|14-^Node|4-", "Children": <any>null }, { "Name": "Authorized Report", "Path": "Nextgen^Node|0-^Node|14-^Node|5-", "Children": <any>null }, { "Name": "Referral Report", "Path": "Nextgen^Node|0-^Node|14-^Node|6-", "Children": <any>null }, { "Name": "Account Receivable Report (AR Report)", "Path": "Nextgen^Node|0-^Node|14-^Node|7-", "Children": <any>null }, { "Name": "Daily charges", "Path": "Nextgen^Node|0-^Node|14-^Node|8-", "Children": <any>null }, { "Name": "Daily charges Report", "Path": "Nextgen^Node|0-^Node|14-^Node|9-", "Children": <any>null }] }, { "Name": "Insurance Maintenance", "Path": "Nextgen^Node|0-^Node|15-", "Children": <any>null }, { "Name": "Significant Event", "Path": "Nextgen^Node|0-^Node|16-", "Children": <any>null }] }, { "Name": "EHR", "Path": "Nextgen^Node|1-", "Children": <any>null }, { "Name": "Patient Portal", "Path": "Nextgen^Node|2-", "Children": [{ "Name": "Appointment", "Path": "Nextgen^Node|2-^Node|0-", "Children": [{ "Name": "Create Appointment", "Path": "Nextgen^Node|2-^Node|0-^Node|0-", "Children": <any>null }, { "Name": "Cancel Appointment", "Path": "Nextgen^Node|2-^Node|0-^Node|1-", "Children": <any>null }] }, { "Name": "Enrollment", "Path": "Nextgen^Node|2-^Node|1-", "Children": <any>null }, { "Name": "Transaction", "Path": "Nextgen^Node|2-^Node|2-", "Children": <any>null }] }, { "Name": "Optik", "Path": "Nextgen^Node|3-", "Children": <any>null }, { "Name": "File Maintenance", "Path": "Nextgen^Node|4-", "Children": [{ "Name": "Master List", "Path": "Nextgen^Node|4-^Node|0-", "Children": <any>null }, { "Name": "Library", "Path": "Nextgen^Node|4-^Node|1-", "Children": [{ "Name": "Contracts", "Path": "Nextgen^Node|4-^Node|1-^Node|0-", "Children": <any>null }, { "Name": "NDC Library ", "Path": "Nextgen^Node|4-^Node|1-^Node|1-", "Children": <any>null }] }, { "Name": "Code Table", "Path": "Nextgen^Node|4-^Node|2-", "Children": <any>null }] }, { "Name": "System Admin", "Path": "Nextgen^Node|5-", "Children": [{ "Name": "Privacy Level", "Path": "Nextgen^Node|5-^Node|0-", "Children": <any>null }, { "Name": "Inclusion", "Path": "Nextgen^Node|5-^Node|1-", "Children": <any>null }, { "Name": "Exclusion", "Path": "Nextgen^Node|5-^Node|2-", "Children": <any>null }] }, { "Name": "Preference", "Path": "Nextgen^Node|6-", "Children": [{ "Name": "Practice Preference", "Path": "Nextgen^Node|6-^Node|0-", "Children": [{ "Name": "Enable Inprogress Encounter", "Path": "Nextgen^Node|6-^Node|0-^Node|0-", "Children": <any>null }, { "Name": "Add / Modify preference1", "Path": "Nextgen^Node|6-^Node|0-^Node|1-", "Children": <any>null }, { "Name": "Taxes", "Path": "Nextgen^Node|6-^Node|0-^Node|2-", "Children": <any>null }] }, { "Name": "Enterprise Preference", "Path": "Nextgen^Node|6-^Node|1-", "Children": <any>null }] }, { "Name": "Document Management", "Path": "Nextgen^Node|7-", "Children": <any>null }, { "Name": "Rosetta", "Path": "Nextgen^Node|8-", "Children": <any>null }, { "Name": "KBM", "Path": "Nextgen^Node|9-", "Children": [{ "Name": "Add Template", "Path": "Nextgen^Node|9-^Node|0-", "Children": <any>null }, { "Name": "Cardio template", "Path": "Nextgen^Node|9-^Node|1-", "Children": <any>null }, { "Name": "Template", "Path": "Nextgen^Node|9-^Node|2-", "Children": <any>null }, { "Name": "Node", "Path": "Nextgen^Node|9-^Node|3-", "Children": <any>null }] }]
        }
        ];
    }


    export var app= angular.module('myApp', ['ui.tree', 'ngRoute', 'ui.bootstrap']);

    app.factory('Excel',
        function ($window: any) {
            var uri = 'data:application/vnd.ms-excel;base64,',
                template =
                    '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
                base64 = function (s: any) { return $window.btoa(unescape(encodeURIComponent(s))); },
                format = function (s: any, c: any) { return s.replace(/{(\w+)}/g, function (m: any, p: any) { return c[p]; }) };
            return {
                tableToExcel: function (tableId: any, worksheetName: any) {
                    var table = $(tableId),
                        ctx = { worksheet: worksheetName, table: table.html() },
                        href = uri + base64(format(template, ctx));
                    return href;
                }
            };
        })
        .controller('MyCtrl',
        function (Excel: any, $timeout: any, $scope: any) {
            $scope.exportToExcel = function (tableId: any, sheetname: any) { // ex: '#my-table'
                var exportHref = Excel.tableToExcel(tableId, sheetname);
                $timeout(function () { location.href = exportHref; }, 100); // trigger download
            }
        });



    app.controller("InfluenceController", influenceController);
}















