var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    // 'ResultsProps' describes the shape of props.
    // State is never set so we use the 'undefined' type.
    var ResultsDisplay = (function (_super) {
        __extends(ResultsDisplay, _super);
        function ResultsDisplay() {
            return _super.apply(this, arguments) || this;
        }
        ResultsDisplay.prototype.render = function () {
            var message = "<ul>";
            for (var _i = 0, _a = this.props.forecasts; _i < _a.length; _i++) {
                var f = _a[_i];
                message += "<li>" + f.toString() + "</li>";
            }
            var fc = this.props.forecasts;
            var listItems = fc.map(function (currentForecast, index, arr) {
                return React.createElement("li", null, currentForecast.toString());
            });
            return React.createElement("ul", null, listItems);
        };
        return ResultsDisplay;
    }(React.Component));
    exports.ResultsDisplay = ResultsDisplay;
});
//# sourceMappingURL=resultsDisplay.js.map