$.define(function(){
    var defaults = {
        current:1,
        onFirst: function() {
            //return false;
        },
        onLast: function() {
            //return false;
        },
        onChange:function(current){
        }
    };
    var pageHeight = window.innerHeight,pageWidth=window.innerWidth;
    var Page = function(element,options){
        this.element = $(element);
        this.options = $.extend(true, defaults, options);
        this.current = this.options.current,
        this.$items = this.element.children();
        this.itemsCount = this.$items.length;
        this._init(this.options);
    };
    Page.prototype = {
        _init: function(options) {
            this.$items.css({"width":pageWidth+"px","height":pageHeight+"px"})
            this._initEvents();
            this.jump(this.options.current);
        },
        _initEvents: function() {
            var self = this,
                start, delta, ishorizontal, el = this.element[0];
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
                start: function(event) {
                    //event.preventDefault();
                    event.stopPropagation();
                    var touches = event.touches[0];
                    start = {
                        x: touches.pageX,
                        y: touches.pageY,
                        time: +new Date
                    };
                    delta={x:0,y:0};
                    self.element.removeClass("isanimation");
                    ishorizontal = undefined;
                },
                move: function(event) {
                    event.preventDefault();
                    event.stopPropagation();

                    if (event.touches.length > 1 || event.scale && event.scale !== 1) return
                    var touches = event.touches[0];
                    delta = {
                        x: touches.pageX - start.x,
                        y: touches.pageY - start.y
                    }
                    if (typeof ishorizontal == 'undefined') {
                        ishorizontal = !!(ishorizontal || Math.abs(delta.y) < Math.abs(delta.x));
                    }
                    if (!ishorizontal) {
                        wrap.style.webkitTransform = 'translate3d(0px, '+ (-(self.current-1)*pageHeight+delta.y) +'px, 0px)'
                    }
                    
                },
                end: function(event) {
                    //event.preventDefault();
                    event.stopPropagation();
                    var duration = +new Date - start.time;
                    self.element.addClass("isanimation");
                    var isValid = (Number(duration) < 250 && Math.abs(delta.y) > 20) || Math.abs(delta.y) > pageWidth / 6;
                    if (!ishorizontal && isValid){
                        self._action(delta.y < 0 ? 'next' : 'prev');
                        return;
                    }
                    if (Math.abs(delta.y)<=pageWidth / 6) {
                        wrap.style.webkitTransform = 'translate3d(0px, '+ (-(self.current-1)*pageHeight) +'px, 0px)';
                    }
                }
            }
            el.addEventListener("touchstart", events);
            el.addEventListener("touchmove", events);
            el.addEventListener("touchend", events);
        },
        _action: function(dir) {
            this._navigate(dir);
        },
        _navigate: function(dir) {
            var self = this;
            if (dir === "next") {
                if (this.current > this.itemsCount - 1) {
                    this.current = this.itemsCount;
                } else {
                    this.current +=1;
                }
                if (this.current === 1){
                    this.options.onFirst();
                }
                if (this.current === this.itemsCount){
                    this.options.onLast();
                }
            } else if (dir === "prev") {
                if (this.current < 2) {
                    this.current = 1;
                    this.options.onFirst();
                } else {
                    this.current -=1;
                }
                if (this.current === this.itemsCount){
                    this.options.onLast();
                }
                if (this.current === 1){
                    this.options.onFirst();
                }
            }
            wrap.style.webkitTransform = 'translate3d(0px, '+ (-(self.current-1)*pageHeight) +'px, 0px)'
            this.$items.removeClass("current").eq(this.current-1).addClass("current");
            this.options.onChange(this.current);
        },
        jump: function(page) {
            this.current = page-1;
            this._action('next')
        }
    }
    return Page;
});