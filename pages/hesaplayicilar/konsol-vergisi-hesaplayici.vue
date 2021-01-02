<template>
	<div>
		<div class="mb-3">
			<A />
		</div>

		<ExchangeRates />

		<v-divider class="my-6" />

		<HorizontalForm class="mb-3">
			<v-chip-group
				v-model="ui.preset"
				column="">
				<v-chip :key="index"
						outlined=""
						v-for="(preset, index) in ui.presets"
						:value="index">
					{{ preset.title }}
				</v-chip>
			</v-chip-group>
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
					<v-select
						v-model="form.currency"
						:items="ui.availableCurrencies"
						dense=""
						hide-details=""
						outlined=""
						aria-label="Para birimi" />
				</v-col>
			</v-row>
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
import openGraphImage from "@/assets/img/open-graph/console-tax-calculator.jpg";

const meta = {
	title: "Konsol Vergisi Hesaplayıcı",
	description: "Sadece eğlenmek istediğinizde ödemeniz gereken vergileri hesaplayın."
};

export default {
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
				{ title: "Xbox Series S", price: 299 },
				{ title: "Xbox Series X", price: 499 },
				{ title: "PlayStation 5 Digital Edition", price: 399 },
				{ title: "PlayStation 5", price: 499 }
			],
			preset: null,
			availableCurrencies: []
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

			// Calculate price
			const price = parseFloat(vm.form.price) * vm.getExchangeRate(vm.form.currency);

			// Calculation mode
			const mode = BaseCalculator.getModeByCurrency(vm.form.currency);

			// Calculate
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
		"ui.preset"() {
			const vm = this;

			vm.form.currency = "EUR";
			vm.form.price = vm.ui.presets[vm.ui.preset].price;
		},
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
		return vm.head;
	},
	mounted() {
		const vm = this;

		vm.$store.set("ui/toolbarTitle", vm.head.title);

		vm.ui.availableCurrencies = vm.$store.get("exchangeRates/availableCurrencies");

		vm.$nextTick(() => {
			vm.handleQuery();
		});

		vm.$store.set("ui/breadcrumbs", [
			{
				text: "Ana Sayfa",
				to: "/"
			},
			{
				text: "Hesaplayıcılar",
				to: "/hesaplayicilar"
			},
			{
				text: meta.title,
				to: vm.$route.path
			}
		]);
	}
};
</script>