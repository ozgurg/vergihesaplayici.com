<template>
	<div>
		<HorizontalForm class="mb-3"
						label="Telefon fiyatı">
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

		<HorizontalForm class="mb-3"
						label="Kayıt yolu">
			<v-select
				v-model="form.registration"
				:items="ui.registration"
				dense=""
				hide-details=""
				item-text="title"
				item-value="value"
				outlined="" />
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

			<template v-if="registrationIsImport">
				<ResultHorizontalForm :label="`Kültür Bakanlığı (%${results.taxRates.ministryOfCulture})`"
									  :value="$moneyFormat(results.taxFees.ministryOfCulture, 'TRY')"
									  class="mb-3" />

				<ResultHorizontalForm :label="`TRT Bandrolü (%${results.taxRates.trt})`"
									  :value="$moneyFormat(results.taxFees.trt, 'TRY')"
									  class="mb-3" />

				<ResultHorizontalForm :label="`ÖTV (%${results.taxRates.sct})`"
									  :value="$moneyFormat(results.taxFees.sct, 'TRY')"
									  class="mb-3" />

				<ResultHorizontalForm :label="`KDV (%${results.taxRates.vat})`"
									  :value="$moneyFormat(results.taxFees.vat, 'TRY')"
									  class="mb-3" />
			</template>

			<template v-else-if="registrationIsPassport">
				<ResultHorizontalForm :label="`TRT Bandrolü (${$moneyFormat(results.taxRates.trtPassport, 'EUR')})`"
									  :value="$moneyFormat(results.taxFees.trtPassport, 'TRY')"
									  class="mb-3" />

				<ResultHorizontalForm :value="$moneyFormat(results.taxFees.registration, 'TRY')"
									  class="mb-3"
									  label="Kayıt ücreti" />
			</template>

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
import PhoneTaxCalculator from "@/calculators/PhoneTaxCalculator";

const meta = {
	title: "Telefon Vergisi Hesaplayıcı",
	description: "Satın aldığınız bir telefonun satış fiyatına etki eden vergileri hesaplayın."
};

export default {
	layout: "default/index",
	name: "PhoneTaxCalculator",
	data: () => ({
		head: {
			title: meta.title,
			meta: [
				{ hid: "title", name: "description", content: meta.title },
				{ hid: "description", name: "description", content: meta.description },
				{ hid: "og:description", name: "og:description", content: meta.description }
			]
		},
		ui: {
			availableCurrencies: [],
			registration: [
				{ title: "İthalat yoluyla kayıtlı (Resmi)", value: PhoneTaxCalculator.Registration.Import },
				{ title: "Pasaport yoluyla kayıtlı", value: PhoneTaxCalculator.Registration.Passport }
			]
		},
		form: {
			currency: "USD",
			price: "",
			registration: PhoneTaxCalculator.Registration.Import
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
			const calculator = new PhoneTaxCalculator(
				vm.$store.get("exchangeRates/currencies"),
				price,
				mode,
				{
					registration: vm.form.registration
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

					if (query.registration && vm.ui.registration.some(object => object.value === query.registration)) {
						vm.form.registration = query.registration;
					}
				}
			}, 100);
		}
	},
	computed: {
		showResults() {
			const vm = this;
			return vm.form.price > 0 && vm.form.currency && vm.form.registration;
		},
		registrationIsImport() {
			const vm = this;
			return vm.form.registration === PhoneTaxCalculator.Registration.Import;
		},
		registrationIsPassport() {
			const vm = this;
			return vm.form.registration === PhoneTaxCalculator.Registration.Passport;
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
		return vm.head;
	},
	mounted() {
		const vm = this;

		vm.$store.set("ui/toolbarTitle", vm.head.title);

		vm.ui.availableCurrencies = vm.$store.get("exchangeRates/availableCurrencies");

		vm.handleQuery();
	}
};
</script>