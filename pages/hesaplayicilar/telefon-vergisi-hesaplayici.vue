<template>
	<div>
        <AppHeader>{{ head.title }}</AppHeader>

        <InnerContainer>
            <CalculatorFormRow class="mb-4">
                <CalculatorPresets
                    @click="choosePreset($event)"
                    :value="matchingPresetIds"
                    :presets="ui.presets">
                    <template #tooltip="{preset}">
                        {{ moneyFormat(preset.form.price, preset.form.currency) }}
                    </template>
                </CalculatorPresets>
            </CalculatorFormRow>

            <CalculatorFormRow
                class="mb-10"
                label="Telefon fiyatı">
                <v-text-field
                    v-model.number="form.price"
                    :prefix="selectedCurrency.sign"
                    hide-details=""
                    outlined=""
                    step="any"
                    min="1"
                    type="number"
                    aria-label="Telefon fiyatı">
                    <template #append-outer>
                        <CalculatorCurrencySelector
                            v-model="form.currency"
                            style="width:110px" />
                    </template>
                </v-text-field>
            </CalculatorFormRow>

            <CalculatorFormRow label="Kayıt yolu">
                <v-radio-group
                    v-model="form.registration"
                    hide-details=""
                    class="pa-0 ma-0">
                    <v-radio
                        v-for="item in ui.registration"
                        :key="item.value"
                        :label="item.title"
                        :value="item.value" />
                </v-radio-group>
            </CalculatorFormRow>

            <CalculatorResultTabs
                v-model="ui.tab"
                :show-results="shouldShowResults"
                class="mt-10">
                <template v-if="shouldShowResults">
                    <CalculatorCalculatedFromSalePriceAlert v-if="form.currency === 'TRY'" />
                    <CalculatorCustomsInfoAlert v-else />

                    <CalculatorResultFormRow
                        v-for="(item, index) in resultList"
                        :key="index"
                        :value="item.value"
                        :label="item.key"
                        class="mb-5" />

                    <CalculatorFormRow class="mb-6">
                        <CalculatorMinimumWageAlert :price="results.prices.taxAdded" />
                    </CalculatorFormRow>

                    <CalculatorFormRow>
                        <div>
                            <v-btn
                                @click="ui.isShareDialogShown = true"
                                outlined=""
                                color="primary"
                                large="">
                                <v-icon left="">
                                    {{ icons.mdiShare }}
                                </v-icon>
                                Paylaş...
                            </v-btn>
                        </div>

                        <CalculatorShareDialog
                            v-model="ui.isShareDialogShown"
                            :screenshot-data="screenshotData"
                            :form-data="form"
                            :title="head.title"
                            :matching-presets="matchingPresets" />
                    </CalculatorFormRow>
                </template>
            </CalculatorResultTabs>
        </InnerContainer>
	</div>
</template>

<script>
import { mdiShare } from "@mdi/js";
import { Registration } from "@/calculators/PhoneTaxCalculator";
import { PhoneTaxCalculator as meta } from "@/data/calculators.js";
import openGraphImage from "@/assets/img/open-graph/phone-tax-calculator.jpg";
import { isCurrencyAvailable } from "@/utils/is-currency-available";
import {
    createCalculatorMatchingPresetIds,
    findCalculatorMatchingPresets
} from "@/utils/find-calculator-matching-presets";
import PhoneTaxCalculator from "@/calculators/PhoneTaxCalculator.js";
import { moneyFormat } from "@/utils/formatter.js";

