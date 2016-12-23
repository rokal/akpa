define(["require", "exports", "percentile", "simulationResult"], function (require, exports, percentile_1, simulationResult_1) {
    "use strict";
    var Simulation = (function () {
        function Simulation(numberOfSimulations) {
            this.initial_number_of_simulations = 10000;
            this.initial_percentiles = new Array(5);
            this.initial_percentiles[0] = new percentile_1.Percentile(0.3);
            this.initial_percentiles[1] = new percentile_1.Percentile(0.5);
            this.initial_percentiles[2] = new percentile_1.Percentile(0.7);
            this.initial_percentiles[3] = new percentile_1.Percentile(0.85);
            this.initial_percentiles[4] = new percentile_1.Percentile(0.9);
            this.NumberOfSimulations = numberOfSimulations;
            this._simulationResults = new Array(numberOfSimulations);
            this._percentiles = this.initial_percentiles;
            this._forecasts = new Array(0);
            this._historicalThroughput = [2, 7, 3, 9, 0, 3, 6, 8, 3];
        }
        Object.defineProperty(Simulation.prototype, "NumberOfSimulations", {
            //private ThroughputReader throughputReader;
            //private SimulationResultsWriter resultsWriter;
            get: function () {
                return this._numberOfSimulations;
            },
            set: function (number) {
                this._numberOfSimulations = number;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Simulation.prototype, "HistoricalThroughput", {
            get: function () {
                return this._historicalThroughput;
            },
            set: function (throughputs) {
                this._historicalThroughput = throughputs;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Simulation.prototype, "Forecasts", {
            get: function () {
                return this._forecasts;
            },
            set: function (forecasts) {
                this._forecasts = forecasts;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Simulation.prototype, "RandomIndexGenerator", {
            get: function () {
                return Math.floor(Math.random() * this._historicalThroughput.length);
            },
            enumerable: true,
            configurable: true
        });
        Simulation.prototype.addSimulationResult = function (numberOfItemsCompleted, numberOfDays) {
            var list = this._simulationResults.filter(function (result) { return result.NumberOfItemsCompleted == numberOfItemsCompleted; });
            if (list.length == 0) {
                this._simulationResults.push(new simulationResult_1.SimulationResult(numberOfItemsCompleted, numberOfDays));
            }
            else if (list.length == 1) {
                list[0].incrementOccurences();
            }
            else {
                throw new RangeError("Ayoye");
            }
        };
        Simulation.prototype.printSimulationResult = function () {
            // some writer writes the forecasts and its simulation results
        };
        return Simulation;
    }());
    exports.Simulation = Simulation;
});

//# sourceMappingURL=simulation.js.map
