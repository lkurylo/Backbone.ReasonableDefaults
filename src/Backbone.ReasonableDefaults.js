(function (factory) {
    if (typeof exports === 'object') {
        module.exports = factory(require('backbone'), require('underscore'));
    } else if (typeof define === 'function' && define.amd) {
        define(['backbone', 'underscore'], factory);
    } else {
        factory(Backbone, _);
    }
}(function (Backbone, _) {
    'use strict';

    Backbone.Model.reasonableDefaultLoaded = true;

    var original = Backbone.Model.prototype.set;

    _.extend(Backbone.Model.prototype, {
        set: function (key, val, options) {
            if (this.default) {
                var attrs;

                if (typeof key === 'object') {
                    attrs = key;
                } else {
                    (attrs = {})[key] = val;
                }

                var properties = (typeof this.default === 'function') ? this.default() : this.default;

                for (var i in attrs) {
                    if (!(i in properties)) {
                        throw 'Attr ' + i + ' doesn\'t exists in the Backbone.Model defaults'
                    }
                }
            }

            original.apply(this, arguments);
        }
    });

    return Backbone;
}));