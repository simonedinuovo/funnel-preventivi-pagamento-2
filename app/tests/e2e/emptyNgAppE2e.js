describe("emptyNgApp", function() {

    describe("open test url", function() {
        it("should open the emptyNgApp", function() {
            browser.get('http://localhost:9001');
        });
    });

    describe("fill quoteForm", function() {
        it("should fill the age in the age field", function() {
            element(by.css('[id="age"]')).clear();
            element(by.css('[id="age"]')).sendKeys('39');
            expect(element(by.css('[id="age"]')).getAttribute("value")).toEqual('39');
        });

        it("should select the city", function() {
            element(by.xpath('//select[@id="city"]/option[text()="Rio"]')).click();
        });

        it("should select the vehicle", function() {
            element(by.xpath('//select[@id="vehicle"]/option[text()="Medium"]')).click();
        });

        it("should set the power to 100 kW", function() {
            browser.actions().dragAndDrop(element(by.css('[id="power"]')),{x:10,y:0}).perform();
        });

        it("should click the 'Jetzt herausfinden' button", function() {
            element(by.css('[type="submit"]')).click();
        });

        it("should click the 'Daten ändern' button", function() {
            element(by.css('[type="button"]')).click();
        });
    });

});