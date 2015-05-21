describe("quoteCtrl", function() {

    var quoteCtrl = null,
        $scope = null,
        $location = null;

    beforeEach(module("emptyNgApp"));

    beforeEach(inject(function($controller, _$location_) {
        $location = _$location_
        $scope = {};
        quoteCtrl = $controller("quoteCtrl", {
            $scope: $scope,
            $location: $location,
            quote: {}
        });
    }));

    describe("modData", function() {
        it("should change the location path to '/'", function() {
            $location.path("testPath");
            $scope.modData();
            expect($location.path()).toBe("/");
        });
    });

});