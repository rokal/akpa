define(["require", "exports"], function (require, exports) {
    "use strict";
    var Percentile = (function () {
        function Percentile(percentile) {
            this.value = percentile;
        }
        Percentile.prototype.toString = function () {
            return (this.value * 100).toString() + "%";
        };
        return Percentile;
    }());
    exports.Percentile = Percentile;
});

//# sourceMappingURL=percentile.js.map
