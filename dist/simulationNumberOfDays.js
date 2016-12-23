var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "ForecastItems", "Simulation"], function (require, exports, ForecastItems_1, Simulation_1) {
    "use strict";
    var SimulationNumberOfDays = (function (_super) {
        __extends(SimulationNumberOfDays, _super);
        function SimulationNumberOfDays(numberOfDays, numberOfSimulations) {
            var _this = _super.call(this, numberOfSimulations) || this;
            _this._numberOfDays = numberOfDays;
            return _this;
        }
        SimulationNumberOfDays.prototype.execute = function () {
            // Variables used in the inner for
            var throughputResults = new Array(this._numberOfDays);
            var randomIndex;
            var simulatedNumberOfItemsCompleted;
            // Produce X simulations
            for (var i = 0; i < this.NumberOfSimulations; i++) {
                // At each simulation, generate random througputs based on the historical values
                for (var j = 0; j < this._numberOfDays; j++) {
                    randomIndex = this.RandomIndexGenerator;
                    throughputResults[j] = this.HistoricalThroughput[randomIndex];
                }
                simulatedNumberOfItemsCompleted = this.addItems(throughputResults);
                this.addSimulationResult(simulatedNumberOfItemsCompleted, this._numberOfDays);
            }
        };
        SimulationNumberOfDays.prototype.addItems = function (throughputResults) {
            var total = 0;
            for (var _i = 0, throughputResults_1 = throughputResults; _i < throughputResults_1.length; _i++) {
                var value = throughputResults_1[_i];
                total += value;
            }
            return total;
        };
        SimulationNumberOfDays.prototype.createForecast = function () {
            var orderedDescResults = this.orderSimulationResults();
            var orderedAscPercentiles = this.orderPercentiles();
            var counter = 0;
            var numberOfOccurences = 0;
            for (var _i = 0, orderedAscPercentiles_1 = orderedAscPercentiles; _i < orderedAscPercentiles_1.length; _i++) {
                var percentile = orderedAscPercentiles_1[_i];
                counter = 0;
                numberOfOccurences = Math.round(percentile.value * this.NumberOfSimulations);
                for (var _a = 0, orderedDescResults_1 = orderedDescResults; _a < orderedDescResults_1.length; _a++) {
                    var result = orderedDescResults_1[_a];
                    counter += result.Occurences;
                    if (counter >= numberOfOccurences) {
                        this.Forecasts.push(new ForecastItems_1.ForecastItems(percentile, result.NumberOfItemsCompleted, this._numberOfDays));
                        break;
                    }
                }
            }
        };
        SimulationNumberOfDays.prototype.orderSimulationResults = function () {
            var sortedArray = this._simulationResults.sort(function (n1, n2) {
                if (n1.NumberOfItemsCompleted > n2.NumberOfItemsCompleted)
                    return -1;
                else if (n1.NumberOfItemsCompleted < n2.NumberOfItemsCompleted)
                    return 1;
                else
                    return 0;
            });
            return sortedArray;
        };
        SimulationNumberOfDays.prototype.orderPercentiles = function () {
            var sortedArray = this._percentiles.sort(function (n1, n2) {
                if (n1.value > n2.value)
                    return 1;
                else if (n1.value < n2.value)
                    return -1;
                else
                    return 0;
            });
            return sortedArray;
        };
        return SimulationNumberOfDays;
    }(Simulation_1.Simulation));
    exports.SimulationNumberOfDays = SimulationNumberOfDays;
});
//# sourceMappingURL=simulationNumberOfDays.js.map