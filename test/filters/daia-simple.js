describe('daiaSimple',function() {
    var filter;

    beforeEach(function(){
        module('ngDAIA');
        inject(function($injector) {
            var $filter = $injector.get('$filter');
            filter = $filter('daiaSimple');
        });
    });

    it('Should return status none at undefined/null/number/string', function() {
        expect(filter(undefined)).toEqual({ status: "none" });
        expect(filter(null)).toEqual({ status: "none" });
        expect(filter(0)).toEqual({ status: "none" });
        expect(filter(42)).toEqual({ status: "none" });
        expect(filter("")).toEqual({ status: "none" });
        expect(filter("available")).toEqual({ status: "none" });
    });

    it('Should return status on item/document', function() {
        var loan = { available: [ { service: "loan" } ] };

        expect(filter( loan )).toEqual({ status: "loan" });
        expect(filter({ item: [ loan ] })).toEqual({ status: "loan" });
        expect(filter({ document: [{ item: [ loan ] }]})).toEqual({ status: "loan" });
    });

    // ...
});
