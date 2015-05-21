describe("cityService", function() {

    var cityService = null,
        $httpBackend = null;

    beforeEach(module("emptyNgApp"));

    beforeEach(inject(function(_cityService_, _$httpBackend_) {
        cityService = _cityService_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("should call the cities rest url", function() {
        $httpBackend.expectGET("rest-service/cities");
        cityService.getCities();
    });
});