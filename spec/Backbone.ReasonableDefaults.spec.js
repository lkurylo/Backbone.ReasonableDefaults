describe('Backbone.ReasonableDefaults', function () {
    it('exist property that is set only when plugin is loaded', function () {
        var isLoaded = Backbone.Model.reasonableDefaultLoaded;

        expect(isLoaded).toBe(true);
    });

    it('can set custom fields when no `defaults` provided', function () {
        var myModel = Backbone.Model.extend({});

        var model = new myModel();

        model.set({
            'customField': true
        });

        expect(model.get('customField')).toBe(true);
    });

    it('can set fields that exists in `defaults`', function () {
        var myModel = Backbone.Model.extend({
            default: {
                customField: false
            }
        });

        var model = new myModel();

        model.set({
            'customField': true
        });

        expect(model.get('customField')).toBe(true);
    });

    it('cannot set fields that not exists in `defaults`', function () {
        var myModel = Backbone.Model.extend({
            default: {
                customField: false
            }
        });

        var model = new myModel();

        expect(function () {
            model.set({
                'customField2': true
            });
        }).toThrow('Attr customField2 doesn\'t exists in the Backbone.Model defaults');
    });
});