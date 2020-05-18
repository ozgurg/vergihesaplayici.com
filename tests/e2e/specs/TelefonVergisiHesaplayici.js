// const axios = require("axios");
// const {currencyFormat} = require("../../../src/modules/Common/utils/_index");

// const Currencies = {};

const Elements = {
	"form.phoneSearch": "[data-cy=\"form.phoneSearch\"]",
	"form.phoneSearch.props": "[data-cy=\"form.phoneSearch.props\"]",
	"form.phonePrice": "[data-cy=\"form.phonePrice\"]",
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

const SamplePrice = 1000;

/* before(async () => {
	Currencies = {
		USD: await new GetCurrency("USD"),
		EUR: await new GetCurrency("EUR"),
		CNY: await new GetCurrency("CNY"),
		INR: await new GetCurrency("INR")
	};
}); */

beforeEach(() => {
	cy.visit("/hesaplayicilar/telefon-vergisi-hesaplayici");

	cy.get(Elements["form.phonePrice"])
		.type(SamplePrice.toString());
});

describe("/hesaplayicilar/telefon-vergisi-hesaplayici", () => {
	it("Test 'İthalat yoluyla kayıtlı'", () => { // eslint-disable-line jest/expect-expect
		return cy.get(Elements["form.registration"])
			.select("1")
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

		// TODO: Calculation test will be written.
	});

	it("Test 'Pasaport yoluyla kayıtlı'", () => { // eslint-disable-line jest/expect-expect
		return cy.get(Elements["form.registration"])
			.select("2")
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

		// TODO: Calculation test will be written.
	});

	it("Test searching", () => {
		cy.get(Elements["form.phoneSearch"]).type("iPhone");

		cy.wait(2000);

		cy.get(Elements["form.phoneSearch.props"])
			.first()
			.should("be.visible");

		cy.get(Elements["form.phoneSearch"]).type("{downarrow}{enter}");

		return cy.get(Elements["form.phoneSearch.props"])
			.first()
			.invoke("attr", "data-price")
			.then(dataPrice => {
				cy.get(Elements["form.phonePrice"])
					.invoke("val")
					.then(phonePrice => {
						expect(phonePrice).to.equal(dataPrice); // eslint-disable-line jest/valid-expect
					});
			});
	});

	// TODO: Copy share URL test will be written.
});

/* function GetCurrency(base) {
	return axios.get(`https://api.exchangeratesapi.io/latest?base=${base}&symbols=TRY`)
		.then(response => response.data)
		.then(latestCurrency => latestCurrency.rates["TRY"]);
} */