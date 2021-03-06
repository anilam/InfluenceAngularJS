var App;
(function (App) {
    var Config;
    (function (Config) {
        var ErrorType;
        (function (ErrorType) {
            ErrorType[ErrorType["danger"] = 0] = "danger";
            ErrorType[ErrorType["success"] = 1] = "success";
            ErrorType[ErrorType["warning"] = 2] = "warning";
        })(ErrorType = Config.ErrorType || (Config.ErrorType = {}));
        var Constants = (function () {
            function Constants() {
            }
            Object.defineProperty(Constants, "errorMessage", {
                get: function () {
                    return {
                        editing: 'Please complete the editing',
                        validateinput: 'Please enter the details',
                        success: 'Updated successfully',
                        nodesuccess: 'Source Loaded successfully',
                        graphsuccess: 'Graph Data Loaded successfully',
                        settingsuccess: 'Settings Updated Successfully',
                        failure: "Update Failed:",
                        loadingfailure: "Graph Data Loading Failed:",
                        renameNode: "Please rename the newly added node",
                        duplicateNode: "Node name already exist, please rename",
                        downloadSuccess: "Downloaded Successfully",
                        loginfailed: "Unauthorized access",
                        grapherror: "Data not found"
                    };
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Constants, "getMenuList", {
                get: function () {
                    return {
                        severity: "High,Medium,Low",
                        menu: '[{"Menu":"Home","Url":"#!/ "},{"Menu":"Graph","Url":"#!/graph"},{"Menu":"Logout","Url":"#!/login"}]'
                    };
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Constants, "default", {
                get: function () {
                    return {
                        url: 'http://124.124.79.181/Influence/Structure/' + this.runningMode + '/Nodes',
                        reportURL: 'http://124.124.79.181/Influence/Reports/' + this.runningMode + '/export/nodes/',
                        graphURL: 'http://124.124.79.181/Influence/Reports/' + this.runningMode + '/dependencyreport',
                        authentication: 'http://124.124.79.181/influence/users/authenticate',
                        settings: 'http://124.124.79.181/Influence/Users/SaveSettings/'
                    };
                },
                enumerable: true,
                configurable: true
            });
            return Constants;
        }());
        //Default
        Constants.runningMode = "";
        Config.Constants = Constants;
    })(Config = App.Config || (App.Config = {}));
})(App || (App = {}));
//# sourceMappingURL=config.js.map