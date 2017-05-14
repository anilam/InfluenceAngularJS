var App;
(function (App) {
    var Config;
    (function (Config) {
        var Mode;
        (function (Mode) {
            Mode[Mode["Select"] = 0] = "Select";
            Mode[Mode["Pm"] = 1] = "Pm";
            Mode[Mode["Ehr"] = 2] = "Ehr";
        })(Mode = Config.Mode || (Config.Mode = {}));
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
                        failure: "Update Failed:",
                        renameNode: "Please rename the newly added node",
                        duplicateNode: "Node name already exist, please rename"
                    };
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Constants, "default", {
                get: function () {
                    if (this.runningMode == Mode.Pm) {
                        return {
                            url: 'http://124.124.79.181/Influence/Structure/pm/Nodes'
                        };
                    }
                    if (this.runningMode == Mode.Ehr) {
                        return {
                            url: 'http://124.124.79.181/Influence/Structure/pm/Nodes'
                        };
                    }
                },
                enumerable: true,
                configurable: true
            });
            return Constants;
        }());
        //Default
        Constants.runningMode = Mode.Select;
        Config.Constants = Constants;
    })(Config = App.Config || (App.Config = {}));
})(App || (App = {}));
//# sourceMappingURL=config.js.map