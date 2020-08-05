<template>
	<div>
		<Hero :title="$route.meta.title"
			  :description="$route.meta.desc" />

		<div class="box box--fixed-width is-relative">
			<b-field horizontal=""
					 expanded=""
					 label="Konsol fiyatı">
				<b-field>
					<b-input data-cy="form.price"
							 min="1"
							 expanded=""
							 placeholder="Konsol fiyatı"
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
					 expanded=""
					 label="">
				<b-checkbox v-model="form.calculateOctoberTax">1 Ekim 2020'den sonra düşecek gümrük vergisine göre hesapla (Düşer mi gerçekten?)</b-checkbox>
			</b-field>

			<hr />

			<ExchangeRates />

			<template v-if="showResults">
				<hr />

				<b-message v-if="form.currency !== 'TRY'"
						   size="is-small">
					Ürünlerin ülkeye giriş fiyatını bilmediğimiz için gösterilen fiyatlar tahmidir. Gerçek satış fiyatı farklı olabilir ve muhtemelen daha az olacaktır.
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

				<b-field :label="`Gümrük (%${results.taxRates.custom})`"
						 horizontal=""
						 expanded="">
					<b-input data-cy="results.trtFee"
							 :value="currencyFormat(results.taxFees.custom, 'TRY')"
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
import ConsoleTaxCalc from "../../calculators/ConsoleTaxCalc";
import TaxCalc from "../../calculators/TaxCalc";


export default {
	name: "ConsoleTaxCalculator",
	data() {
		return {
			showResults: false,
			form: {
				price: "",
				currency: "TRY",
				calculateOctoberTax: false
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
		}
	},
	methods: {
		calculate: async function() {
			const vm = this;

			// Calculate and show results, only if possible
			vm.showResults = vm.form.price > 0 && vm.form.currency;
			if (!vm.showResults) {
				return;
			}

			// Calculate price
			const price = parseFloat(vm.form.price) * vm.$store.getters.getExchangeRate(vm.form.currency);

			// Set mode by the chosen currency
			const mode = vm.form.currency === "TRY" ? TaxCalc.MODE_CALCULATE_FROM_SALE_PRICE : TaxCalc.MODE_CALCULATE_FROM_BASE_PRICE;

			// Calculate tax
			const calculator = new ConsoleTaxCalc({
				price,
				mode,
				opts: {
					calculateOctoberTax: vm.form.calculateOctoberTax
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