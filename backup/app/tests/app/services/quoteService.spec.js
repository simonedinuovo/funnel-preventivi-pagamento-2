describe("quoteService", function() {

    var quoteService = null,
        $httpBackend = null;

    beforeEach(module("emptyNgApp"));

    beforeEach(inject(function(_quoteService_, _$httpBackend_) {
        quoteService = _quoteService_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("should call the quote rest url", function() {
        $httpBackend.expectPOST("rest-service/doQuote");
        quoteService.getQuote();
    });
});