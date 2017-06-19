$.define(function() {
    var defaults = {
        src: "",
        autoplay: false,
        loop:true
    }
    function Music(element, options) {
        this.options = $.extend({}, defaults, options);
        this.$element = $(element);
        this.audio = new Audio();
        this.audioState = '';
        this._init();
    }
    Music.prototype = {
        _init: function() {
            var self = this;
            this.audio.src = this.options.src;
            this.audio.autoplay = this.options.autoplay;
            this.audio.loop = this.options.loop;
            var handlers = {
                handleEvent:function(e){
                    switch(e.type){
                        case "play":
                            this.play(e);
                            break;
                        case "pause":
                            this.pause(e);
                            break;
                    }
                },
                play:function(e){
                    self.audioState = 'playing';
                    self.$element.addClass("playing");
                    if (self.$element.hasClass("pause")){
                        self.$element.removeClass("pause");
                    }
                },
                pause:function(e){
                    self.audioState = 'pause';
                    self.$element.addClass("pause");
                    if (self.$element.hasClass("playing")){
                        self.$element.removeClass("playing");
                    }
                }
            }
            this.audio.addEventListener("play",handlers);
            this.audio.addEventListener("pause",handlers);
            this.$element[0].addEventListener('touchstart', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (self.audioState === 'playing') {
                    self.pause.apply(self);
                } else {
                    self.play.apply(self);
                }
            });
        },
        play: function() {
            this.audio.play();
        },
        pause: function() {
            this.audio.pause();
        }
    }
    return Music;
})