<template>
	<div>
        <AppHeader>{{ head.title }}</AppHeader>

        <InnerContainer>
            <CalculatorHorizontalForm class="mb-5">
                <CalculatorPresets
                    v-model="ui.preset"
                    :presets="ui.presets" />
            </CalculatorHorizontalForm>

            <CalculatorHorizontalForm label="Konsol fiyatı">
                <v-text-field
                    v-model.number="form.price"
                    :prefix="getCurrency(form.currency)['sign']"
                    hide-details=""
                    outlined=""
                    step="any"
                    min="1"
                    type="number"
                    aria-label="Konsol fiyatı">
                    <template slot="append-outer">
                        <CalculatorCurrencySelector
                            v-model="form.currency"
                            style="width:110px" />
                    </template>
                </v-text-field>
            </CalculatorHorizontalForm>

            <CalculatorResultTabs
                v-model="ui.tab"
                :show-results="showResults"
                ref="resultTabs"
                class="mt-10">
                <template v-if="showResults">
                    <CalculatorCalculatedFromSalePriceAlert v-if="form.currency === 'TRY'" />
                    <CalculatorCustomsInfoAlert v-else />

                    <CalculatorResultHorizontalForm
                        :value="$moneyFormat(results.prices.basePrice, 'TRY')"
                        class="mb-5"
                        label="Vergisiz fiyat" />

                    <CalculatorResultHorizontalForm
                        :label="`Gümrük vergisi (%${results.taxRates.custom})`"
                        :value="$moneyFormat(results.taxFees.custom, 'TRY')"
                        class="mb-5" />

                    <CalculatorResultHorizontalForm
                        :label="`ÖTV (%${results.taxRates.sct})`"
                        :value="$moneyFormat(results.taxFees.sct, 'TRY')"
                        class="mb-5" />

                    <CalculatorResultHorizontalForm
                        :label="`KDV (%${results.taxRates.vat})`"
                        :value="$moneyFormat(results.taxFees.vat, 'TRY')"
                        class="mb-5" />

                    <CalculatorResultHorizontalForm
                        :label="`Toplam vergi (%${results.taxRates.total})`"
                        :value="$moneyFormat(results.taxFees.total, 'TRY')"
                        class="mb-5" />

                    <CalculatorResultHorizontalForm
                        :value="$moneyFormat(results.prices.salePrice, 'TRY')"
                        class="mb-5"
                        label="Tahmini satış fiyatı" />

                    <CalculatorHorizontalForm class="mb-6">
                        <CalculatorMinimumWageAlert :price="results.prices.salePrice" />
                    </CalculatorHorizontalForm>

                    <CalculatorHorizontalForm>
                        <CalculatorShare :data="form" />
                    </CalculatorHorizontalForm>
                </template>
            </CalculatorResultTabs>
        </InnerContainer>
	</div>
</template>

<script>
import ConsoleTaxCalculator from "@/calculators/ConsoleTaxCalculator";
import { ConsoleTaxCalculator as meta } from "@/data/calculators.js";
import openGraphImage from "@/assets/img/open-graph/console-tax-calculator.jpg";

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

            const price = parseFloat(vm.form.price) * vm.getCurrency(vm.form.currency)["rate"];

            const consoleTaxCalculator = new ConsoleTaxCalculator({
                price,
                exchangeRates: vm.$store.get("exchangeRates/currencies"),
                calculationMode: ConsoleTaxCalculator.getCalculationModeByCurrency(vm.form.currency)
            });
            const results = consoleTaxCalculator.calculate().results();

            vm.results.prices = results.prices;
            vm.results.taxFees = results.taxFees;
            vm.results.taxRates = results.taxRates;
        },
        getCurrency(currency) {
            const vm = this;
            return vm.$store.get(`exchangeRates/currencies@${currency}`);
        },
        handleQuery() {
            const vm = this;

            const query = vm.$route.query;
            if (!query) return;

            if (query.price) {
                vm.form.price = parseFloat(query.price);
            }

            if (query.currency && vm.$store.get("exchangeRates/availableCurrencies").includes(query.currency)) {
                vm.form.currency = query.currency;
            }
        },
        setBreadcrumbs() {
            const vm = this;
            vm.$store.set("ui/breadcrumbs", [
                { text: "Ana Sayfa", to: "/" },
                { text: "Hesaplayıcılar", to: "/hesaplayicilar" },
                { text: meta.title, to: vm.$route.path }
            ]);
        },
        scrollToResultTabs() {
            const vm = this;
            vm.$vuetify.goTo(vm.$refs["resultTabs"], {
                easing: "easeInQuad",
                duration: 375
            });
        }
    },
    computed: {
        showResults() {
            const vm = this;
            return vm.form.price > 0 && vm.form.currency !== "";
        }
    },
    watch: {
        form: {
            deep: true,
            handler() {
                const vm = this;

                if (!vm.showResults) return;

                vm.calculate();

                // Show results tab when calculated
                vm.ui.tab = 0;

                vm.$router.push({ query: vm.form });

                vm.scrollToResultTabs();
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

        vm.$nextTick(() => {
            setTimeout(() => vm.handleQuery(), 100);
        });

        vm.setBreadcrumbs();
    }
};
</script>
