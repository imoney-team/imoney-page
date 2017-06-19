(function($,window,undefined){
    var defaults = {
        src:[],
        onload:function(){},
        oncomplete:function(){}
    };
    $.loadImg=function(options,element){
        this.$el = $(element);
        this.options = $.extend(true,{},defaults,options);
        this._init(this.options);
    }
    $.loadImg.prototype = {
        _init: function(options) {
            if (!$.isArray(this.options.src)) {
                return;
            };
            var self = this,len=this.options.src.length, count=0;
            $.each(this.options.src,function(i,element){
                var img = new Image();
                img.src=element;
                if (img.complete){
                    console.log("complete")
                    ++count;
                    self.options.onload((count/len*100).toFixed(0));
                    count==len && self.options.oncomplete();
                } else {
                    img.onload=function(e){
                        ++count;
                        self.options.onload((count/len*100).toFixed(0));
                        count==len && self.options.oncomplete();
                    }
                }
            })
        },
    }
    $.fn.loadImg = function(options) {
        if (typeof options === 'string') {
            var args = Array.prototype.slice.call(arguments, 1);
            this.each(function() {
                var $this = $(this);
                var instance = $this.data('loadImg');
                if (!instance) {
                    return;
                }
                var instance = $.fn.loadImg.lookup[$this.data('loadImg')];
                instance[options].apply(instance, args);
            });
        } else {
            this.each(function() {
                var $this = $(this);
                var instance = $this.data('loadImg');
                if (instance) {
                    instance._init();
                } else {
                    $.fn.loadImg.lookup[++$.fn.loadImg.lookup.i] = new $.loadImg(options, this);
                    instance = $this.data('loadImg', $.fn.loadImg.lookup.i);
                }
            });
        }
        return this;
    };
    $.fn.loadImg.lookup = {
        i: 0
    };
})($,window); 