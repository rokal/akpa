var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "forecast"], function (require, exports, forecast_1) {
    "use strict";
    var ForecastItems = (function (_super) {
        __extends(ForecastItems, _super);
        function ForecastItems(percentile, numberOfItemsCompleted, numberOfDays) {
            return _super.call(this, percentile, numberOfItemsCompleted, numberOfDays) || this;
        }
        ForecastItems.prototype.toString = function () {
            return this.NumberOfItemsCompleted + " items completed with " +
                this.Percentile + "% confidence of completing in " + this.NumberOfDays + " days";
        };
        return ForecastItems;
    }(forecast_1.Forecast));
    exports.ForecastItems = ForecastItems;
});

//# sourceMappingURL=forecastItems.js.map
