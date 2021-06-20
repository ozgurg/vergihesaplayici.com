<template>
	<div>
        <AppHeader>{{ head.title }}</AppHeader>

        <InnerContainer>
            <CalculatorHorizontalForm class="mb-5">
                <CalculatorPresets
                    v-model="ui.preset"
                    :presets="ui.presets" />
            </CalculatorHorizontalForm>

            <CalculatorHorizontalForm class="mb-5"
                            label="Telefon fiyatı">

                <v-text-field
                    v-model.number="form.price"
                    :prefix="getCurrencySign(form.currency)"
                    hide-details=""
                    outlined=""
                    step="any"
                    min="1"
                    type="number"
                    aria-label="Telefon fiyatı">
                    <template slot="append-outer">
                        <CalculatorCurrencySelector
                            v-model="form.currency"
                            style="width:110px" />
                    </template>
                </v-text-field>
            </CalculatorHorizontalForm>

            <CalculatorHorizontalForm class="mb-5"
                            label="Kayıt yolu">
                <v-select
                    v-model="form.registration"
                    :items="ui.registration"
                    hide-details=""
                    item-text="title"
                    item-value="value"
                    outlined=""
                    aria-label="Kayıt yolu" />
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

                    <template v-if="registrationIsImport">
                        <CalculatorResultHorizontalForm
                            :label="`Kültür Bakanlığı (%${results.taxRates.ministryOfCulture})`"
                            :value="$moneyFormat(results.taxFees.ministryOfCulture, 'TRY')"
                            class="mb-5" />

                        <CalculatorResultHorizontalForm
                            :label="`TRT bandrolü (%${results.taxRates.trt})`"
                            :value="$moneyFormat(results.taxFees.trt, 'TRY')"
                            class="mb-5" />

                        <CalculatorResultHorizontalForm
                            :label="`ÖTV (%${results.taxRates.sct})`"
                            :value="$moneyFormat(results.taxFees.sct, 'TRY')"
                            class="mb-5" />

                        <CalculatorResultHorizontalForm
                            :label="`KDV (%${results.taxRates.vat})`"
                            :value="$moneyFormat(results.taxFees.vat, 'TRY')"
                            class="mb-5" />
                    </template>

                    <template v-else>
                        <CalculatorResultHorizontalForm
                            :label="`TRT bandrolü (${$moneyFormat(results.taxRates.trtPassport, 'EUR')})`"
                            :value="$moneyFormat(results.taxFees.trtPassport, 'TRY')"
                            class="mb-5" />

                        <CalculatorResultHorizontalForm
                            :value="$moneyFormat(results.taxFees.registration, 'TRY')"
                            class="mb-5"
                            label="Kayıt ücreti" />
                    </template>

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
import BaseCalculator from "@/calculators/BaseCalculator";
import PhoneTaxCalculator from "@/calculators/PhoneTaxCalculator";
import openGraphImage from "@/assets/img/open-graph/phone-tax-calculator.jpg";
import { PhoneTaxCalculator as meta } from "@/data/calculators.js";

export default {
    layout: "default/index",
    name: "PhoneTaxCalculator",
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
                { title: "iPhone 12 mini (64GB)", price: 699 },
                { title: "iPhone 12 (64GB)", price: 799 },
                { title: "iPhone 12 Pro (128GB)", price: 999 },
                { title: "iPhone 12 Pro Max (128GB)", price: 1099 }
            ],
            preset: -1,
            registration: [
                { title: "İthalat yoluyla kayıtlı (Resmi)", value: PhoneTaxCalculator.Registration.Import },
                { title: "Pasaport yoluyla kayıtlı", value: PhoneTaxCalculator.Registration.Passport }
            ],
            tab: 1
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

            const price = parseFloat(vm.form.price) * vm.getExchangeRate(vm.form.currency);

            const mode = BaseCalculator.getCalculationModeByCurrency(vm.form.currency);

            const calculator = new PhoneTaxCalculator(
                vm.$store.get("exchangeRates/currencies"),
                price,
                mode,
                { registration: vm.form.registration }
            ).calculate();

            vm.results.prices = calculator.prices;
            vm.results.taxFees = calculator.taxFees;
            vm.results.taxRates = calculator.taxRates;
        },
        getExchangeRate(currency) {
            const vm = this;
            return vm.$store.get(`exchangeRates/currencies@${currency}.rate`);
        },
        getCurrencySign(currency) {
            const vm = this;
            return vm.$store.get(`exchangeRates/currencies@${currency}.sign`);
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

            if (query.registration && vm.ui.registration.some(object => object.value === query.registration)) {
                vm.form.registration = query.registration;
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
            return vm.form.price > 0 && vm.form.currency !== "" && vm.form.registration !== "";
        },
        registrationIsImport() {
            const vm = this;
            return vm.form.registration === PhoneTaxCalculator.Registration.Import;
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

            vm.form.currency = "USD";
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
