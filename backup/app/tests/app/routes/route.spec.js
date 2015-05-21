describe("route", function() {

    var $route = null;

    beforeEach(module("emptyNgApp"));

    beforeEach(inject(function(_$route_) {
        $route = _$route_;
    }));

    describe("routes", function() {
        it("should contain / with controller:userDataCtrl templateUrl:app/partials/userdata.html", function() {
            expect($route.routes['/'].controller).toBe('userDataCtrl');
            expect($route.routes['/'].templateUrl).toBe('app/partials/userdata.html');
        });

        it("should contain /quote with controller:quoteCtrl templateUrl:app/partials/quote.html", function() {
            expect($route.routes['/quote'].controller).toBe('quoteCtrl');
            expect($route.routes['/quote'].templateUrl).toBe('app/partials/quote.html');
        });
    });
});