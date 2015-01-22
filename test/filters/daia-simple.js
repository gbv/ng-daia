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
        var simple = { service: "none", available: false }; 

        expect(filter(undefined)).toEqual(simple);
        expect(filter(null)).toEqual(simple);
        expect(filter(0)).toEqual(simple);
        expect(filter(42)).toEqual(simple);
        expect(filter("")).toEqual(simple);
        expect(filter("available")).toEqual(simple);
    });

    it('Should return status on item/document', function() {
        var loan = { available: [ { service: "loan" } ] };

        var simple = { service: "loan", available: true }; 
        expect(filter( loan )).toEqual(simple);
        expect(filter({ item: [ loan ] })).toEqual(simple);
        expect(filter({ document: [{ item: [ loan ] }]})).toEqual(simple);
    });

    // ...
});
