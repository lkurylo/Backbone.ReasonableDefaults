

(function () {
    'use strict';
    
    Backbone.Model = _.extend(Backbone.Model, {
        set: function () {
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
});