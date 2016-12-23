define(["require", "exports"], function (require, exports) {
    "use strict";
    var SimulationResult = (function () {
        function SimulationResult(numberOfItemsCompleted, numberOfDays) {
            this._numberOfItemsCompleted = numberOfItemsCompleted;
            this._numberOfDays = numberOfDays;
            this._occurences = 1;
        }
        Object.defineProperty(SimulationResult.prototype, "NumberOfItemsCompleted", {
            get: function () {
                return this._numberOfItemsCompleted;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SimulationResult.prototype, "NumberOfDays", {
            get: function () {
                return this._numberOfDays;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SimulationResult.prototype, "Occurences", {
            get: function () {
                return this._occurences;
            },
            enumerable: true,
            configurable: true
        });
        SimulationResult.prototype.incrementOccurences = function () {
            this._occurences = this._occurences + 1;
        };
        SimulationResult.prototype.toString = function () {
            return this._numberOfItemsCompleted +
                " items delivered in " +
                this._numberOfDays +
                " days [" +
                this._occurences +
                " occurences]";
        };
        return SimulationResult;
    }());
    exports.SimulationResult = SimulationResult;
});
//# sourceMappingURL=simulationResult.js.map