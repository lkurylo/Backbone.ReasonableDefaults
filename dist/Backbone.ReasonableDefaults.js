/*

Backbone.ReasonableDefaults v0.0.1

Copyright (c) 2016 Łukasz Kuryło
Distributed under MIT License

Full source code at https://github.com/lkurylo/Backbone.ReasonableDefaults

*/

(function(factory) {
    if (typeof exports === 'object') {
        module.exports = factory(require('backbone'), require('underscore'));
    } else if (typeof define === 'function' && define.amd) {
        define(['backbone', 'underscore'], factory);
    }
} (function(Backbone, _) {
    'use strict';

    var original = Backbone.Model.prototype.set;

    _.extend(Backbone.Model.prototype, {
        set: function(key, val, options) {
            if (this.default) {
                var attrs;

                if (typeof key === 'object') {
                    attrs = key;
                } else {
                    (attrs = {})[key] = val;
                }

                var properties = (typeof this.default === 'function') ? this.default(): this.default; 
                //if (typeof this.default === 'function') properties = this.default();

                for (var i in attrs) {
                    if (!(i in properties)) {
                        throw 'Attr ' + i + ' doesn\'t exists in the Backbone.Model defaults'
                    }
                }
            }

            original.apply(this, arguments);
        }
    });
}));