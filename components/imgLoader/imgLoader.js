$.define(function(){
    var m_manifest;
    var ImgLoader = function() {};
    var p = ImgLoader.prototype;
    ImgLoader.prototype.init = function(m, onInit, timeout) {
        var self = this;
        m_manifest = this.clone(m);
        this.loadCount = 0;
        this.timeoutTime = timeout || 10000;
        this.maxLoadCount = m.length;
        this.onInit = onInit || function() {};
        this.onFileLoad = function() {};
        this.onFileError = function() {};
        this.onTimeout = function() {};
        this.onComplete = function() {};
        this.onInit();
    }
    ImgLoader.prototype.loadOne = function() {
        var self = this;
        var file = m_manifest.shift();
        var item = this.createLoadItem(file);
        var img = document.createElement('img');
        img.addEventListener('load', item.handleLoadSuccess, false);
        img.addEventListener('error', item.handleLoadError, false);
        img.src = file;
    }
    ImgLoader.prototype.loadAll = function() {
        var self = this;
        while (m_manifest.length > 0) {
            this.loadOne();
        }
        // When the timeout
        setTimeout(function() {
            if (self.maxLoadCount > self.loadCount) {
                self.onTimeout();
            }
        }, self.timeoutTime);
    }
    ImgLoader.prototype.createLoadItem = function(file) {
        var self = this;
        var loadItem = {};
        loadItem.src = file.src;
        loadItem.handleLoadSuccess = function(e) {
            self.loadCount++;
            self.onFileLoad(e);
            if (self.loadCount >= self.maxLoadCount) {
                self.onComplete(e);
            }
        }
        loadItem.handleLoadError = function(e) {
            self.onFileError(e);
        }
        return loadItem;
    }

    // Object deep copy
    ImgLoader.prototype.clone = function(that) {
        var clone = new(that.constructor);
        for (var i in that) {
            if (!that.hasOwnProperty(i)) continue;
            clone[i] = typeof that[i] == 'object' ? this.clone(that[i]) : that[i];
        }
        return clone;
    }
    return ImgLoader;
})
