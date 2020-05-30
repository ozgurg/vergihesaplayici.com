const {currencyFormat} = require("../../../src/modules/Common/utils/_index");
const axios = require("axios");

const Elements = {
	"form.phoneSearch": "[data-cy=\"form.phoneSearch\"]",
	"form.phoneSearch.props": "[data-cy=\"form.phoneSearch.props\"]",
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
	let EUR = 0;

	before(async () => {
		await axios.get("https://api.exchangeratesapi.io/latest?base=EUR&symbols=TRY")
			.then(response => response.data)
			.then(latestCurrency => {
				EUR = latestCurrency.rates["TRY"];
			});
	});

	beforeEach(() => {
		cy.visit("/hesaplayicilar/telefon-vergisi-hesaplayici");

		cy.get(Elements["form.phonePrice"])
			.type(SamplePrice.toString());

		cy.get(Elements["form.currency"])
			.select("EUR");
	});


	describe("Kayıt yolu: Pasaport yoluyla kayıtlı", () => {
		it("should shown correct elements", () => { // eslint-disable-line jest/expect-expect
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
		});

		it("should calculate and print correct prices", async () => {
			cy.get(Elements["form.registration"])
				.select("1");

			const taxFreePrice = SamplePrice * EUR;
			let salePrice = taxFreePrice;
			let totalTaxFee = 0;

			cy.get(Elements["results.taxFreePrice"])
				.invoke("val")
				.then(price => {
					expect(price).to.equal(currencyFormat(taxFreePrice, "TRY")); // eslint-disable-line jest/valid-expect
				});

			cy.get(Elements["results.ministryOfCultureFee"])
				.invoke("val")
				.then(price => {
					const ministryOfCultureFee = (salePrice / 100);
					salePrice += ministryOfCultureFee;
					totalTaxFee += ministryOfCultureFee;

					expect(price).to.equal(currencyFormat(ministryOfCultureFee, "TRY")); // eslint-disable-line jest/valid-expect
				});

			cy.get(Elements["results.trtFee"])
				.invoke("val")
				.then(price => {
					const trtFee = (taxFreePrice / 100) * 10;
					salePrice += trtFee;
					totalTaxFee += trtFee;

					expect(price).to.equal(currencyFormat(trtFee, "TRY")); // eslint-disable-line jest/valid-expect
				});

			cy.get(Elements["results.sctFree"])
				.invoke("val")
				.then(price => {
					const sctFree = (salePrice / 100) * 50;
					salePrice += sctFree;
					totalTaxFee += sctFree;

					expect(price).to.equal(currencyFormat(sctFree, "TRY")); // eslint-disable-line jest/valid-expect
				});

			cy.get(Elements["results.vatFee"])
				.invoke("val")
				.then(price => {
					const vatFee = (salePrice / 100) * 18;
					salePrice += vatFee;
					totalTaxFee += vatFee;

					expect(price).to.equal(currencyFormat(vatFee, "TRY")); // eslint-disable-line jest/valid-expect
				});

			cy.get(Elements["results.totalTaxFee"])
				.invoke("val")
				.then(price => {
					expect(price).to.equal(currencyFormat(totalTaxFee, "TRY")); // eslint-disable-line jest/valid-expect
				});

			cy.get(Elements["results.salePrice"])
				.invoke("val")
				.then(price => {
					expect(price).to.equal(currencyFormat(salePrice, "TRY")); // eslint-disable-line jest/valid-expect
				});

			return true;
		});
	});

	describe("Kayıt yolu: İthalat yoluyla kayıtlı", () => {
		it("should shown correct elements", () => { // eslint-disable-line jest/expect-expect
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
		});

		it("should calculate and print correct prices", async () => {
			cy.get(Elements["form.registration"])
				.select("2");

			const taxFreePrice = SamplePrice * EUR;
			let salePrice = taxFreePrice;
			let totalTaxFee = 0;

			cy.get(Elements["results.taxFreePrice"])
				.invoke("val")
				.then(price => {
					expect(price).to.equal(currencyFormat(taxFreePrice, "TRY")); // eslint-disable-line jest/valid-expect
				});

			cy.get(Elements["results.trtFee"])
				.invoke("val")
				.then(price => {
					const trtFee = 20 * EUR;
					salePrice += trtFee;
					totalTaxFee += trtFee;

					expect(price).to.equal(currencyFormat(trtFee, "TRY")); // eslint-disable-line jest/valid-expect
				});

			cy.get(Elements["results.registrationFee"])
				.invoke("val")
				.then(price => {
					const registrationFee = 1838;
					salePrice += registrationFee;
					totalTaxFee += registrationFee;

					expect(price).to.equal(currencyFormat(registrationFee, "TRY")); // eslint-disable-line jest/valid-expect
				});

			cy.get(Elements["results.totalTaxFee"])
				.invoke("val")
				.then(price => {
					expect(price).to.equal(currencyFormat(totalTaxFee, "TRY")); // eslint-disable-line jest/valid-expect
				});

			cy.get(Elements["results.salePrice"])
				.invoke("val")
				.then(price => {
					expect(price).to.equal(currencyFormat(salePrice, "TRY")); // eslint-disable-line jest/valid-expect
				});

			return true;
		});
	});

	describe("Telefon: Arama", () => {
		it("Test searching", () => {
			cy.get(Elements["form.phoneSearch"]).type("iPhone 11 Pro Max");

			cy.wait(1000); // Wait for response from Algolia

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
	});
});