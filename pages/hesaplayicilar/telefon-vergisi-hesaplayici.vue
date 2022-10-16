<template>
    <div>
        <AppBreadcrumbs :items="breadcrumbItems" />

        <PageTitle>{{ head.title }}</PageTitle>

        <InnerContainer>
            <FormRow class="mb-4">
                <CalculatorPresets
                    :value="matchingPresetIds"
                    :presets="ui.presets"
                    @click="choosePreset($event)">
                    <template #tooltip="{preset}">
                        {{ moneyFormat(preset.form.price, preset.form.currency) }}
                    </template>
                </CalculatorPresets>
            </FormRow>

            <FormRow
                class="mb-10"
                label="Telefon fiyatı">
                <v-text-field
                    v-model.number="form.price"
                    :prefix="selectedCurrency.sign"
                    hide-details=""
                    filled=""
                    outlined=""
                    step="any"
                    min="1"
                    inputmode="decimal"
                    type="number"
                    aria-label="Telefon fiyatı">
                    <template #append-outer>
                        <CurrencySelector
                            v-model="form.currency"
                            style="width:110px" />
                    </template>
                </v-text-field>
            </FormRow>

            <FormRow label="Kayıt yolu">
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
            </FormRow>

            <CalculatorResultTabs
                v-model="ui.tab"
                :should-show-results="shouldShowResults"
                class="mt-10">
                <template v-if="shouldShowResults">
                    <ReverseCalculationAlert v-if="form.currency === 'TRY'" />
                    <EstimatedCalculationAlert v-else />

                    <CalculatorResultFormRow
                        v-for="(item, index) in resultList"
                        :key="index"
                        :value="item.value"
                        :label="item.key"
                        class="mb-5" />

                    <FormRow class="mb-6">
                        <MinimumWageAlert :price="results.prices.taxAdded" />
                    </FormRow>

                    <FormRow>
                        <div>
                            <v-btn
                                outlined=""
                                color="primary"
                                large=""
                                @click="ui.isShareDialogShown = true">
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
                            :calculator-title="head.title"
                            :preset-title="matchingPresetTitles" />
                    </FormRow>
                </template>
            </CalculatorResultTabs>
        </InnerContainer>
    </div>
</template>

<script>
import { mdiShare } from "@mdi/js";
import PhoneTaxCalculator, { Registration } from "@/calculators/PhoneTaxCalculator.js";
import { PhoneTaxCalculator as calculator } from "@/data/calculators.js";
import { isCurrencyAvailable } from "@/utils/is-currency-available.js";
import {
    createCalculatorMatchingPresetIds,
    createCalculatorMatchingPresetTitles,
    findCalculatorMatchingPresets
} from "@/utils/find-calculator-matching-presets.js";
import { moneyFormat } from "@/utils/formatter.js";
import { buildHeadTags } from "@/utils/build-head-tags.js";

export default {
    head() {
        return this.head;
    },
    data: () => ({
        icons: {
            mdiShare
        },
        head: buildHeadTags({
            title: calculator.title,
            description: calculator.description,
            ogImageName: "telefon-vergisi-hesaplayici.jpg"
        }),
        ui: {
            presets: calculator.presets,
            registration: [
                {
                    title: "İthalat yoluyla kayıtlı (Resmi)",
                    value: Registration.Import
                },
                {
                    title: "Pasaport yoluyla kayıtlı",
                    value: Registration.Passport
                }
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

            const calculator = new PhoneTaxCalculator({
                price: vm.priceMultipliedExchangeRate,
                registration: vm.form.registration,
                eurToTryCurrency: vm.$store.getters["exchange-rates/currencies"].EUR.rate
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

            if (query.currency && isCurrencyAvailable(query.currency, vm.$store.getters["exchange-rates/availableCurrencies"])) {
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
        matchingPresetTitles() {
            const vm = this;
            return createCalculatorMatchingPresetTitles(vm.matchingPresets).join(" / ");
        },
        selectedCurrency() {
            const vm = this;
            return vm.$store.getters["exchange-rates/currencies"][vm.form.currency];
        },
        priceMultipliedExchangeRate() {
            const vm = this;
            return vm.form.price * vm.selectedCurrency.rate;
        },
        breadcrumbItems() {
            return [
                {
                    title: "Hesaplayıcılar",
                    url: "/hesaplayicilar/"
                },
                {
                    title: calculator.title,
                    url: calculator.url
                }
            ];
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
    mounted() {
        const vm = this;

        vm.$nextTick(() => {
            setTimeout(() => vm.handleQuery(), 100);
        });
    }
};
</script>
