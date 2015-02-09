'use strict';

describe('daia-item directive', function() {
    var $compile, $rootScope;

    beforeEach(module('ngDAIA'));

    beforeEach(inject(function(_$compile_, _$rootScope_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;  
    }));

    it('should be tested', function() {
        var element = $compile('<div daia-item="example" />')($rootScope);
        $rootScope.example = { label: "sample label" }; // TODO: more
        $rootScope.$digest();
        expect(element.html()).toContain("sample label");
    });
});
