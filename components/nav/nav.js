$.define(function(){
    var pageWidth = window.innerWidth;
    var defaults = {
        onChange: function(current) {}
    };
    function Nav(element, options) {
        this.$el = $(element);
        this.$panel = this.$el.find("ul");
        this.$items = this.$panel.children();
        this.options = $.extend(true, defaults, options);
        this._init();
    }
    Nav.prototype = {
        _init: function() {
            var self = this,
                andoridVer, widthData = [];
            $.each(this.$items, function(i, item) {
                widthData.push(item.offsetWidth);
            });
            var allWidth = eval(widthData.join("+")) + 1;
            this.$panel[0].style.width = allWidth + 'px';
            this._heighlightNav();
            if (/Android\s{1}(.{1})/.test(navigator.userAgent)) {
                andoridVer = RegExp["$1"];
            }
            if (andoridVer < 3) {
                self.$panel[0].style.left = 0 + 'px';
                self._initEvents({
                    maxDistance: allWidth - pageWidth
                });
            } else {
                this.$el.find(".ui-nav-fix").css({
                    "overflow-x": "auto",
                    "-webkit-overflow-scrolling": "touch",
                    "overflow-scrolling": "touch"
                })
            }
        },
        _initEvents: function(cfg) {
            var start, delta, self = this,
                ishorizontal, startLeft,
                el = this.$panel[0];
            var events = {
                handleEvent: function(event) {
                    switch (event.type) {
                        case 'touchstart':
                            this.start(event);
                            break;
                        case 'touchmove':
                            this.move(event);
                            break;
                        case 'touchend':
                            this.end(event);
                            break;
                    }
                },
                start: function(e) {
                    var touches = event.touches[0];
                    starLeft = parseInt(el.style.left);
                    start = {
                        x: touches.pageX,
                        y: touches.pageY,
                        time: +new Date
                    };
                    delta = {
                        x: 0,
                        y: 0
                    };
                    ishorizontal = undefined;
                    self.$panel.removeClass("ui-animation");
                },
                move: function(e) {
                    event.preventDefault();
                    if (event.touches.length > 1 || event.scale && event.scale !== 1) return;
                    var touches = event.touches[0];
                    delta = {
                        x: touches.pageX - start.x,
                        y: touches.pageY - start.y
                    }
                    if (typeof ishorizontal == 'undefined') {
                        ishorizontal = !!(ishorizontal || Math.abs(delta.y) < Math.abs(delta.x));
                    }
                    //console.log(delta.x)
                    if ((parseInt(el.style.left) <= -cfg.maxDistance && delta.x < 0) || (parseInt(el.style.left) >= 0 && delta.x > 0)) {
                        return;
                    }

                    if (ishorizontal) {
                        el.style.left = starLeft + delta.x + 'px'
                    }
                },
                end: function(e) {
                    event.preventDefault();
                    //event.stopPropagation();
                    self.$panel.addClass("ui-animation");
                    if (parseInt(el.style.left) <= -cfg.maxDistance && delta.x < 0) {
                        el.style.left = -cfg.maxDistance + 'px';
                    }
                    if (parseInt(el.style.left) >= 0 && delta.x > 0) {
                        el.style.left = 0 + 'px';
                    }
                }
            }
            el.addEventListener("touchstart", events);
            el.addEventListener("touchmove", events);
            el.addEventListener("touchend", events);
        },
        _index: function(current, obj) {
            for (var i = 0; i < obj.length; i++) {
                if (obj[i] == current) {
                    return i;
                }
            }
        },
        _heighlightNav: function() {
            var self = this;
            this.$el[0].addEventListener("touchend", function(e) {
                var target = e.target;
                var srcElementTagName = this.tagName;
                while (target.tagName !== "LI" && target.tagName !== srcElementTagName) {
                    target = target.parentNode;
                }
                if (target.tagName === "LI") {
                    self.$items.removeClass("active");
                    $(target).addClass("active");
                    self.options.onChange(self._index(target,self.$items))
                }
            });
        }
    }
    return Nav;
})