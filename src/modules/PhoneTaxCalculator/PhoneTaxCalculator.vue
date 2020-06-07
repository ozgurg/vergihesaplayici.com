<template>
	<div>
		<Hero :title="$route.meta.title"
			  :description="$route.meta.desc" />

		<div class="box box--fixed-width is-relative">
			<b-field horizontal=""
					 expanded=""
					 label="Telefon fiyatı">
				<b-field>
					<b-input data-cy="form.price"
							 min="1"
							 expanded=""
							 placeholder="Telefon fiyatı"
							 step="1"
							 v-model="form.price"
							 type="number" />
					<div class="control">
						<b-select data-cy="form.currency"
								  v-model="form.currency">
							<option v-for="(currencyName, currencyKey) in $store.getters.getCurrencies"
									:key="currencyKey">
								{{currencyName}}
							</option>
						</b-select>
					</div>
				</b-field>
			</b-field>


			<b-field horizontal=""
					 label="Kayıt yolu">
				<b-select data-cy="form.registration"
						  v-model="form.registration"
						  expanded="">
					<option :value="Constants.RegistrationTypes.REGISTRATION_IMPORT">İthalat yoluyla kayıtlı (Resmi)</option>
					<option :value="Constants.RegistrationTypes.REGISTRATION_PASSPORT">Pasaport yoluyla kayıtlı</option>
				</b-select>
			</b-field>

			<hr />

			<ExchangeRates />

			<template v-if="showResults">
				<hr />

				<b-message v-if="form.currency !== 'TRY'"
						   size="is-small">
					Ürünlerin ülkeye giriş fiyatını bilmediğimiz fiyatlar tahmidir. Gerçek satış fiyatı farklı olabilir ve muhtemelen daha az olacaktır.
				</b-message>

				<b-field horizontal=""
						 expanded=""
						 label="Vergisiz fiyat">
					<b-input data-cy="results.taxFreePrice"
							 :value="currencyFormat(results.prices.basePrice, 'TRY')"
							 expanded=""
							 readonly=""
							 custom-class="is-static" />
				</b-field>

				<template v-if="form.registration === Constants.RegistrationTypes.REGISTRATION_IMPORT">
					<b-field :label="`Kültür Bakanlığı (%${results.taxRates.ministryOfCulture})`"
							 horizontal=""
							 expanded="">
						<b-input data-cy="results.ministryOfCultureFee"
								 :value="currencyFormat(results.taxFees.ministryOfCulture, 'TRY')"
								 expanded=""
								 readonly=""
								 custom-class="is-static" />
					</b-field>

					<b-field :label="`TRT Bandrolü (%${results.taxRates.trt})`"
							 horizontal=""
							 expanded="">
						<b-input data-cy="results.trtFee"
								 :value="currencyFormat(results.taxFees.trt, 'TRY')"
								 expanded=""
								 readonly=""
								 custom-class="is-static" />
					</b-field>

					<b-field :label="`ÖTV (%${results.taxRates.sct})`"
							 horizontal=""
							 expanded="">
						<b-input data-cy="results.sctFree"
								 :value="currencyFormat(results.taxFees.sct, 'TRY')"
								 expanded=""
								 readonly=""
								 custom-class="is-static" />
					</b-field>

					<b-field :label="`KDV (%${results.taxRates.vat})`"
							 horizontal=""
							 expanded="">
						<b-input data-cy="results.vatFee"
								 :value="currencyFormat(results.taxFees.vat, 'TRY')"
								 expanded=""
								 readonly=""
								 custom-class="is-static" />
					</b-field>
				</template>

				<template v-else-if="form.registration === Constants.RegistrationTypes.REGISTRATION_PASSPORT">
					<b-field :label="`TRT Bandrolü (${currencyFormat(results.taxRates.trtPassport, 'EUR')})`"
							 horizontal=""
							 expanded="">
						<b-input data-cy="results.trtFee"
								 :value="currencyFormat(results.taxFees.trtPassport, 'TRY')"
								 expanded=""
								 readonly=""
								 custom-class="is-static" />
					</b-field>

					<b-field horizontal=""
							 expanded=""
							 label="Kayıt ücreti">
						<b-input data-cy="results.registrationFee"
								 :value="currencyFormat(results.taxFees.registration, 'TRY')"
								 expanded=""
								 readonly=""
								 custom-class="is-static" />
					</b-field>
				</template>

				<b-field :label="`Toplam vergi (%${results.taxRates.total})`"
						 horizontal=""
						 expanded="">
					<b-input data-cy="results.totalTaxFee"
							 :value="currencyFormat(results.taxFees.total, 'TRY')"
							 expanded=""
							 readonly=""
							 custom-class="is-static" />
				</b-field>

				<b-field horizontal=""
						 expanded=""
						 label="Satış fiyatı">
					<b-input data-cy="results.salePrice"
							 :value="currencyFormat(results.prices.salePrice, 'TRY')"
							 expanded=""
							 readonly=""
							 custom-class="is-static" />
				</b-field>

				<b-field horizontal>
					<div class="control">
						<MinimumWageInfo :price="results.prices.salePrice" />
						<Share :data="form" />
					</div>
				</b-field>
			</template>
		</div>
	</div>
