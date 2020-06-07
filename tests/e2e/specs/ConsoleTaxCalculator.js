const Elements = {
	"form.price": "[data-cy=\"form.price\"]",
	"form.currency": "[data-cy=\"form.currency\"]"
};

describe("/hesaplayicilar/konsol-vergisi-hesaplayici", () => {
	describe("Share", () => {
		it("should pass correct data from query", () => {
			cy.visit("/hesaplayicilar/konsol-vergisi-hesaplayici?price=1000&currency=EUR");

			cy.get(Elements["form.price"])
				.invoke("val")
				.then(val => {
					expect(val).equal("1000");
				});

			return cy.get(Elements["form.currency"])
				.invoke("val")
				.then(val => {
					expect(val).equal("EUR");
				});
		});
	});
});