export default {
    layout: "default/index",
    data: () => ({
        icons: {
            mdiShare
        },
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
                { id: 1, title: "iPhone SE 2022 (64GB)", form: { price: 429, currency: "USD" } },
                { id: 2, title: "iPhone 13 mini (128GB)", form: { price: 699, currency: "USD" } },
                { id: 3, title: "iPhone 13 (128GB)", form: { price: 799, currency: "USD" } },
                { id: 4, title: "iPhone 13 Pro (128GB)", form: { price: 999, currency: "USD" } },
                { id: 5, title: "iPhone 13 Pro Max (128GB)", form: { price: 1099, currency: "USD" } },
                { id: 6, title: "iPhone 13 Pro Max (1TB)", form: { price: 1599, currency: "USD" } }
            ],
            registration: [
                { title: "İthalat yoluyla kayıtlı (Resmi)", value: Registration.Import },
                { title: "Pasaport yoluyla kayıtlı", value: Registration.Passport }
            ],
            tab: 1,
            isShareDialogShown: false
        },
        form: {
            currency: "USD",
            price: "",
            registration: Registration.Import
        },
        results: {}
    }),
    methods: {
        moneyFormat,
        calculate() {
            const vm = this;

            const price = parseFloat(vm.form.price) * vm.selectedCurrency.rate;

            const calculator = new PhoneTaxCalculator({
                price,
                registration: vm.form.registration,
                eurToTryCurrency: vm.$store.get("exchange-rates/currencies").EUR.rate
            }, {
                calculateFromTaxAddedPrice: vm.form.currency === "TRY"
            });

            vm.results = calculator.calculate();
        },
        handleQuery() {
            const vm = this;

            const query = vm.$route.query;
            if (!query) return;

            if (query.price) {
                vm.form.price = parseFloat(query.price);
            }

            if (query.currency && isCurrencyAvailable(query.currency, vm.$store.get("exchange-rates/availableCurrencies"))) {
                vm.form.currency = query.currency;
            }

            if (query.registration && vm.ui.registration.some(object => object.value === query.registration)) {
                vm.form.registration = query.registration;
            }
        },
        choosePreset(preset) {
            const vm = this;
            Object.assign(vm.form, preset.form);
        }
    },
    computed: {
        resultList() {
            const vm = this;
            return [
                {
                    key: "Vergisiz fiyat",
                    value: moneyFormat(vm.results.prices.taxFree, "TRY")
                },
                ...(() => {
                    if (vm.form.registration === Registration.Import) {
                        return [
                            {
                                key: `Kültür Bakanlığı (%${vm.results.taxRates.ministryOfCulture})`,
                                value: moneyFormat(vm.results.taxFees.ministryOfCulture, "TRY")
                            },
                            {
                                key: `TRT bandrolü (%${vm.results.taxRates.trtImport})`,
                                value: moneyFormat(vm.results.taxFees.trtImport, "TRY")
                            },
                            {
                                key: `ÖTV (%${vm.results.taxRates.specialConsumptionTax})`,
                                value: moneyFormat(vm.results.taxFees.specialConsumptionTax, "TRY")
                            },
                            {
                                key: `KDV (%${vm.results.taxRates.valueAddedTax})`,
                                value: moneyFormat(vm.results.taxFees.valueAddedTax, "TRY")
                            }
                        ];
                    } else {
                        return [
                            {
                                key: `TRT bandrolü (${moneyFormat(vm.results.taxRates.trtPassport, "EUR")})`,
                                value: moneyFormat(vm.results.taxFees.trtPassport, "TRY")
                            },
                            {
                                key: "Kayıt ücreti",
                                value: moneyFormat(vm.results.taxFees.registration, "TRY")
                            }
                        ];
                    }
                })(),
                {
                    key: `Toplam vergi (%${vm.results.taxRates.total})`,
                    value: moneyFormat(vm.results.taxFees.total, "TRY")
                },
                {
                    key: "Tahmini satış fiyatı",
                    value: moneyFormat(vm.results.prices.taxAdded, "TRY")
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
                        value: moneyFormat(vm.form.price, vm.form.currency)
                    },
                    {
                        key: "Kayıt yolu",
                        value: vm.ui.registration.find(item => item.value === vm.form.registration).title
                    }
                ]
            };
        },
        shouldShowResults() {
            const vm = this;
            return vm.form.price > 0 && vm.form.currency !== "" && vm.form.registration !== "";
        },
        matchingPresets() {
            const vm = this;
            return findCalculatorMatchingPresets(vm.ui.presets, {
                price: vm.form.price,
                currency: vm.form.currency
            });
        },
        matchingPresetIds() {
            const vm = this;
            return createCalculatorMatchingPresetIds(vm.matchingPresets);
        },
        selectedCurrency() {
            const vm = this;
            return vm.$store.get("exchange-rates/currencies")[vm.form.currency];
        }
    },
    watch: {
        form: {
            deep: true,
            handler() {
                const vm = this;

                if (!vm.shouldShowResults) return;

                vm.calculate();

                // Show results tab when calculated
                vm.ui.tab = 0;

                vm.$router.push({ query: vm.form });
            }
        },
        "form.price"() {
            const vm = this;

            if (vm.form.price >= 999999) {
                vm.$nextTick(() => {
                    vm.form.price = 999999;
                });
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
