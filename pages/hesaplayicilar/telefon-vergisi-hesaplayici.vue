<template>
	<div>
        <AppHeader>{{ head.title }}</AppHeader>

        <InnerContainer>
            <CalculatorFormRow class="mb-5">
                <CalculatorPresets
                    @click="choosePreset($event)"
                    :value="matchingPresets"
                    :presets="ui.presets" />
            </CalculatorFormRow>

            <CalculatorFormRow
                class="mb-5"
                label="Telefon fiyatı">
                <v-text-field
                    v-model.number="form.price"
                    :prefix="getCurrency(form.currency)['sign']"
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
            </CalculatorFormRow>

            <CalculatorFormRow
                class="mb-5"
                label="Kayıt yolu">
                <v-select
                    v-model="form.registration"
                    :items="ui.registration"
                    hide-details=""
                    item-text="title"
                    item-value="value"
                    outlined=""
                    aria-label="Kayıt yolu" />
            </CalculatorFormRow>

            <CalculatorResultTabs
                v-model="ui.tab"
                :show-results="showResults"
                class="mt-10">
                <template v-if="showResults">
                    <CalculatorCalculatedFromSalePriceAlert v-if="form.currency === 'TRY'" />
                    <CalculatorCustomsInfoAlert v-else />

                    <template v-for="(item, index) in resultList">
                        <CalculatorResultFormRow
                            :key="index"
                            :value="item.value"
                            :label="item.key"
                            class="mb-5" />
                    </template>

                    <CalculatorFormRow class="mb-6">
                        <CalculatorMinimumWageAlert :price="results.prices.salePrice" />
                    </CalculatorFormRow>

                    <CalculatorFormRow>
                        <v-btn
                            @click="ui.isShareDialogShown = true"
                            outlined=""
                            color="primary"
                            large="">
                            <v-icon left="">
                                mdi-share
                            </v-icon>
                            Paylaş...
                        </v-btn>

                        <CalculatorShareDialog
                            v-model="ui.isShareDialogShown"
                            :screenshot-data="screenshotData"
                            :form-data="form"
                            :title="head.title" />
                    </CalculatorFormRow>
                </template>
            </CalculatorResultTabs>
        </InnerContainer>
	</div>
</template>

<script>
import PhoneTaxCalculator from "@/calculators/PhoneTaxCalculator";
import { PhoneTaxCalculator as meta } from "@/data/calculators.js";
import openGraphImage from "@/assets/img/open-graph/phone-tax-calculator.jpg";

export default {
    layout: "default/index",
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
                { id: 1, title: "iPhone SE (64GB)", price: 399, currency: "USD" },
                { id: 2, title: "iPhone 13 mini (128GB)", price: 699, currency: "USD" },
                { id: 3, title: "iPhone 13 (128GB)", price: 799, currency: "USD" },
                { id: 4, title: "iPhone 13 Pro (128GB)", price: 999, currency: "USD" },
                { id: 5, title: "iPhone 13 Pro Max (128GB)", price: 1099, currency: "USD" },
                { id: 6, title: "iPhone 13 Pro Max (1TB)", price: 1599, currency: "USD" }
            ],
            registration: [
                { title: "İthalat yoluyla kayıtlı (Resmi)", value: PhoneTaxCalculator.Registration.Import },
                { title: "Pasaport yoluyla kayıtlı", value: PhoneTaxCalculator.Registration.Passport }
            ],
            tab: 1,
            isShareDialogShown: false
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

            const price = parseFloat(vm.form.price) * vm.getCurrency(vm.form.currency).rate;

            const phoneTaxCalculator = new PhoneTaxCalculator({
                price,
                exchangeRates: vm.$store.get("exchange-rates/currencies"),
                calculationMode: PhoneTaxCalculator.getCalculationModeByCurrency(vm.form.currency)
            }, {
                registration: vm.form.registration
            });
            const results = phoneTaxCalculator.calculate().results();

            vm.results.prices = results.prices;
            vm.results.taxFees = results.taxFees;
            vm.results.taxRates = results.taxRates;
        },
        getCurrency(currency) {
            const vm = this;
            return vm.$store.get(`exchange-rates/currencies@${currency}`);
        },
        handleQuery() {
            const vm = this;

            const query = vm.$route.query;
            if (!query) return;

            if (query.price) {
                vm.form.price = parseFloat(query.price);
            }

            if (query.currency && vm.$store.get("exchange-rates/availableCurrencies").includes(query.currency)) {
                vm.form.currency = query.currency;
            }

            if (query.registration && vm.ui.registration.some(object => object.value === query.registration)) {
                vm.form.registration = query.registration;
            }
        },
        choosePreset(preset) {
            const vm = this;

            vm.form.currency = preset.currency;
            vm.form.price = preset.price;
        }
    },
    computed: {
        resultList() {
            const vm = this;
            return [
                {
                    key: "Vergisiz fiyat",
                    value: vm.$moneyFormat(vm.results.prices.basePrice, "TRY")
                },
                ...(() => {
                    if (vm.registrationIsImport) {
                        return [
                            {
                                key: `Kültür Bakanlığı (%${vm.results.taxRates.ministryOfCulture})`,
                                value: vm.$moneyFormat(vm.results.taxFees.ministryOfCulture, "TRY")
                            },
                            {
                                key: `TRT bandrolü (%${vm.results.taxRates.trt})`,
                                value: vm.$moneyFormat(vm.results.taxFees.trt, "TRY")
                            },
                            {
                                key: `ÖTV (%${vm.results.taxRates.sct})`,
                                value: vm.$moneyFormat(vm.results.taxFees.sct, "TRY")
                            },
                            {
                                key: `KDV (%${vm.results.taxRates.vat})`,
                                value: vm.$moneyFormat(vm.results.taxFees.vat, "TRY")
                            }
                        ];
                    } else {
                        return [
                            {
                                key: `TRT bandrolü (${vm.$moneyFormat(vm.results.taxRates.trtPassport, "EUR")})`,
                                value: vm.$moneyFormat(vm.results.taxFees.trtPassport, "TRY")
                            },
                            {
                                key: "Kayıt ücreti",
                                value: vm.$moneyFormat(vm.results.taxFees.registration, "TRY")
                            }
                        ];
                    }
                })(),
                {
                    key: `Toplam vergi (%${vm.results.taxRates.total})`,
                    value: vm.$moneyFormat(vm.results.taxFees.total, "TRY")
                },
                {
                    key: "Tahmini satış fiyatı",
                    value: vm.$moneyFormat(vm.results.prices.salePrice, "TRY")
                }
            ];
        },
        screenshotData() {
            const vm = this;
            return {
                output: vm.resultList,
                input: [
                    {
                        key: "Telefon fiyatı",
                        value: vm.$moneyFormat(vm.form.price, vm.form.currency)
                    },
                    {
                        key: "Kayıt yolu",
                        value: vm.ui.registration.find(item => item.value === vm.form.registration).title
                    }
                ]
            };
        },
        showResults() {
            const vm = this;
            return vm.form.price > 0 && vm.form.currency !== "" && vm.form.registration !== "";
        },
        registrationIsImport() {
            const vm = this;
            return vm.form.registration === PhoneTaxCalculator.Registration.Import;
        },
        matchingPresets() {
            const vm = this;
            return vm.ui.presets
                .filter(preset => preset.price === vm.form.price && preset.currency === vm.form.currency)
                .reduce((previous, preset) => [...previous, preset.id], []);
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
            }
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
    }
};
</script>
