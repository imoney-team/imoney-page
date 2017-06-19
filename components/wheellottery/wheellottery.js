$.define(function() {
    var defaults = {
        btn: "",
        awards: [],
        awardsNum: "",
        callback: function() {}
    };
    function WheelLottery(element, options) {
        this.settings = $.extend({}, defaults, options);
        this.$element = $(element);
        this.awardsNum = this.settings.awardsNum;
        this.callback = this.settings.callback;
        this.startTime = "";
        this.awardsLength = this.settings.awards.length;
        this.allDegree = 360 * 3 + 360 / this.awardsLength * this.settings.awardsNum - 360 / this.awardsLength / 2;
        this.init();
    }
    WheelLottery.prototype = {
        init: function() {
            var that = this;
            that.startTime = Date.now();
            that.run(0);
        },
        effect: function(p) {
            if ((p /= 0.5) < 1) return 1 / 2 * p * p;
            return -1 / 2 * ((--p) * (p - 2) - 1);
        },
        rotate: function(degree) {
            this.$element.css({
                "-webkit-transform": "rotate(" + degree + "deg)"
            })
        },
        run: function(degree) {
            var that = this;
            this.rotate(degree);
            var percentage = Math.min(1.0, (Date.now() - that.startTime) / 3000);
            var timeoutId = setTimeout(function() {
                degree = that.allDegree * that.effect(percentage);
                that.run(degree)
            }, 17);
            if (percentage >= 1) {
                clearTimeout(timeoutId);
                this.rotate(that.allDegree)
                this.callback();
            }
        }
    };
    return WheelLottery;
})
