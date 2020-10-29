<template>
	<div>
		<HorizontalForm class="mb-3"
						label="Konsol fiyatı">
			<v-row dense="">
				<v-col class="py-0"
					   cols="9">
					<v-text-field
						v-model.number="form.price"
						:prefix="getCurrencySign(form.currency)"
						autofocus=""
						dense=""
						hide-details=""
						outlined=""
						step="any"
						type="number" />
				</v-col>

				<v-col class="py-0"
					   cols="3">
					<v-select
						v-model="form.currency"
						:items="ui.availableCurrencies"
						dense=""
						hide-details=""
						outlined="" />
				</v-col>
			</v-row>
		</HorizontalForm>

		<HorizontalForm class="mb-3">
			<v-checkbox
				v-model="form.reducedCustomRate"
				hide-details=""
				class="ma-0"
				label="2020 sonunda düşecek olan gümrük vergisine göre hesapla" />
		</HorizontalForm>

		<template v-if="showResults">
			<v-divider class="my-6" />

			<CustomsInfoAlert v-if="form.currency !== 'TRY'" />

			<HorizontalForm class="mb-2">
				<h3>Hesaplama Sonuçları</h3>
			</HorizontalForm>

			<ResultHorizontalForm :value="$moneyFormat(results.prices.basePrice, 'TRY')"
								  class="mb-3"
								  label="Vergisiz fiyat" />

			<ResultHorizontalForm :label="`Gümrük vergisi (%${results.taxRates.custom})`"
								  :value="$moneyFormat(results.taxFees.custom, 'TRY')"
								  class="mb-3" />

			<ResultHorizontalForm :label="`ÖTV (%${results.taxRates.sct})`"
								  :value="$moneyFormat(results.taxFees.sct, 'TRY')"
								  class="mb-3" />

			<ResultHorizontalForm :label="`KDV (%${results.taxRates.vat})`"
								  :value="$moneyFormat(results.taxFees.vat, 'TRY')"
								  class="mb-3" />

			<ResultHorizontalForm :label="`Toplam vergi (%${results.taxRates.total})`"
								  :value="$moneyFormat(results.taxFees.total, 'TRY')"
								  class="mb-3" />

			<ResultHorizontalForm :value="$moneyFormat(results.prices.salePrice, 'TRY')"
								  class="mb-3"
								  label="Tahmini satış fiyatı" />

			<HorizontalForm class="mb-6">
				<MinimumWageAlert :price="results.prices.salePrice" />
			</HorizontalForm>

			<HorizontalForm>
				<Share :data="form" />
			</HorizontalForm>
		</template>
	</div>
</template>

<script>
import BaseCalculator from "@/calculators/BaseCalculator";
import ConsoleTaxCalculator from "@/calculators/ConsoleTaxCalculator";

export default {
	layout: "default/index",
	name: "ConsoleTaxCalculator",
	data: () => ({
		info: {
			title: "Konsol Vergisi Hesaplayıcı"
		},
		ui: {
			availableCurrencies: []
		},
		form: {
			currency: "USD",
			price: "",
			reducedCustomRatereducedCustomRate: false
		},
		results: {
			prices: {},
			taxFees: {},
			taxRates: {}
		}
	}),
	methods: {
		calculate() {
			const vm = this;

			// Calculate price
			const price = parseFloat(vm.form.price) * vm.getExchangeRate(vm.form.currency);

			// Calculation mode
			const mode = BaseCalculator.getModeByCurrency(vm.form.currency);

			// Calculate
			const calculator = new ConsoleTaxCalculator(
				vm.$store.get("exchangeRates/currencies"),
				price,
				mode,
				{
					reducedCustomRate: vm.form.reducedCustomRate
				}
			).calculate();

			vm.results.prices = calculator.prices;
			vm.results.taxFees = calculator.taxFees;
			vm.results.taxRates = calculator.taxRates;
		},
		getExchangeRate(currency) {
			const vm = this;
			return vm.$store.get(`exchangeRates/currencies@${currency}`)["rate"];
		},
		getCurrencySign(currency) {
			const vm = this;
			return vm.$store.get(`exchangeRates/currencies@${currency}`)["sign"];
		},
		handleQuery() {
			const vm = this;

			setTimeout(() => {
				const query = vm.$route.query;
				if (query) {
					if (query.price) {
						vm.form.price = query.price;
					}

					if (query.currency && vm.ui.availableCurrencies.includes(query.currency)) {
						vm.form.currency = query.currency;
					}
				}
			}, 100);
		}
	},
	computed: {
		showResults() {
			const vm = this;
			return vm.form.price > 0 && vm.form.currency;
		}
	},
	watch: {
		form: {
			deep: true,
			handler() {
				const vm = this;

				// Calculate and show results, only if possible
				if (!vm.showResults) {
					return;
				}

				// Calculate :)
				vm.calculate();

				// Update the query with form data
				vm.$router.push({ query: vm.form });
			}
		}
	},
	head() {
		const vm = this;
		return {
			title: vm.info.title
		};
	},
	mounted() {
		const vm = this;

		vm.$store.set("ui/toolbarTitle", vm.info.title);

		vm.ui.availableCurrencies = vm.$store.get("exchangeRates/availableCurrencies");

		vm.handleQuery();
	}
};
</script>