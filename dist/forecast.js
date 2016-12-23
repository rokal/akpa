define(["require", "exports"], function (require, exports) {
    "use strict";
    var Forecast = (function () {
        function Forecast(percentile, numberOfItemsCompleted, numberOfDays) {
            this.Percentile = percentile;
            this.NumberOfItemsCompleted = numberOfItemsCompleted;
            this.NumberOfDays = numberOfDays;
        }
        return Forecast;
    }());
    exports.Forecast = Forecast;
});

//# sourceMappingURL=forecast.js.map
