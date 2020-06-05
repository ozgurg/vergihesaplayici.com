const Elements = {
	"form.phonePrice": "[data-cy=\"form.phonePrice\"]",
	"form.currency": "[data-cy=\"form.currency\"]",
	"form.registration": "[data-cy=\"form.registration\"]",
	"results.taxFreePrice": "[data-cy=\"results.taxFreePrice\"]",
	"results.ministryOfCultureFee": "[data-cy=\"results.ministryOfCultureFee\"]",
	"results.trtFee": "[data-cy=\"results.trtFee\"]",
	"results.sctFree": "[data-cy=\"results.sctFree\"]",
	"results.vatFee": "[data-cy=\"results.vatFee\"]",
	"results.registrationFee": "[data-cy=\"results.registrationFee\"]",
	"results.totalTaxFee": "[data-cy=\"results.totalTaxFee\"]",
	"results.salePrice": "[data-cy=\"results.salePrice\"]"
};

describe("/hesaplayicilar/telefon-vergisi-hesaplayici", () => {
	const SamplePrice = 1000;

	describe("Kayıt yolu: Pasaport yoluyla kayıtlı", () => {
		it("should shown correct elements", () => { // eslint-disable-line jest/expect-expect
			cy.visit("/hesaplayicilar/telefon-vergisi-hesaplayici");

			cy.get(Elements["form.phonePrice"])
				.type(SamplePrice.toString());

			cy.get(Elements["form.currency"])
				.select("EUR");

			return cy.get(Elements["form.registration"])
				.select("import")
				.then(() => {
					[
						"results.taxFreePrice",
						"results.ministryOfCultureFee",
						"results.trtFee",
						"results.sctFree",
						"results.vatFee",
						"results.totalTaxFee",
						"results.salePrice"
					].forEach(element => {
						cy.get(Elements[element]).should("be.visible");
					});
				});
		});
	});

	describe("Kayıt yolu: İthalat yoluyla kayıtlı", () => {
		it("should shown correct elements", () => { // eslint-disable-line jest/expect-expect
			cy.visit("/hesaplayicilar/telefon-vergisi-hesaplayici");

			cy.get(Elements["form.phonePrice"])
				.type(SamplePrice.toString());

			cy.get(Elements["form.currency"])
				.select("EUR");

			return cy.get(Elements["form.registration"])
				.select("passport")
				.then(() => {
					[
						"results.taxFreePrice",
						"results.trtFee",
						"results.registrationFee",
						"results.totalTaxFee",
						"results.salePrice"
					].forEach(element => {
						cy.get(Elements[element]).should("be.visible");
					});
				});
		});
	});

	describe("Share", () => {
		it("should pass correct data from query", () => {
			cy.visit("/hesaplayicilar/telefon-vergisi-hesaplayici?phonePrice=1000&currency=EUR&registration=import");

			cy.get(Elements["form.phonePrice"])
				.invoke("val")
				.then(val => {
					expect(val).equal("1000");
				});

			cy.get(Elements["form.currency"])
				.invoke("val")
				.then(val => {
					expect(val).equal("EUR");
				});

			return cy.get(Elements["form.registration"])
				.invoke("val")
				.then(val => {
					expect(val).equal("import");
				});
		});
	});
});