</template>

<script>
import Vue from "vue";
import PhoneTaxCalc from "../../calculators/PhoneTaxCalc";
import TaxCalc from "../../calculators/TaxCalc";


export default {
	name: "PhoneTaxCalculator",
	data() {
		const Constants = {
			RegistrationTypes: {
				REGISTRATION_IMPORT: PhoneTaxCalc.REGISTRATION_IMPORT,
				REGISTRATION_PASSPORT: PhoneTaxCalc.REGISTRATION_PASSPORT
			}
		};
		return {
			Constants,
			showResults: false,
			form: {
				price: "",
				currency: "TRY",
				registration: Constants.RegistrationTypes.REGISTRATION_IMPORT
			},
			results: {
				prices: {},
				taxFees: {},
				taxRates: {}
			}
		};
	},
	created() {
		const vm = this;

		// Set data from query with validate them
		if (vm.$route.query) {
			if (vm.$route.query.price) {
				vm.form.price = parseFloat(vm.$route.query.price);
			}

			if (vm.$route.query.currency && vm.$store.getters.getCurrencies.includes(vm.$route.query.currency)) {
				vm.form.currency = vm.$route.query.currency;
			}

			if (vm.$route.query.registration && Object.values(vm.Constants.RegistrationTypes).includes(vm.$route.query.registration)) {
				vm.form.registration = vm.$route.query.registration;
			}
		}
	},
	methods: {
		calculate: async function() {
			const vm = this;

			// Calculate and show results, only if possible
			vm.showResults = vm.form.price > 0 && vm.form.currency && vm.form.registration;
			if (!vm.showResults) {
				return;
			}

			// Calculate price
			const price = parseFloat(vm.form.price) * vm.$store.getters.getExchangeRate(vm.form.currency);

			// Set mode by the chosen currency
			const mode = vm.form.currency === "TRY" ? TaxCalc.MODE_CALCULATE_FROM_SALE_PRICE : TaxCalc.MODE_CALCULATE_FROM_BASE_PRICE;

			// Calculate tax
			const calculator = new PhoneTaxCalc({
				price,
				mode,
				opts: {
					registration: vm.form.registration
				}
			}).calculate();

			vm.results.prices = calculator.prices;
			vm.results.taxFees = calculator.taxFees;
			vm.results.taxRates = calculator.taxRates;
		}
	},
	watch: {
		form: {
			deep: true,
			handler() {
				this.calculate();
			}
		}
	},
	metaInfo() {
		const vm = this;

		return {
			title: vm.$route.meta.title,
			titleTemplate: Vue.prototype.VueMetaTemplate,
			meta: [
				{ name: "description", content: vm.$route.meta.desc },
				{ property: "og:title", content: Vue.prototype.VueMetaTemplate.replace("%s", vm.$route.meta.title) },
				{ property: "og:description", content: vm.$route.meta.desc },
				{ property: "og:type", content: "website" }
			]
		};
	}
};
</script>