<template>
	<div>
		<div class="mb-3">
			<A />
		</div>

		<ExchangeRates />

		<v-divider class="my-10" />

		<HorizontalForm class="mb-3">
			<Presets v-model="ui.preset"
					 :presets="ui.presets" />
		</HorizontalForm>

		<HorizontalForm class="mb-3"
						label="Konsol fiyatı">
			<v-row dense=""
				   class="price-row">
				<v-col class="py-0 price-row__price-col"
					   cols="7" sm="9" md="9" lg="9" xl="9">
					<v-text-field
						v-model.number="form.price"
						:prefix="getCurrencySign(form.currency)"
						dense=""
						hide-details=""
						outlined=""
						step="any"
						type="number"
						aria-label="Konsol fiyatı" />
				</v-col>

				<v-col class="py-0 price-row__currency-col">
					<CurrencySelector v-model="form.currency" />
				</v-col>
			</v-row>
		</HorizontalForm>

		<v-divider class="my-10" />

		<ResultTabs v-model="ui.tab"
					:show-results="showResults">
			<template v-if="showResults">
				<CustomsInfoAlert v-if="form.currency !== 'TRY'" />

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
		</ResultTabs>
	</div>
</template>

<script>
import BaseCalculator from "@/calculators/BaseCalculator";
import ConsoleTaxCalculator from "@/calculators/ConsoleTaxCalculator";
import openGraphImage from "@/assets/img/open-graph/console-tax-calculator.jpg";
import { ConsoleTaxCalculator as meta } from "@/data/calculators.js";
import Presets from "../../components/calculators/Presets";

export default {
	components: { Presets },
	layout: "default/index",
	name: "ConsoleTaxCalculator",
	data: () => ({
		head: {
			title: meta.title,
			meta: [
				{ hid: "title", name: "title", content: meta.title },
				{ hid: "description", name: "description", content: meta.description },
				{ hid: "og:title", name: "og:title", content: meta.title },
				{ hid: "og:description", name: "og:description", content: meta.description },
				{ hid: "og:image", name: "og:image", content: openGraphImage },
				{ name: "twitter:image", content: openGraphImage }
			]
		},
		ui: {
			presets: [
				{ title: "Xbox Series S (512GB)", price: 299 },
				{ title: "Xbox Series X (1TB)", price: 499 },
				{ title: "PlayStation 5 Digital Edition (825GB)", price: 399 },
				{ title: "PlayStation 5 (825GB)", price: 499 }
			],
			preset: -1,
			tab: 1
		},
		form: {
			currency: "USD",
			price: ""
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

			const price = parseFloat(vm.form.price) * vm.getExchangeRate(vm.form.currency);

			const mode = BaseCalculator.getCalculationModeByCurrency(vm.form.currency);

			const calculator = new ConsoleTaxCalculator(
				vm.$store.get("exchangeRates/currencies"),
				price,
				mode
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

			const query = vm.$route.query;
			if (!query) {
				return;
			}

			if (query.price) {
				vm.form.price = parseFloat(query.price);
			}

			if (query.currency && vm.$store.get("exchangeRates/availableCurrencies").includes(query.currency)) {
				vm.form.currency = query.currency;
			}
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

				if (!vm.showResults) {
					return;
				}

				vm.calculate();

				// Show results tab when calculated
				vm.ui.tab = 0;

				vm.$router.push({ query: vm.form });
			}
		},
		"ui.preset"() {
			const vm = this;

			vm.form.currency = "EUR";
			vm.form.price = vm.ui.presets[vm.ui.preset].price;
		}
	},
	head() {
		const vm = this;
		return vm.head;
	},
	mounted() {
		const vm = this;

		vm.$store.set("ui/toolbarTitle", vm.head.title);

		vm.$nextTick(() => {
			setTimeout(() => vm.handleQuery(), 100);
		});

		vm.$store.set("ui/breadcrumbs", [
			{ text: "Ana Sayfa", to: "/" },
			{ text: "Hesaplayıcılar", to: "/hesaplayicilar" },
			{ text: meta.title, to: vm.$route.path }
		]);
	}
};
</script>