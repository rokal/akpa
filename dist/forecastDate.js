var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "forecast"], function (require, exports, forecast_1) {
    "use strict";
    var ForecastDate = (function (_super) {
        __extends(ForecastDate, _super);
        function ForecastDate(percentile, numberOfItemsCompleted, numberOfDays) {
            return _super.call(this, percentile, numberOfItemsCompleted, numberOfDays) || this;
        }
        ForecastDate.prototype.toString = function () {
            return "In " + this.NumberOfDays +
                " days, " + this.Percentile +
                "% confidence of completing " + this.NumberOfItemsCompleted +
                " items";
        };
        return ForecastDate;
    }(forecast_1.Forecast));
    exports.ForecastDate = ForecastDate;
});
//# sourceMappingURL=forecastDate.js.map