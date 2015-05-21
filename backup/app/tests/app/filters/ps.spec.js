describe("ps", function() {

    var ps = null;

    beforeEach(module("emptyNgApp"));

    beforeEach(inject(function($filter) {
        ps = $filter("ps");
    }));

    it("should calculate the ps of kWh", function() {
        expect(ps(10)).toBe(14);
    });

});