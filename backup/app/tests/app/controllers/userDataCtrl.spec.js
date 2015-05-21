describe("userDataCtrl", function() {

    var userDataCtrl = null,
        $scope = null,
        $location = null,
        quoteService = null;

    beforeEach(module("emptyNgApp"));

    beforeEach(inject(function($controller, _$location_, _quoteService_) {
        $location = _$location_
        $scope = {};
        quoteService  =_quoteService_;
        userDataCtrl = $controller("userDataCtrl", {
            $scope: $scope,
            $location: $location,
            quoteService: _quoteService_,
            cities: {}
        });
        $scope.quoteForm = {
            $invalid: false
        };
    }));

    describe("quoteRequest", function() {
        it("should change the location path to '/quote'", function() {
            $location.path("testPath");
            $scope.quoteRequest();
            expect($location.path()).toBe("/quote");
        });

        it("should call the quoteService and set the quote data", function() {
            $scope.quote = "test";
            $scope.quoteRequest();
            expect(quoteService.getQuoteData()).toBe("test");
        });
    });

});