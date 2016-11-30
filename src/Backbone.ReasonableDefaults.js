
(function(factory) {
    if (typeof exports === 'object') {
        module.exports = factory(require('backbone'), require('underscore'));
    } else if (typeof define === 'function' && define.amd) {
        define(['backbone', 'underscore'], factory);
    }
} (function(Backbone, _) {
    'use strict';

    Backbone.Model = _.extend(Backbone.Model, {
        set: function() {
            var attrs;

            if (typeof key === 'object') {
                attrs = key;
            } else {
                (attrs = {})[key] = val;
            }

            for (var i in attrs) {
                if (!(i in this.default)) {
                    throw 'Attr ' + i + ' doesn\'t exists in the Backbone.Model defaults'
                }
            }

            Backbone.Model.prototype.set.apply(this, arguments);
        }
    });
}));