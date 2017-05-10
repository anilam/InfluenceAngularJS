var App;
(function (App) {
    var Config;
    (function (Config) {
        var Constants = (function () {
            function Constants() {
            }
            Object.defineProperty(Constants, "default", {
                get: function () {
                    return {
                        url: 'http://124.124.79.181/Influence/Structure/pm/Nodes'
                    };
                },
                enumerable: true,
                configurable: true
            });
            return Constants;
        }());
        Config.Constants = Constants;
    })(Config = App.Config || (App.Config = {}));
})(App || (App = {}));
//# sourceMappingURL=config.js.map