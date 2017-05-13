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
        var Constants = (function () {
            function Constants() {
            }
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